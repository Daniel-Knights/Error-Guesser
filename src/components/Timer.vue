<template>
  <div id="timer">
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
          :style="
            `stroke-dashoffset: ${strokeDashoffset >= -252 ? strokeDashoffset : -252}`
          "
          ref="circle"
        />
      </g>
    </svg>
    <div v-if="timer >= 0" class="countdown">{{ timer }}s</div>
    <div v-else class="countdown">TIME'S UP</div>
  </div>
</template>

<script lang="ts">
import { ref } from '@vue/composition-api'
import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    timer: number
    strokeDashoffset: number
  }
}

export default Vue.extend({
  name: 'Timer',

  props: { difficulty: { type: String, required: true } },

  setup(props, { emit }) {
    const duration =
      props.difficulty === 'easy' ? 60 : props.difficulty === 'medium' ? 30 : 10 // hard
    const timer = ref(duration)
    const strokeDashoffset = ref(0)

    function countdown(firstCall?: boolean): void {
      if (!firstCall) {
        timer.value -= 1
        strokeDashoffset.value -= 252 / duration
      }

      if (timer.value >= 0) setTimeout(() => countdown(), 1000)
      else emit('time-up')
    }

    countdown(true)

    return { timer, strokeDashoffset }
  }
})
</script>

<style lang="scss" scoped>
@import '../css/mixins';

#timer {
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
  font: 2em monospace;
}
</style>
