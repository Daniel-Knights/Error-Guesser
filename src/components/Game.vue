<template>
  <main class="content">
    <form @submit.prevent>
      <GameOptions
        :index="index"
        :filteredErrors="filteredErrors"
        :selectedLine="selectedLine"
        :selectedText="selectedText"
        :answered="answered"
        :isCorrect="score"
        @line-select="selectedLine = $event"
        @text-select="selectedText = $event"
      />

      <div v-if="!answered">
        <button :disabled="filteredErrors.length === 1" @click="skipQuestion()">
          SKIP
        </button>
        <button @click="submitGuess()">SUBMIT GUESS</button>
      </div>
      <div v-else>
        <button @click="nextQuestion()" type="button">NEXT</button>
      </div>
    </form>

    <GameTimer v-if="!answered" @time-up="submitGuess()" :key="resetTimer" />
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

  setup(props, { emit }) {
    const index = ref(0)
    const selectedLine = ref(0)
    const selectedText = ref(0)
    const resetTimer = ref(false)
    const answered = ref(false)
    const score = { line: 0, text: 0 }

    function randomIndex(): void {
      const { filteredErrors } = props

      for (let i = 0; i < filteredErrors.length; i++) {
        if (filteredErrors[i] !== filteredErrors[index.value]) {
          index.value = i
          return
        }
      }
    }

    function skipQuestion(): void {
      randomIndex()
      setTimeout(Prism.highlightAll)

      answered.value = false
      resetTimer.value = !resetTimer.value
    }

    function submitGuess(): void {
      const i = index.value
      const { difficulty, filteredErrors } = props
      const { line, text } = filteredErrors[i].answers
      const { consentCookie, userCookie } = state

      score.line = line === selectedLine.value ? 1 : 0
      score.text = text === selectedText.value ? 1 : 0

      answered.value = true

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

    function nextQuestion(): void {
      emit('next-question')
      answered.value = false
      setTimeout(Prism.highlightAll)
    }

    return {
      index,
      selectedLine,
      selectedText,
      resetTimer,
      answered,
      score,
      skipQuestion,
      submitGuess,
      nextQuestion
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
