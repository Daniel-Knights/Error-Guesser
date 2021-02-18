<template>
  <main id="content">
    <pre class="line-numbers language-js" @click="selectLine($event)">
      <code
        v-for="(line, i) in errors[index].snippet"
        :id="selectedLine === i ? 'selected-line' : ''"
        :key="line"
        :data-line-number="i"
      >{{ line }}</code>
    </pre>
    <div id="controls">
      <form @submit.prevent>
        <div class="form-group">
          <label for="error-text">Error Text</label>
          <textarea id="error-text" ref="textarea" cols="35" rows="4" />
        </div>
      </form>
      <div id="buttons">
        <button>RESET</button>
        <button>SUBMIT GUESS</button>
        <button>SKIP</button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Prism from '../assets/prism/prism'
import '../assets/prism/prism.css'
import type { Question } from './types'
import errors from '../assets/errors/js.json'

interface Data {
  errors: Question[]
  index: number
  selectedLine: number | null
}

export default defineComponent({
  data: () => ({ index: 0, selectedLine: null, errors } as Data),

  mounted() {
    setTimeout(Prism.highlightAll)

    this.index = Math.floor(Math.random() * this.errors.length)

    const textarea = this.$refs.textarea as HTMLTextAreaElement
    textarea.focus()
  },

  methods: {
    selectLine(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (target.localName !== 'code') return

      const { lineNumber } = target.dataset
      if (!lineNumber) return

      this.selectedLine = +lineNumber
    }
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

  #selected-line {
    background-color: var(--dark-grey);
  }
}

.form-group {
  @include flex-y(false, center);
  margin: 10px;
}
</style>
