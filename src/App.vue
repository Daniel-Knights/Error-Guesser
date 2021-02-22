<template>
  <div class="container" :class="{ secondary: $route.path !== '/' }">
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from 'components/Header.vue'

export default defineComponent({
  name: 'App',

  components: { Header }
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
