<template>
  <div class="container" :class="{ secondary: $route.path !== '/' }">
    <Banner />
    <ProgressWidget />
    <Navicons @cookie-click="showCookieConsent = true" />
    <router-view />
    <CookieConsent v-if="showCookieConsent" @dismiss="showCookieConsent = false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useMeta } from 'quasar'
import { state } from './state'
import Navicons from 'components/Navicons.vue'
import Banner from 'components/Banner.vue'
import CookieConsent from 'components/CookieConsent.vue'
import ProgressWidget from './components/ProgressWidget.vue'

export default defineComponent({
  name: 'App',

  components: { ProgressWidget, Navicons, Banner, CookieConsent },

  setup() {
    const showCookieConsent = ref(state.consentCookie === null)

    function addAccessibilityShadow(e: KeyboardEvent): void {
      if (e.key !== 'Tab') return
      document.body.classList.add('tab-shadow')
      window.removeEventListener('keydown', addAccessibilityShadow)
      window.addEventListener('mousedown', removeAccessibilityShadow)
    }

    function removeAccessibilityShadow(): void {
      document.body.classList.remove('tab-shadow')
      window.removeEventListener('mousedown', removeAccessibilityShadow)
      window.addEventListener('keydown', addAccessibilityShadow)
    }

    useMeta({ titleTemplate: (title) => `${title} | Error Guesser` })

    onMounted(() => window.addEventListener('keydown', addAccessibilityShadow))

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
