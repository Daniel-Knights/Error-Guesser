<template>
  <div class="navicons">
    <i
      @click="$emit('cookie-click')"
      @keyup.enter="$emit('cookie-click')"
      class="fa fa-cookie-bite"
      tabindex="0"
    ></i>
    <a
      href="https://github.com/Daniel-Knights/Error-Guesser"
      rel="noopener"
      target="_blank"
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
