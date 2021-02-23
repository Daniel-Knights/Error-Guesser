import { reactive } from 'vue'

interface State {
  consentCookie: boolean
}

export const state = reactive<State>({
  consentCookie: true
})

export function setConsentCookie(val: boolean): void {
  state.consentCookie = val
}
