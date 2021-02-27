<template>
  <div class="line-number">
    <h2>Line Number</h2>
    <div class="line-options">
      <!-- This container prevents 'answered' from affecting Prism -->
      <div :class="[answered && 'answered', 'code-container']">
        <pre class="line-numbers">
          <code
            v-for="(line, i) in filteredErrors[index].snippet"
            :class="[selectedLine === i && 'selected-line', 'language-js']"
            :tabindex="answered ? -1 : 0"
            @click="$emit('line-select', i)"
            @keyup.enter="$emit('line-select', i)"
            :key="line"
          >{{ line }}</code>
        </pre>
      </div>
      <CheckCross v-if="answered" :isCorrect="!!isCorrect.line" />
    </div>
  </div>

  <div class="error-text">
    <h2>Error Text</h2>
    <div class="error-options">
      <pre
        v-for="i in [0, 1, 2]"
        :class="[
          selectedText === i && 'selected-line',
          answered && 'answered',
          'language-bash'
        ]"
        @click="$emit('text-select', i)"
        @keyup.enter="$emit('text-select', i)"
        :tabindex="answered ? -1 : 0"
        :key="i"
      >
        <code>{{ filteredErrors[index].errorText[i] }}</code>
      </pre>
      <CheckCross v-if="answered" :isCorrect="!!isCorrect.text" />
    </div>
  </div>
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
    selectedText: { type: Number, required: true },
    answered: { type: Boolean, required: true },
    isCorrect: { type: Object as PropType<Record<string, number>>, required: true }
  },

  emits: ['line-select', 'text-select']
})
</script>

<style lang="scss" scoped>
@import '../css/mixins';

.line-options,
.error-options {
  @include flex-y(center, center);
}

.code-container {
  width: 100%;
}
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
.answered {
  pointer-events: none;
  filter: brightness(0.5);
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
