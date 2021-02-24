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
 * @property `name: string`
 * @property `preferredDifficulty: string`
 * @property `overallScore: { line: number text: number total: number }`
 */
export interface Cookie {
  name: string
  preferredDifficulty: string
  overallScore: {
    line: number
    text: number
    total: number
  }
}
