import { Cookies } from 'quasar'
import { boot } from 'quasar/wrappers'
import { setConsentCookie, setUserCookie } from '../state'

export default boot(ssrContext => {
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies

  setConsentCookie(cookies.get('eg_cookie_consent'))
  setUserCookie(cookies.get('eg_user_records'))
})
