<template>
  <div id="cookie-consent">
    <div class="cookie-text">
      <p>
        This site uses cookies to retain your name (if supplied) and overall score,
        <b>nothing else.</b> Disabling these cookies won't prevent the game from
        functioning, but would mean you couldn't track your progress.
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

export default defineComponent({
  name: 'CookieConsent',

  setup(_, { emit }) {
    const cookies = useQuasar().cookies
    const existingConsentCookie = cookies.has('eg_cookie_consent')

    function disableCookies(): void {
      const existingUserCookie = cookies.has('eg_user_records')
      if (existingUserCookie) cookies.remove('eg_user_records')

      cookies.set('eg_cookie_consent', 'false', { path: '/' })

      emit('dismiss')
    }

    function allowCookies(): void {
      cookies.set('eg_cookie_consent', 'true', { path: '/' })

      emit('dismiss')
    }

    return { existingConsentCookie, disableCookies, allowCookies }
  }
})
</script>

<style lang="scss" scoped>
@import '../css/mixins';

#cookie-consent {
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
  font: 1em monospace;
  text-align: left;

  p {
    margin: 0.5em 0;
  }
}
</style>
