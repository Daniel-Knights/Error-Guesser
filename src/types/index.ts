/**
 * @property `id: number`
 * @property `snippet: string[]`
 * @property `errorText: string[]`
 * @property `answers: { line: number text: number }`
 */
export interface ErrorQuestion {
  id: number
  snippet: string[]
  errorText: string[]
  answers: {
    line: number
    text: number
  }
}

/**
 * @property `preferredDifficulty: string`
 * @property `overallScore: { line: number text: number total: number }`
 * @property `answeredQuestionIds: number[]`
 */
export interface UserCookie {
  preferredDifficulty: string
  overallScore: {
    line: number
    text: number
    total: number
  }
  answeredQuestionIds: number[]
}
