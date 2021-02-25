<template>
  <div class="timer">
    <svg width="95mm" height="95mm" viewBox="0 0 95 95" id="svg8">
      <defs id="defs2">
        <linearGradient id="linearGradient2917">
          <stop offset="0" id="stop2915" style="stop-color: #fff" />
        </linearGradient>
        <linearGradient
          gradientTransform="translate(-48.380952,-46.113095)"
          xlink:href="#linearGradient2917"
          id="linearGradient2919"
          x1="56.62962"
          y1="94.872025"
          x2="136.8942"
          y2="94.872025"
        />
      </defs>
      <g transform="translate(-0.88095856,-1.2589302)">
        <circle
          cx="48.380959"
          cy="48.75893"
          r="40"
          ref="circle"
          :style="`
            stroke-dashoffset: ${strokeDashoffset >= -252 ? strokeDashoffset : -252};
            transition-duration: ${$q.appVisible ? 1 : 0}s
          `"
        />
      </g>
    </svg>
    <div v-if="timeRemaining" class="countdown pump-up" ref="timer">
      {{ timeRemaining }}s
    </div>
    <div v-else class="countdown">TIME'S UP</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'GameTimer',

  setup(_, { emit }) {
    const timer = ref<null | Element>(null)
    const difficulty = useRoute().params.difficulty
    const duration = difficulty === 'easy' ? 60 : difficulty === 'medium' ? 30 : 10
    const timeRemaining = ref(duration)
    const strokeDashoffset = ref(0)

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
        setTimeout(() => countdown(), 1000)
      } else emit('time-up')
    }

    onMounted(() => {
      timerAnimation('down')
      countdown(true)
    })

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
  fill-opacity: 0;
  stroke: url(#linearGradient2919);
  stroke-width: 10;
  stroke-dasharray: 262;
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
