<template>
  <div>
    <p>Sorry, something went wrong.</p>
    <p>
      Please
      <a
        href="https://github.com/Daniel-Knights/Error-Guesser/issues"
        rel="noopener"
        target="_blank"
        >file a bug report</a
      >, or try again.
    </p>
  </div>
</template>

<style lang="scss" scoped>
p {
  font: 2em var(--font-secondary);
}

a {
  color: var(--black);
  text-decoration: underline;
  text-shadow: none;

  &:hover {
    text-decoration: none;
  }
}
</style>
