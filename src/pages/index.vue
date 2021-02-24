<template>
  <nav>
    <button @click="showModal = true">HELP</button>
    <router-link :to="{ name: 'play', params: { lang: 'javascript', difficulty } }">
      <button tabindex="-1">PLAY</button>
    </router-link>
  </nav>

  <Modal v-if="showModal" @click="showModal = false">
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
      <li>SELECT THE LINE YOU THINK IS THE ORIGIN OF THE ERROR.</li>
      <li>SELECT THE OPTION YOU THINK IS THE TEXT OF THE ERROR.</li>
      <li>SUBMIT YOUR GUESS.</li>
    </ol>
  </Modal>

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
      <input v-model="name" id="name-input" type="text" placeholder="NAME" />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeUnmount } from 'vue'
import { useQuasar } from 'quasar'
import { setUserCookie, state } from '../state'
import type { Cookie } from '../types'
import Modal from '../components/Modal.vue'

export default defineComponent({
  name: 'index',

  components: { Modal },

  setup() {
    const cookies = useQuasar().cookies
    const difficulty = ref(state.userCookie?.preferredDifficulty || 'easy')
    const showModal = ref(false)
    const name = ref(state.userCookie?.name || '')

    function selectDifficulty(e: Event): void {
      const { localName, dataset } = e.target as HTMLElement

      if (localName !== 'button' || !dataset.difficulty) return

      difficulty.value = dataset.difficulty
    }

    function setCookie(cookie: Cookie): void {
      cookies.set('eg_user_records', JSON.stringify(cookie), { path: '/' })
      setUserCookie(cookie)
    }

    onBeforeUnmount(() => {
      if (state.consentCookie === false) return

      if (!state.userCookie) {
        setCookie({
          name: name.value,
          preferredDifficulty: difficulty.value,
          overallScore: { line: 0, text: 0, total: 0 }
        })
      } else {
        state.userCookie.name = name.value
        state.userCookie.preferredDifficulty = difficulty.value
        setCookie(state.userCookie)
      }
    })

    return { state, difficulty, showModal, name, selectDifficulty }
  }
})
</script>

<style lang="scss" scoped>
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
