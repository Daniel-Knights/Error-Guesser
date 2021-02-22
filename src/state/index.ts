import { reactive } from 'vue'

export const state = reactive({
  difficulty: 'easy'
})

export function setDifficulty(difficulty: string): void {
  state.difficulty = difficulty
}
