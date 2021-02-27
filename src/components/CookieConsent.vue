<template>
  <div class="cookie-consent">
    <div class="cookie-text">
      <p>
        This site uses cookies to retain your name (if supplied) and overall score,
        <b>nothing else.</b> Disabling these cookies won't prevent the game from
        functioning, <b>but would mean you couldn't track your progress</b>.
      </p>
      <p>
        We're all developers here, you get the idea. Just check the DevTools if you don't
        believe me!
      </p>
    </div>

    <div class="cookie-btns">
      <button @click="disableCookies()">DISABLE COOKIES</button>
      <button @click="allowCookies()">ALLOW COOKIES</button>
    </div>
  </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar'
import { defineComponent } from 'vue'
import { state, setConsentCookie, setUserCookie } from '../state'

export default defineComponent({
  name: 'CookieConsent',

  setup(_, { emit }) {
    const cookies = useQuasar().cookies

    function disableCookies(): void {
      if (state.userCookie) {
        cookies.remove('eg_user_records', { path: '/' })
        setUserCookie(null)
      }

      cookies.set('eg_cookie_consent', 'false', { path: '/' })
      setConsentCookie(false)

      emit('dismiss')
    }

    function allowCookies(): void {
      cookies.set('eg_cookie_consent', 'true', { path: '/' })
      setConsentCookie(true)

      emit('dismiss')
    }

    return { disableCookies, allowCookies }
  }
})
</script>

<style lang="scss" scoped>
@import '../css/mixins';

.cookie-consent {
  display: grid;
  grid-template-columns: 70% 30%;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 0.2em;
  background: linear-gradient(90deg, var(--deep-blue), var(--blue));
}
.cookie-text {
  margin: 1em;
  font: 1em var(--font-secondary);
  text-align: left;

  p {
    margin: 0.5em 0;
  }
}
</style>
