<template>
  <teleport to="body">
    <div @click="$emit('click')" class="modal">
      <div id="modal-content" aria-atomic="true" aria-live="polite">
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'Modal',

  emits: ['click'],

  setup(_, { emit }) {
    let keyupTimes = 0

    function closeModalOnEnter(e: KeyboardEvent): void {
      if (e.key !== 'Enter') return

      keyupTimes += 1

      if (keyupTimes > 1) {
        keyupTimes = 0
        emit('click')
      }
    }

    onMounted(() => {
      document.addEventListener('keyup', closeModalOnEnter)
    })
    onBeforeUnmount(() => {
      document.removeEventListener('keyup', closeModalOnEnter)
    })
  }
})
</script>

<style lang="scss" scoped>
@import '../css/mixins';

.modal {
  cursor: pointer;
  @include flex-x(center, center);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(var(--black-rgb), 0.5);
}
#modal-content {
  display: grid;
  grid-template-rows: 20% 80%;
  justify-items: center;
  padding: 2em;
  text-align: left;
  font: 1.2em var(--font-secondary);
  color: var(--black);
  background-color: var(--white);
  border-radius: 4px;
}
</style>
