<template>
  <main v-if="filteredErrors[index]" class="content">
    <form @submit.prevent>
      <Options
        :index="index"
        :filteredErrors="filteredErrors"
        :selectedLine="selectedLine"
        :selectedText="selectedText"
        @line-select="selectedLine = $event"
        @text-select="selectedText = $event"
      />

      <div>
        <button @click="skip()">SKIP</button>
        <button @click="submitGuess()">SUBMIT GUESS</button>
      </div>
    </form>

    <Timer @time-up="submitGuess()" />
  </main>
  <div v-else class="game-complete">
    <p>You've answered all available questions!</p>
    <p>
      You can either <span @click="reset()">play again</span>, or,
      <a
        href="https://github.com/Daniel-Knights/Error-Guesser"
        rel="noopener"
        target="_blank"
        >contribute more questions for others to play.</a
      >
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useMeta, useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import Prism from '../assets/prism/prism'
import '../assets/prism/prism.css'
import { setUserCookie, state } from '../state'
import type { ErrorQuestion, Cookie } from '../types'
import Options from 'components/Options.vue'
import Timer from 'components/Timer.vue'

export default defineComponent({
  name: 'play',

  components: { Options, Timer },

  setup() {
    const cookies = useQuasar().cookies
    const router = useRouter()
    const { lang, difficulty } = useRoute().params
    const index = ref(0)
    const selectedLine = ref(0)
    const selectedText = ref(0)
    const filteredErrors = ref<ErrorQuestion[]>([])
    const allErrors = ref<ErrorQuestion[]>([])

    async function fetchFile(): Promise<void> {
      if (typeof lang !== 'string') return

      const fetchedErrors = (await import(`../assets/errors/${lang}.json`)) as {
        default: ErrorQuestion[]
      }

      allErrors.value = fetchedErrors.default
      filteredErrors.value = fetchedErrors.default.filter(fetchedError => {
        if (!state.userCookie) return fetchedError
        else {
          return !state.userCookie?.answeredQuestionIds.includes(fetchedError.id)
        }
      })

      setTimeout(Prism.highlightAll)
    }

    fetchFile().catch(err => {
      // eslint-disable-next-line
      router.push({ name: 'error' })
      console.error(err)
    })
    useMeta({ title: 'Play' })

    function setCookie(cookie: Cookie): void {
      if (state.consentCookie === false) return

      cookies.set('eg_user_records', JSON.stringify(cookie), { path: '/' })
      setUserCookie(cookie)
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
        state.userCookie.overallScore.line += score.line
        state.userCookie.overallScore.text += score.text
        state.userCookie.overallScore.total += score.line + score.text
        state.userCookie.answeredQuestionIds.push(filteredErrors.value[index.value].id)

        setCookie(state.userCookie)
      } else {
        setCookie({
          name: '',
          preferredDifficulty: difficulty as string,
          overallScore: score,
          answeredQuestionIds: [filteredErrors.value[index.value].id]
        })
      }
    }

    function skip(): void {
      index.value = Math.floor(Math.random() * filteredErrors.value.length)
      setTimeout(Prism.highlightAll)
    }

    function reset(): void {
      if (!state.userCookie) return

      filteredErrors.value = allErrors.value
      state.userCookie.answeredQuestionIds = []
      setCookie(state.userCookie)
      setTimeout(Prism.highlightAll)
    }

    onMounted(() => {
      index.value = Math.floor(Math.random() * filteredErrors.value.length)
    })

    return { filteredErrors, index, selectedLine, selectedText, submitGuess, skip, reset }
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

.game-complete {
  padding: 10px;
  max-width: 800px;
  font: 1.5em var(--font-secondary);

  span,
  a {
    cursor: pointer;
    color: var(--black);
    text-decoration: underline;
    text-shadow: none;

    &:hover {
      text-decoration: none;
    }
  }
}
</style>
