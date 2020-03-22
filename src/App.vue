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
                <Icon
                  icon="IconCross"
                  :class="'fill-current h-6 w-6'"
                />
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
              <div class="text-m font-bold lg:flex-grow text-center text-blue-900">
                <router-link
                  to="/cards"
                >
                  <div
                    class="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-700 mr-5"
                  >
                    My cards
                  </div>
                </router-link>
                <router-link
                  to="/add-card"
                >
                  <li
                    class="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-700 mr-5"
                  >
                    Add a card
                  </li>
                </router-link>
                <router-link
                  to="/create-card"
                >
                  <li
                    class="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-700 mr-5"
                  >
                    Create a card
                  </li>
                </router-link>
              </div>
              <div>
                <button
                  class="inline-block text-sm font-bold px-4 py-2 leading-none border rounded text-white border-blue-900 hover:border-gray-700 hover:text-white bg-blue-900 hover:bg-gray-700 mt-4 lg:mt-0"
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
          loggedIn ? 'container mx-auto w-full p-4' : '',
          creationMode ? 'container mx-auto max-w-xl' : '',
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
