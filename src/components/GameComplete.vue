<template>
  <div class="game-complete">
    <p>You've answered all available questions!</p>
    <p>
      You can either <span @click="$emit('reset')">play again</span>, or,
      <a
        href="https://github.com/Daniel-Knights/Error-Guesser"
        rel="noopener"
        target="_blank"
        >contribute more questions for others to play.</a
      >
    </p>
  </div>
</template>

<style lang="scss" scoped>
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

    &:hover {
      text-decoration: none;
    }
  }
}
</style>
