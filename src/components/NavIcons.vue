<template>
  <div class="navicons">
    <button
      @click="$emit('cookie-click')"
      class="button-no-style"
      tabindex="0"
      aria-label="Open cookie consent widget"
    >
      <i class="fa fa-cookie-bite"></i>
    </button>
    <a
      href="https://github.com/Daniel-Knights/Error-Guesser"
      rel="noopener"
      target="_blank"
      aria-label="External link to the Error Guesser GitHub repo, opens a new tab"
    >
      <i class="fab fa-github"></i>
    </a>
  </div>
</template>

<style lang="scss" scoped>
@import '../css/mixins';

.navicons {
  position: fixed;
  top: 0;
  right: 0;
  padding: 1em 2em;
}
i {
  cursor: pointer;
  font-size: 1.5em;
  border-radius: 50%;
  text-shadow: 0px 2px rgba(var(--black-rgb), 0.3);
  transition: color 0.15s, var(--focus-transition);

  &:hover {
    color: var(--grey);
  }
  &:focus {
    outline: none;
    @include focus-shadow;
  }
}
a {
  margin-left: 20px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}
</style>
