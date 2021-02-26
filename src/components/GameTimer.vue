<template>
  <div class="timer">
    <svg width="95mm" height="95mm" viewBox="0 0 95 95">
      <circle
        cx="48"
        cy="48"
        r="40"
        fill-opacity="0"
        stroke-width="10"
        stroke-dasharray="262"
        stroke="#fff"
        ref="circle"
        :style="`stroke-dashoffset: ${
          strokeDashoffset >= -252 ? strokeDashoffset : -252
        }; transition-duration: ${$q.appVisible ? 1 : 0}s `"
      />
    </svg>
    <div v-if="timeRemaining" class="countdown pump-up" ref="timer">
      {{ timeRemaining }}s
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'GameTimer',

  setup(_, { emit }) {
    const timer = ref<null | Element>(null)
    const route = useRoute()
    const difficulty = route.params.difficulty
    const duration = difficulty === 'easy' ? 60 : difficulty === 'medium' ? 30 : 10
    const timeRemaining = ref(duration)
    const strokeDashoffset = ref(0)
    let timeout: number

    function timerAnimation(upOrDown: string): void {
      if (!timer.value) return

      const direction = upOrDown === 'up' ? ['down', 'up'] : ['up', 'down']

      timer.value.classList.remove(`pump-${direction[0]}`)
      timer.value.classList.add(`pump-${direction[1]}`)
    }

    function countdown(firstCall?: boolean): void {
      setTimeout(() => {
        strokeDashoffset.value -= 252 / duration
      })

      if (!firstCall) {
        timeRemaining.value -= 1

        timerAnimation('up')
        setTimeout(() => timerAnimation('down'), 250)
      }

      if (timeRemaining.value > 0) {
        timeout = window.setTimeout(() => countdown(), 1000)
      } else emit('time-up')
    }

    onMounted(() => {
      timerAnimation('up')
      setTimeout(() => timerAnimation('down'), 250)
      countdown(true)
    })

    onBeforeUnmount(() => clearTimeout(timeout))

    return { timer, timeRemaining, strokeDashoffset }
  }
})
</script>

<style lang="scss" scoped>
@import '../css/mixins';

.timer {
  @include flex-x(center, center);
  position: fixed;
  right: 0;
  bottom: 0;
}

svg {
  transform: scale3d(0.5, 0.5, 1);
}
circle {
  transition: stroke-dashoffset 1s linear;
}

.countdown {
  position: absolute;
  font: 2em var(--font-secondary);
}

.pump-up {
  transform: scale3d(1, 1, 1);
  transition: transform 0.25s;
}

.pump-down {
  transform: scale3d(0.8, 0.8, 1);
  transition: transform 0.75s;
}
</style>
