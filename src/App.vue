<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  computed: mapState({
    loggedIn: (state) => state.auth.token,
  }),
  watch: {
    loggedIn(newValue, oldValue) {
      if (!oldValue && newValue) {
        if (this.$route.query.redirect) this.$router.push(this.$route.query.redirect);
        else this.$router.push('/cards-list');
      }
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
