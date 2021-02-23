<template>
  <div class="container" :class="{ secondary: $route.path !== '/' }">
    <NavIcons @cookie-click="cookieConsent = true" />
    <Header />
    <router-view />
    <CookieConsent v-if="cookieConsent" @dismiss="cookieConsent = false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import NavIcons from 'components/NavIcons.vue'
import Header from 'components/Header.vue'
import CookieConsent from 'components/CookieConsent.vue'

export default defineComponent({
  name: 'App',

  components: { NavIcons, Header, CookieConsent },

  setup() {
    const cookies = useQuasar().cookies
    const cookieConsent = ref(true)

    if (cookies.has('eg_cookie_consent')) {
      cookieConsent.value = false
    }

    return { cookieConsent }
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
