<template>
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

    <GameTimer @time-up="submitGuess()" :key="resetTimer" />
  </main>
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
      const i = index.value
      const { difficulty, filteredErrors } = props
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

      for (let i = 0; i < filteredErrors.length; i++) {
        if (filteredErrors[i] !== filteredErrors[index.value]) {
          index.value = i
          return
        }
      }
    }

    function skip(): void {
      if (props.filteredErrors.length === 1) return

      randomIndex()
      setTimeout(Prism.highlightAll)

      resetTimer.value = !resetTimer.value
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
