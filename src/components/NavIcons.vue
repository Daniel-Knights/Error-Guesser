<template>
  <div class="navicons">
    <i @click="$emit('cookie-click')" class="fa fa-cookie-bite"></i>
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
.navicons {
  position: fixed;
  top: 0;
  right: 0;
  padding: 1em 2em;

  i {
    cursor: pointer;
    margin: 0 0.5em;
    font-size: 1.5em;
    text-shadow: 0px 2px rgba(var(--black-rgb), 0.3);
    transition: color 0.15s;

    &:hover {
      color: var(--grey);
    }
  }
}
</style>
