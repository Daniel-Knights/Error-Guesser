<template>
  <div class="container" :class="{ secondary: $route.path !== '/' }">
    <Navicons @cookie-click="showCookieConsent = true" />
    <Header />
    <router-view />
    <CookieConsent v-if="showCookieConsent" @dismiss="showCookieConsent = false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import Navicons from 'components/Navicons.vue'
import Header from 'components/Header.vue'
import CookieConsent from 'components/CookieConsent.vue'
import { state, setConsentCookie } from './state'

export default defineComponent({
  name: 'App',

  components: { Navicons, Header, CookieConsent },

  setup() {
    const cookies = useQuasar().cookies

    setConsentCookie(cookies.get('eg_cookie_consent'))

    const showCookieConsent = ref(state.consentCookie === null)

    return { showCookieConsent }
  }
})
</script>

<style lang="scss" scoped>
@import 'css/mixins';

.container {
  @include flex-y(center, center);
  position: relative;
  margin: 0 auto;
  min-height: 100vh;
  text-align: center;
}

.secondary {
  display: grid;
  grid-template-rows: 100px auto;
}
</style>
