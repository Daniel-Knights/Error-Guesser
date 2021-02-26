<template>
  <svg width="64" height="64">
    <circle cx="32" cy="32" r="32" fill="#fff" />
    <g v-if="isCorrect">
      <path id="checkPath" d="M17 32 l10 10 18 -18" fill="none" />
      <use href="#checkPath" stroke="var(--blue)" stroke-width="4.5" />
      <use href="#checkPath" stroke="var(--orange)" stroke-width="4.5" />
      <use href="#checkPath" stroke="var(--green)" stroke-width="5" />
    </g>
    <g v-else>
      <g id="crossPath">
        <path d="M18 21 l27 24" />
        <path d="M18 45 l27 -24" />
      </g>
      <use href="#crossPath" stroke="var(--green)" stroke-width="4.5" />
      <use href="#crossPath" stroke="var(--blue)" stroke-width="4.5" />
      <use href="#crossPath" stroke="var(--red)" stroke-width="5" />
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
  position: absolute;
  animation: svg 1s cubic-bezier(0.075, 0.82, 0.165, 1) forwards;

  circle {
    transform: scale(0);
    transform-origin: center;
    animation: circle 0.5s cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
  }

  use {
    stroke-dashoffset: 40;
    stroke-dasharray: 40;
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
    transform: scale3d(0, 0, 0) translateY(100%);
  }
  100% {
    transform: scale3d(1, 1, 1) translateY(0);
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
