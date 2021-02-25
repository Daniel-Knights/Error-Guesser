<template>
  <div>
    <main class="content">
      <form @submit.prevent>
        <GameOptions
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

      <GameTimer v-if="!resetTimer" @time-up="submitGuess()" />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import Prism from '../assets/prism/prism'
import type { ErrorQuestion } from '../types'
import { setCookie } from '../boot/cookies'
import { state } from '../state'
import GameOptions from 'components/GameOptions.vue'
import GameTimer from 'components/GameTimer.vue'

export default defineComponent({
  name: 'Game',

  components: { GameOptions, GameTimer },

  props: {
    difficulty: { type: String || Array, required: true },
    filteredErrors: { type: Array as PropType<ErrorQuestion[]>, required: true }
  },

  setup(props) {
    const index = ref(0)
    const selectedLine = ref(0)
    const selectedText = ref(0)
    const resetTimer = ref(false)

    function submitGuess(): void {
      const { difficulty, filteredErrors } = props
      const i = index.value
      const { line, text } = filteredErrors[i].answers
      const { consentCookie, userCookie } = state
      const score = { line: 0, text: 0 }

      if (line === selectedLine.value) score.line = 1
      if (text === selectedText.value) score.text = 1

      if (consentCookie === false) return

      if (userCookie) {
        const { overallScore, answeredQuestionIds } = userCookie

        overallScore.line += score.line
        overallScore.text += score.text
        overallScore.total += score.line + score.text
        answeredQuestionIds.push(filteredErrors[i].id)

        setCookie(userCookie)
      } else {
        setCookie({
          name: '',
          preferredDifficulty: difficulty,
          overallScore: { ...score, total: score.line + score.text },
          answeredQuestionIds: [filteredErrors[index.value].id]
        })
      }
    }

    function randomIndex(): void {
      const { filteredErrors } = props

      if (filteredErrors.length === 1) return

      for (let i = 0; i < filteredErrors.length; i++) {
        if (filteredErrors[i] !== filteredErrors[index.value]) {
          index.value = i
          return
        }
      }
    }

    function skip(): void {
      randomIndex()
      setTimeout(Prism.highlightAll)
    }

    return { index, selectedLine, selectedText, resetTimer, submitGuess, skip }
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
