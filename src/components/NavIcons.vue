<template>
  <nav id="nav-icons">
    <i @click="$emit('cookie-click')" class="fa fa-cookie-bite"></i>
    <a
      href="https://github.com/Daniel-Knights/Error-Guesser"
      rel="noopener"
      target="_blank"
    >
      <i class="fab fa-github"></i>
    </a>
  </nav>
</template>

<style lang="scss" scoped>
#nav-icons {
  position: fixed;
  top: 0;
  right: 0;
  padding: 1em 2em;

  i {
    cursor: pointer;
    margin: 0 0.5em;
    font-size: 1.5em;
    transition: color 0.15s;

    &:hover {
      color: var(--grey);
    }
  }
}
</style>
