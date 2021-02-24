<template>
  <div class="container" :class="{ secondary: $route.path !== '/' }">
    <Navicons @cookie-click="showCookieConsent = true" />
    <Banner />
    <router-view />
    <CookieConsent v-if="showCookieConsent" @dismiss="showCookieConsent = false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMeta } from 'quasar'
import { state } from './state'
import Navicons from 'components/Navicons.vue'
import Banner from 'components/Banner.vue'
import CookieConsent from 'components/CookieConsent.vue'

export default defineComponent({
  name: 'App',

  components: { Navicons, Banner, CookieConsent },

  setup() {
    const showCookieConsent = ref(state.consentCookie === null)

    useMeta({ titleTemplate: title => `${title} | Error Guesser` })

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
