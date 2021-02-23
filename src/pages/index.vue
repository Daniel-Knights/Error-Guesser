<template>
  <nav>
    <button @click="showModal = true">HELP</button>
    <router-link :to="{ name: 'play', params: { difficulty } }">
      <button tabindex="-1">PLAY</button>
    </router-link>
  </nav>

  <div v-if="showModal" @click="showModal = false" class="help-modal">
    <div class="help-modal-content">
      <h2>HOW TO PLAY</h2>
      <ol>
        <li>
          SELECT DIFFICULTY:
          <ul>
            <li>EASY: 60s</li>
            <li>MEDIUM: 30s</li>
            <li>HARD: 10s</li>
          </ul>
        </li>
        <li>SELECT THE LINE YOU THINK IS THE ORIGIN OF THE ERROR</li>
        <li>SELECT THE OPTION YOU THINK IS THE TEXT OF THE ERROR</li>
        <li>SUBMIT YOUR GUESS</li>
      </ol>
    </div>
  </div>

  <form @submit.prevent>
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
    <div v-if="state.consentCookie !== false">
      <label for="name-input">NAME:</label>
      <input v-model="name" id="name-input" type="text" />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeUnmount } from 'vue'
import { useQuasar } from 'quasar'
import type { Cookie } from './types'
import { state } from '../state'

export default defineComponent({
  name: 'index',

  setup() {
    const cookies = useQuasar().cookies
    const userCookie: Cookie = cookies.get('eg_user_records')
    console.log(userCookie)
    const difficulty = ref(userCookie?.preferredDifficulty || 'easy')
    const showModal = ref(false)
    const name = ref('')

    function selectDifficulty(e: Event): void {
      const { localName, dataset }: HTMLElement = e.target

      if (localName !== 'button' || !dataset.difficulty) return

      difficulty.value = dataset.difficulty
    }

    onBeforeUnmount(() => {
      if (state.consentCookie === false) return

      if (!userCookie) {
        cookies.set(
          'eg_user_records',
          { name: name.value, preferredDifficulty: difficulty.value },
          { path: '/' }
        )
      } else {
        userCookie.name = name.value
        userCookie.preferredDifficulty = difficulty.value
        cookies.set('eg_user_records', userCookie, { path: '/' })
      }
    })

    return { state, difficulty, showModal, name, selectDifficulty }
  }
})
</script>

<style lang="scss" scoped>
@import '../css/mixins';

.help-modal {
  cursor: pointer;
  @include flex-x(center, center);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(var(--black-rgb), 0.5);
}
.help-modal-content {
  display: grid;
  grid-template-rows: 20% 80%;
  justify-items: center;
  width: 50vw;
  height: 50vh;
  text-align: left;
  font: 1.2em monospace;
  color: var(--black);
  background-color: var(--white);
  border-radius: 4px;
}
h2 {
  margin: 0;
  font-size: 1.5em;
  text-decoration: underline;
}
li {
  margin: 5px;
}

.difficulty-btns {
  margin: 10px;

  button {
    padding: 0.1em 1em;
    text-shadow: 0 1px rgba(var(--black-rgb), 0.3);
    color: var(--white);
    border: 2px solid;
  }

  :nth-of-type(1) {
    background: var(--green);
  }
  :nth-of-type(2) {
    background: var(--blue);
  }
  :nth-of-type(3) {
    background: var(--red);
  }

  .selected {
    background: var(--white);
    color: var(--black);
    text-shadow: none;
  }
}
</style>
