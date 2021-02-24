<template>
  <div class="not-found">
    <h1>404</h1>

    <p>Oops. Nothing here...</p>

    <router-link to="/">
      <button>HOME</button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMeta } from 'quasar'

export default defineComponent({
  name: '404',

  setup() {
    useMeta({ title: '404' })
  }
})
</script>

<style lang="scss" scoped>
@import '../css/mixins';

.not-found {
  @include flex-y(center, center);
  position: absolute;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, var(--orange), var(--rose));
}

h1 {
  margin: 0;
  font-size: 30vh;
  font-weight: 500;
}

p {
  opacity: 0.4;
  font-size: 3em;
}
</style>
