import type { BootFileParams } from '@quasar/app'
import type { UserCookie } from '../types'
import { Cookies } from 'quasar'
import { boot } from 'quasar/wrappers'
import { state, setConsentCookie, setUserCookie } from '../state'

let ssr: BootFileParams<unknown>

export function setCookie(cookie: UserCookie): void {
  setUserCookie(cookie)

  if (state.consentCookie === false) return

  const cookies = process.env.SERVER ? Cookies.parseSSR(ssr) : Cookies

  cookies.set('eg_user_records', JSON.stringify(cookie), { path: '/' })
}

export default boot((ssrContext) => {
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies

  ssr = ssrContext

  setConsentCookie(cookies.get('eg_cookie_consent'))
  setUserCookie(cookies.get('eg_user_records'))
})
