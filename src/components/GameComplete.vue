<template>
  <div class="game-complete">
    <p>You've answered all available questions!</p>
    <p>
      You can either
      <span @click="$emit('reset')" @keyup.enter="$emit('reset')" tabindex="0"
        >play again</span
      >, or,
      <a
        href="https://github.com/Daniel-Knights/Error-Guesser"
        rel="noopener"
        target="_blank"
        aria-label="External link to the Error Guesser GitHub repo, opens a new tab"
        >contribute more questions for others to play.</a
      >
    </p>
  </div>
</template>

<style lang="scss" scoped>
@import '../css/mixins';

.game-complete {
  padding: 10px;
  max-width: 800px;
  font: 1.5em var(--font-secondary);

  span,
  a {
    cursor: pointer;
    color: var(--black);
    text-decoration: underline;
    text-shadow: none;
    transition: var(--focus-transition);

    &:focus {
      outline: none;
      @include focus-shadow;
    }
    &:hover {
      text-decoration: none;
    }
  }
}
</style>
