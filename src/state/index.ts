import { reactive } from 'vue'
import type { Cookie } from '../types'

interface State {
  consentCookie: boolean | null
  userCookie: Cookie | null
}

export const state = reactive<State>({
  consentCookie: null,
  userCookie: null
})

export function setConsentCookie(cookie: boolean): void {
  state.consentCookie = cookie
}

export function setUserCookie(cookie: Cookie | null): void {
  state.userCookie = cookie
}
