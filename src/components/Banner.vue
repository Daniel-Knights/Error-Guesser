<template>
  <header :class="{ 'secondary-header': $route.path !== '/' }">
    <router-link :to="{ name: 'home' }">
      <h1>ERROR <span>GUESSER</span></h1>
    </router-link>
    <p>WE ALL TALK ABOUT ERROR-HANDLING, BUT CAN <span>YOU</span> HANDLE YOUR ERRORS!?</p>
  </header>
</template>

<style lang="scss" scoped>
h1 {
  margin: 0;
  font-size: 6em;
}

p {
  margin: 0 1em 1em;
  font-size: 2em;
  letter-spacing: 1px;
}

span {
  color: var(--black);
}

.secondary-header {
  top: 0;
  left: 0;
  width: 100%;
  font-size: 8px;

  p {
    display: none;
  }
}
</style>
