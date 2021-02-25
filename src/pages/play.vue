<template>
  <Loading v-if="loading" />

  <Game
    v-else-if="filteredErrors.length"
    :difficulty="difficulty"
    :filteredErrors="filteredErrors"
  />

  <GameComplete v-else @reset="reset()" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMeta } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import Prism from '../assets/prism/prism'
import '../assets/prism/prism.css'
import type { ErrorQuestion } from '../types'
import { setCookie } from '../boot/cookies'
import { state } from '../state'
import Loading from 'components/Loading.vue'
import Game from '../components/Game.vue'
import GameComplete from '../components/GameComplete.vue'

export default defineComponent({
  name: 'play',

  components: { Loading, Game, GameComplete },

  setup() {
    const router = useRouter()
    const { lang, difficulty } = useRoute().params
    const loading = ref(true)
    const allErrors = ref<ErrorQuestion[]>([])
    const filteredErrors = ref<ErrorQuestion[]>([])

    useMeta({ title: 'Play' })

    async function fetchFile(): Promise<void> {
      if (typeof lang !== 'string') return

      const fetchedErrors = (await import(`../assets/errors/${lang}.json`)) as {
        default: ErrorQuestion[]
      }

      allErrors.value = fetchedErrors.default
      filteredErrors.value = fetchedErrors.default.filter((fetchedError) => {
        if (!state.userCookie) return fetchedError
        else {
          return !state.userCookie?.answeredQuestionIds.includes(fetchedError.id)
        }
      })

      setTimeout(Prism.highlightAll)

      loading.value = false
    }

    fetchFile().catch((err) => {
      router.push({ name: 'error' })
      console.error(err)
    })

    function reset(): void {
      if (state.userCookie) {
        state.userCookie.answeredQuestionIds = []
        setCookie(state.userCookie)
      }

      filteredErrors.value = allErrors.value
      setTimeout(Prism.highlightAll)
    }

    return { difficulty, loading, filteredErrors, reset }
  }
})
</script>
