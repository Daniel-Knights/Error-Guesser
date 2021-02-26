<template>
  <div class="line-number">
    <h2>Line Number</h2>
    <pre class="line-numbers" @click="selectLine($event)">
      <code
        v-for="(line, i) in filteredErrors[index].snippet"
        :class="[selectedLine !== i || 'selected-line', 'language-js']"
        :key="line"
        :data-line-number="i"
      >{{ line }}</code>
    </pre>
    <CheckCross :isCorrect="true" />
  </div>

  <div class="error-text">
    <h2>Error Text</h2>
    <div class="error-options">
      <pre
        v-for="i in [0, 1, 2]"
        :key="i"
        :class="[selectedText !== i || 'selected-line', 'language-bash']"
        @click="$emit('text-select', i)"
      >
        <code>{{ filteredErrors[index].errorText[i] }}</code>
      </pre>
    </div>
  </div>
  <CheckCross :isCorrect="false" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { ErrorQuestion } from '../types'
import CheckCross from './CheckCross.vue'

export default defineComponent({
  name: 'GameOptions',

  components: { CheckCross },

  props: {
    index: { type: Number, required: true },
    filteredErrors: { type: Object as PropType<ErrorQuestion[]>, required: true },
    selectedLine: { type: Number, required: true },
    selectedText: { type: Number, required: true }
  },

  emits: ['line-select', 'text-select'],

  setup(_, { emit }) {
    function selectLine(e: MouseEvent): void {
      const target = e.target as HTMLElement
      if (target.localName !== 'code') return

      const { lineNumber } = target.dataset
      if (!lineNumber) return

      emit('line-select', +lineNumber)
    }

    return { selectLine }
  }
})
</script>

<style lang="scss" scoped>
@import '../css/mixins';

.line-number {
  margin: 20px 0;
}
h2 {
  margin: 0;
  font-size: 1.5em;
  letter-spacing: 1px;
  line-height: 1em;
}
pre {
  @include flex-y(false, false);

  .selected-line {
    @include selected-line;
  }
}

.error-text {
  @include flex-y(false, center);
  margin: 10px;
}
.error-options pre {
  cursor: pointer;
  padding: 10px 15px;

  &:hover,
  &.selected-line {
    @include selected-line;
  }
}
</style>
