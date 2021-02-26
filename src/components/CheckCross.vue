<template>
  <svg width="40" height="40">
    <circle cx="16" cy="16" r="16" fill="#fff" />
    <g v-if="isCorrect">
      <path id="checkPath" d="M9 16l5 5 9-9" fill="none" />
      <use href="#checkPath" stroke="var(--blue)" stroke-width="2" />
      <use href="#checkPath" stroke="var(--orange)" stroke-width="2" />
      <use href="#checkPath" stroke="var(--green)" stroke-width="2.5" />
    </g>
    <g v-else>
      <g id="crossPath">
        <path d="M9.5 10 l13 12" />
        <path d="M9.5 22 l13 -12" />
      </g>
      <use href="#crossPath" stroke="var(--green)" stroke-width="2" />
      <use href="#crossPath" stroke="var(--blue)" stroke-width="2" />
      <use href="#crossPath" stroke="var(--red)" stroke-width="2.5" />
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CheckCross',

  props: {
    isCorrect: { type: Boolean, required: true }
  }
})
</script>

<style lang="scss" scoped>
svg {
  animation: svg 1s cubic-bezier(0.075, 0.82, 0.165, 1);

  circle {
    transform: scale(0);
    transform-origin: center;
    animation: circle 0.5s cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
  }

  use {
    stroke-dashoffset: 20;
    stroke-dasharray: 20;
    animation: path 2s cubic-bezier(0.075, 1, 0.165, 1) forwards;

    &:nth-of-type(2) {
      animation-delay: 0.1s;
    }
    &:nth-of-type(3) {
      animation-delay: 0.2s;
    }
  }
}

@keyframes svg {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes circle {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes path {
  0% {
    stroke-dashoffset: 20;
    transform: rotate(10deg);
  }
  100% {
    stroke-dashoffset: 0;
    transform: rotate(0);
  }
}
</style>
