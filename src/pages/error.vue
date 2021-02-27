<template>
  <div>
    <p>Sorry, something went wrong.</p>
    <p>
      Please
      <a
        href="https://github.com/Daniel-Knights/Error-Guesser/issues"
        rel="noopener"
        target="_blank"
        aria-label="External link to the issues page of the Error Guesser GitHub repo, opens a new tab"
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
