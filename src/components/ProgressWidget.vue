<template>
  <div class="progress-widget">
    <dl aria-atomic="true" aria-live="polite">
      <div class="description-pair">
        <dt>Correct Line Guesses:</dt>
        <dd>{{ state.userCookie?.overallScore.line || 0 }}</dd>
      </div>
      <div class="description-pair">
        <dt>Correct Text Guesses:</dt>
        <dd>{{ state.userCookie?.overallScore.text || 0 }}</dd>
      </div>
      <div class="description-pair">
        <dt>Total:</dt>
        <dd>{{ state.userCookie?.overallScore.total || 0 }}</dd>
      </div>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { state } from '../state'

export default defineComponent({
  name: 'ProgressWidget',

  setup: () => ({ state })
})
</script>

<style lang="scss" scoped>
.progress-widget {
  position: fixed;
  top: 0;
  left: 0;
  padding: 1em 2em;
}

.description-pair {
  display: flex;
  font-size: 1.5em;
}
</style>
