/**
 * @property `preferredDifficulty: string`
 * @property `overallScore: { line: number text: number total: number }`
 */
export interface Cookie {
  preferredDifficulty: string
  overallScore: {
    line: number
    text: number
    total: number
  }
}
