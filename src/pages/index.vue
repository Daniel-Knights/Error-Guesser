<template>
  <div>
    <router-link :to="{ name: 'tutorial' }">
      <button tabindex="-1">TUTORIAL</button>
    </router-link>
    <router-link :to="{ name: 'play', params: { difficulty } }">
      <button tabindex="-1">PLAY</button>
    </router-link>
    <div class="difficulty-btns" @click="selectDifficulty($event)">
      <button :class="{ selected: difficulty === 'easy' }" data-difficulty="easy">
        EASY
      </button>
      <button :class="{ selected: difficulty === 'medium' }" data-difficulty="medium">
        MEDIUM
      </button>
      <button :class="{ selected: difficulty === 'hard' }" data-difficulty="hard">
        HARD
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import { Cookie } from './types'

export default defineComponent({
  name: 'index',

  setup() {
    const cookies = useQuasar().cookies
    const userCookie: Cookie = cookies.get('eg_user_records')
    const difficulty = ref(userCookie?.preferredDifficulty || 'easy')

    function selectDifficulty(e: Event): void {
      const { localName, dataset }: HTMLElement = e.target

      if (localName !== 'button' || !dataset.difficulty) return

      difficulty.value = dataset.difficulty

      if (cookies.get('eg_cookie_consent') === false || !userCookie) return

      userCookie.preferredDifficulty = dataset.difficulty
      cookies.set('eg_user_records', userCookie, { path: '/' })
    }

    return { difficulty, selectDifficulty }
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
