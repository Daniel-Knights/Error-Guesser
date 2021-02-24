<template>
  <main v-if="filteredErrors[index]" class="content">
    <form @submit.prevent>
      <div class="line-number">
        <h2>Line Number</h2>
        <pre class="line-numbers" @click="selectLine($event)">
          <code
            v-for="(line, i) in filteredErrors[index].snippet"
            :class="[selectedLine !== i || 'selected-line', 'language-js']"
            :key="line"
            :data-line-number="i"
          >{{ line }}</code>
        </pre>
      </div>

      <div class="error-text">
        <h2>Error Text</h2>
        <div class="error-options">
          <pre
            v-for="i in [0, 1, 2]"
            :key="i"
            :class="[selectedText !== i || 'selected-line', 'language-bash']"
            @click="selectedText = i"
          >
            <code>{{ filteredErrors[index].errorText[i] }}</code>
          </pre>
        </div>
      </div>

      <div>
        <button @click="skip()">SKIP</button>
        <button @click="submitGuess()">SUBMIT GUESS</button>
      </div>
    </form>

    <Timer @time-up="submitGuess()" />
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useMeta, useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import Prism from '../assets/prism/prism'
import '../assets/prism/prism.css'
import { setUserCookie, state } from '../state'
import type { ErrorQuestion, Cookie } from '../types'
import Timer from 'components/Timer.vue'

export default defineComponent({
  name: 'play',

  components: { Timer },

  setup() {
    const cookies = useQuasar().cookies
    const router = useRouter()
    const { lang, difficulty } = useRoute().params
    const index = ref(0)
    const selectedLine = ref(0)
    const selectedText = ref(0)
    const filteredErrors = ref<ErrorQuestion[]>([])

    async function fetchFile(): Promise<void> {
      if (typeof lang !== 'string') return

      const fetchedErrors = (await import(
        `../assets/errors/${lang}.json`
      )) as ErrorQuestion[]

      filteredErrors.value = fetchedErrors

      setTimeout(Prism.highlightAll)
    }

    fetchFile().catch(() => router.push({ name: 'error' }))
    useMeta({ title: 'Play' })

    function setCookie(cookie: Cookie): void {
      cookies.set('eg_user_records', JSON.stringify(cookie), { path: '/' })
      setUserCookie(cookie)
    }

    function selectLine(e: MouseEvent): void {
      const target = e.target as HTMLElement
      if (target.localName !== 'code') return

      const { lineNumber } = target.dataset
      if (!lineNumber) return

      selectedLine.value = +lineNumber
    }

    function submitGuess(): void {
      const { line, text } = filteredErrors.value[index.value].answers
      const result = { correctLine: false, correctText: false }

      if (line === selectedLine.value) {
        result.correctLine = true
      }
      if (text === selectedText.value) {
        result.correctText = true
      }

      if (state.consentCookie === false) return

      const score = {
        line: result.correctLine ? 1 : 0,
        text: result.correctText ? 1 : 0,
        total: 0
      }

      score.total = score.line + score.text

      if (state.userCookie) {
        if (state.userCookie.overallScore) {
          state.userCookie.overallScore.line += score.line
          state.userCookie.overallScore.text += score.text
          state.userCookie.overallScore.total += score.line + score.text
        } else {
          state.userCookie.overallScore = score
        }

        setCookie(state.userCookie)
      } else {
        setCookie({
          name: '',
          preferredDifficulty: difficulty as string,
          overallScore: score,
          answeredQuestionIds: []
        })
      }
    }

    function skip(): void {
      index.value = Math.floor(Math.random() * filteredErrors.value.length)
      setTimeout(Prism.highlightAll)
    }

    onMounted(() => {
      index.value = Math.floor(Math.random() * filteredErrors.value.length)
    })

    return {
      filteredErrors,
      index,
      selectedLine,
      selectedText,
      selectLine,
      submitGuess,
      skip
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../css/mixins';

.content {
  @include flex-y(center, center);
  position: relative;
  top: -50px;
}

.line-number {
  margin: 20px 0;
}
h2 {
  margin: 0;
  font-size: 1.5em;
  letter-spacing: 1px;
  line-height: 1em;
}
pre {
  @include flex-y(false, false);

  .selected-line {
    @include selected-line;
  }
}

.error-text {
  @include flex-y(false, center);
  margin: 10px;
}
.error-options pre {
  cursor: pointer;
  padding: 10px 15px;

  &:hover,
  &.selected-line {
    @include selected-line;
  }
}
</style>
