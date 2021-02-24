<template>
  <Loading v-if="loading" />

  <main v-else-if="filteredErrors[index]" class="content">
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

  <GameComplete v-else @reset="reset()" />
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
import Loading from 'components/Loading.vue'
import GameComplete from '../components/GameComplete.vue'

export default defineComponent({
  name: 'play',

  components: { Options, Timer, Loading, GameComplete },

  setup() {
    const cookies = useQuasar().cookies
    const router = useRouter()
    const { lang, difficulty } = useRoute().params
    const loading = ref(true)
    const allErrors = ref<ErrorQuestion[]>([])
    const filteredErrors = ref<ErrorQuestion[]>([])
    const index = ref(0)
    const selectedLine = ref(0)
    const selectedText = ref(0)

    useMeta({ title: 'Play' })

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

      loading.value = false
    }

    fetchFile().catch(err => {
      router.push({ name: 'error' })
      console.error(err)
    })

    function setCookie(cookie: Cookie): void {
      if (state.consentCookie === false) return

      cookies.set('eg_user_records', JSON.stringify(cookie), { path: '/' })
      setUserCookie(cookie)
    }

    function submitGuess(): void {
      const { line, text } = filteredErrors.value[index.value].answers
      const score = { line: 0, text: 0 }

      if (line === selectedLine.value) score.line = 1
      if (text === selectedText.value) score.text = 1

      if (state.consentCookie === false) return

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

    function randomIndex(): void {
      index.value = Math.floor(Math.random() * filteredErrors.value.length)
    }

    function skip(): void {
      randomIndex()
      setTimeout(Prism.highlightAll)
    }

    function reset(): void {
      if (state.userCookie) {
        state.userCookie.answeredQuestionIds = []
        setCookie(state.userCookie)
      }

      filteredErrors.value = allErrors.value
      setTimeout(Prism.highlightAll)
    }

    onMounted(randomIndex)

    return {
      loading,
      filteredErrors,
      index,
      selectedLine,
      selectedText,
      submitGuess,
      skip,
      reset
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
</style>
