<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-link to="/">
      Go to home
    </router-link>
    <router-link to="/cards-list">
      Go to cards list
    </router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  color: #2c3e50;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
  text-align: center;
}
</style>
