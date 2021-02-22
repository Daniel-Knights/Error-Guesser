<template>
  <div>
    <router-link :to="{ name: 'tutorial' }">
      <button tabindex="-1">TUTORIAL</button>
    </router-link>
    <router-link :to="{ name: 'play' }">
      <button tabindex="-1">PLAY</button>
    </router-link>
    <div class="difficulty-btns" @click="selectDifficulty($event)">
      <button :class="{ selected: state.difficulty === 'easy' }" data-difficulty="easy">
        EASY
      </button>
      <button
        :class="{ selected: state.difficulty === 'medium' }"
        data-difficulty="medium"
      >
        MEDIUM
      </button>
      <button :class="{ selected: state.difficulty === 'hard' }" data-difficulty="hard">
        HARD
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { state, setDifficulty } from '../state'

export default defineComponent({
  name: 'index',

  setup() {
    function selectDifficulty({ target }: { target: HTMLElement }): void {
      if (target.localName !== 'button' || !target.dataset.difficulty) return

      setDifficulty(target.dataset.difficulty)
    }

    return { state, selectDifficulty }
  }
})
</script>

<style lang="scss" scoped>
@import '../css/mixins';

.difficulty-btns {
  :nth-of-type(1) {
    color: var(--white);
    background: var(--green);
  }
  :nth-of-type(2) {
    color: var(--white);
    background: var(--blue);
  }
  :nth-of-type(3) {
    color: var(--white);
    background: var(--red);
  }

  .selected {
    background: var(--white);
    color: var(--black);
  }
}
</style>
