<template>
  <main id="content">
    <pre class="line-numbers" @click="selectLine($event)">
      <code
        v-for="(line, i) in errors[index].snippet"
        :class="[selectedLine !== i + 1 || 'selected-line', 'language-js']"
        :key="line"
        :data-line-number="i"
      >{{ line }}</code>
    </pre>

    <form @submit.prevent>
      <div class="form-group">
        <label for="error-text">Error Text</label>
        <textarea
          v-model="errorTextGuess"
          id="error-text"
          ref="textarea"
          cols="35"
          rows="4"
        />
      </div>
      <div>
        <button>RESET</button>
        <button @click="submitGuess()">SUBMIT GUESS</button>
        <button>SKIP</button>
      </div>
    </form>
    <Timer @time-up="submitGuess()" />
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Prism from '../assets/prism/prism'
import '../assets/prism/prism.css'
import errors from '../assets/errors/js.json'
import Timer from '../components/Timer.vue'

export default defineComponent({
  name: 'play',

  components: { Timer },

  setup() {
    const index = ref(0)
    const selectedLine = ref(1)
    const errorTextGuess = ref('')

    function selectLine(e: MouseEvent): void {
      const target = e.target as HTMLElement
      if (target.localName !== 'code') return

      const { lineNumber } = target.dataset
      if (!lineNumber) return

      selectedLine.value = +lineNumber + 1
    }

    function formatErrorRegex(str: string): string {
      return str
        .split('')
        .map(char => {
          switch (char) {
            case ':':
              return ':?'
            case "'" || '"' || '`':
              return '(\'|"|`)'
            default:
              return char
          }
        })
        .join('')
    }

    function submitGuess(): void {
      const { errorLine, errorText } = errors[index.value]
      const errorRegex = new RegExp(`^${formatErrorRegex(errorText)}$`, 'i')
      const result = { correctLine: false, correctText: false }

      if (errorLine === selectedLine.value) {
        console.log('correct line')
      }

      if (errorRegex.exec(errorTextGuess.value)) {
        console.log('correct text')
      }

      if (!result.correctLine && !result.correctText) {
        console.log('wrong')
      }
    }

    onMounted(() => {
      setTimeout(Prism.highlightAll)

      index.value = Math.floor(Math.random() * errors.length)
    })

    return { errors, index, selectedLine, errorTextGuess, selectLine, submitGuess }
  }
})
</script>

<style lang="scss" scoped>
@import '../css/mixins';

#content {
  @include flex-y(center, center);
  position: relative;
  margin-bottom: 100px;
}

label {
  margin-top: 0;
  font-size: 1.5em;
  letter-spacing: 1px;
}

pre {
  @include flex-y(false, false);

  .selected-line {
    background-color: var(--dark-grey);

    &::before {
      @include selected-line;
    }
  }
}

.form-group {
  @include flex-y(false, center);
  margin: 10px;
}
</style>
