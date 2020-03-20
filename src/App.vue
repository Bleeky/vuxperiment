<template>
  <div id="app">
    <Loading
      :reqs="['checkSession']"
      component="Spinner"
    >
      <div v-if="loggedIn">
        <nav class="flex items-center justify-between flex-wrap p-6">
          <router-link to="/cards">
            <Logo :class="'cursor-pointer mr-6'" />
          </router-link>
          <template v-if="creationMode">
            <div class="flex justify-between items-center ">
              <span
                class="cursor-pointer p-3 border rounded border-blue-900 hover:text-white hover:border-transparent hover:bg-blue-900"
                @click.once="closeCreationMode"
              >
                <svg
                  class="fill-current h-6 w-6"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                ><title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
              </span>
            </div>
          </template>
          <template v-else>
            <div class="block lg:hidden">
              <button class="flex items-center px-3 py-2 border rounded text-blue-900 border-blue-900 hover:text-blue-900 hover:border-white">
                <svg
                  class="fill-current h-3 w-3"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                ><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
              </button>
            </div>
            <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
              <div class="text-m font-bold lg:flex-grow text-center text-gray-700">
                <router-link
                  to="/cards"
                >
                  <div
                    class="block mt-4 lg:inline-block lg:mt-0 hover:text-blue-900 mr-5"
                  >
                    My cards
                  </div>
                </router-link>
                <router-link
                  to="/add-card"
                >
                  <li
                    class="block mt-4 lg:inline-block lg:mt-0 hover:text-blue-900 mr-5"
                  >
                    Add a card
                  </li>
                </router-link>
                <router-link
                  to="/create-card"
                >
                  <li
                    class="block mt-4 lg:inline-block lg:mt-0 hover:text-blue-900 mr-5"
                  >
                    Create a card
                  </li>
                </router-link>
              </div>
              <div>
                <button
                  class="inline-block text-sm px-4 py-2 leading-none border rounded text-blue-900 border-blue-900 hover:border-transparent hover:text-white hover:bg-blue-900 mt-4 lg:mt-0"
                  @click="signout"
                >
                  Logout
                </button>
              </div>
            </div>
          </template>
        </nav>
      </div>
      <div
        :class="[
          darkMode ? 'dark-theme' : 'light-theme',
          loggedIn ? 'container mx-auto w-full' : '',
          creationMode ? 'container mx-auto max-w-md' : '',
        ]"
      >
        <router-view />
      </div>
    </Loading>
  </div>
</template>

<script>
import Logo from 'components/Logo';
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: { Logo },
  data() {
    return {
      darkMode: false,
    };
  },
  computed: mapState({
    loggedIn: (state) => state.auth.loggedIn,
    creationMode: (state) => (state.cards ? state.cards.creationMode : false),
  }),
  watch: {
    creationMode(newValue) {
      if (newValue === true) window.addEventListener('keydown', this.leaveOnEscape);
      else {
        this.$router.push('/cards');
        window.removeEventListener('keydown', this.leaveOnEscape);
      }
    },
    loggedIn(newValue, oldValue) {
      if (oldValue && !newValue) {
        console.error('is not connected anymore, redirecting to login');
        this.$router.push('/login');
      }
    },
  },
  beforeCreate() {
    this.leaveOnEscape = (event) => {
      if (event.keyCode === 27) {
        this.$store.dispatch('setCreationMode', false);
      }
    };
  },
  methods: {
    closeCreationMode() {
      this.$store.dispatch('setCreationMode', false);
    },
    signout() {
      this.$store.dispatch('signout');
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
