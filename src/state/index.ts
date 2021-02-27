import { reactive } from 'vue'
import type { UserCookie } from '../types'

interface State {
  consentCookie: boolean | null
  userCookie: UserCookie | null
}

export const state = reactive<State>({
  consentCookie: null,
  userCookie: null
})

export function setConsentCookie(cookie: boolean): void {
  state.consentCookie = cookie
}

export function setUserCookie(cookie: UserCookie | null): void {
  state.userCookie = cookie
}
