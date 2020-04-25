<template>
  <div
    id="app"
    class="bg-white dark:bg-gray-900"
  >
    <Loading
      :reqs="['checkSession', 'signout']"
      component="Spinner"
    >
      <div v-if="loggedIn">
        <nav class="flex items-center justify-between flex-wrap p-6">
          <router-link to="/cards">
            <Logo :class="'cursor-pointer mr-6'" />
          </router-link>
          <template v-if="creationMode">
            <div class="flex justify-between items-center">
              <span
                class="cursor-pointer p-3 border rounded dark:text-white border-blue-900 dark:border-white hover:text-white dark-hover:bg-white dark-hover:text-blue-900 hover:border-transparent hover:bg-blue-900"
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
            <div class="flex lg:hidden items-center">
              <button
                class="cursor-pointer p-3 border rounded dark:text-white border-blue-900 dark:border-white hover:text-white dark-hover:bg-white dark-hover:text-blue-900 hover:border-transparent hover:bg-blue-900"
                @click="menu = !menu"
              >
                <svg
                  :class="'h-3 w-3 fill-current'"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                ><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
              </button>
              <router-link
                to="/profile"
              >
                <Icon
                  :icon="'IconUser'"
                  :class="'ml-4 text-blue-900 dark:text-white stroke-current h-6 w-6 cursor-pointer hover:text-gray-600 dark-hover:text-gray-500'"
                />
              </router-link>
              <div :class="[darkmode ? 'icon-light' : 'icon-dark']">
                <Icon
                  :v-if="!darkmode"
                  :icon="darkmode ? 'IconNight' : 'IconSun'"
                  :class="'ml-4 text-blue-900 dark:text-white stroke-current h-6 w-6 cursor-pointer hover:text-gray-600 dark-hover:text-gray-500'"
                  @click.stop.native="toggleMode"
                />
              </div>
            </div>
            <div :class="[menu ? 'block' : 'hidden', 'w-full block flex-grow lg:flex lg:items-center lg:w-auto']">
              <div class="text-m font-bold lg:flex-grow text-center text-blue-900 dark:text-white">
                <router-link
                  to="/cards"
                >
                  <div
                    class="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-600 dark-hover:text-gray-500 lg:mr-5"
                  >
                    My cards
                  </div>
                </router-link>
                <router-link
                  to="/add-card"
                >
                  <li
                    class="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-600 dark-hover:text-gray-500 lg:mr-5"
                  >
                    Add a card
                  </li>
                </router-link>
                <router-link
                  to="/create-card"
                >
                  <li
                    class="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-600 dark-hover:text-gray-500 lg:mr-5"
                  >
                    Create a card
                  </li>
                </router-link>
              </div>
              <div class="flex items-center justify-center">
                <button
                  class="inline-block text-sm font-bold px-4 py-2 leading-none border rounded text-white dark:text-blue-900 border-blue-900 dark:border-white dark-hover:border-gray-500 hover:border-gray-600 hover:text-white bg-blue-900 dark:bg-white hover:bg-gray-600 dark-hover:bg-gray-500 mt-4 lg:mt-0"
                  @click="signout"
                >
                  Logout
                </button>
                <div :class="['hidden lg:flex']">
                  <router-link
                    to="/profile"
                  >
                    <Icon
                      :icon="'IconUser'"
                      :class="'ml-4 text-blue-900 dark:text-white stroke-current h-6 w-6 cursor-pointer hover:text-gray-600 dark-hover:text-gray-500'"
                    />
                  </router-link>
                  <div :class="darkmode ? 'icon-light' : 'icon-dark'">
                    <Icon
                      :v-if="!darkmode"
                      :icon="darkmode ? 'IconNight' : 'IconSun'"
                      :class="'ml-4 text-blue-900 dark:text-white stroke-current h-6 w-6 cursor-pointer hover:text-gray-600 dark-hover:text-gray-500'"
                      @click.stop.native="toggleMode"
                    />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </nav>
      </div>
      <Modal
        :visible="Object.keys(modal).length > 0"
        :close-on-outside="false"
        @close="clearModal"
      >
        <template
          v-if="modal.type === 'confirm'"
          v-slot:content
        >
          <div class="flex justify-center p-4 flex-col items-center">
            <div class="text-white text-3xl">
              Are you sure ?
            </div>
            <button
              class="mt-4 focus:outline-none bg-blue-900 hover:bg-gray-700 text-white font-semibold hover:text-white py-2 px-4 border border-blue-900 hover:border-gray-700 rounded"
              @click.stop="modal.action()"
            >
              Yes
            </button>
          </div>
        </template>
      </Modal>
      <div
        :class="[
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

function checkDarkMode() {
  const storedMode = localStorage.getItem('mode');
  if ((window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) || storedMode === 'dark') {
    return true;
  }
  return false;
}

export default {
  name: 'App',
  components: { Logo },
  data() {
    return {
      menu: false,
      darkmode: false,
    };
  },
  computed: mapState({
    modal: (state) => state.modal.config,
    loggedIn: (state) => state.auth.loggedIn,
    creationMode: (state) => (state.cards ? state.cards.creationMode : false),
  }),
  watch: {
    creationMode(newValue) {
      if (newValue === true) window.addEventListener('keydown', this.leaveOnEscape);
      else if (this.$route.path !== '/cards') {
        if (this.$route.name !== 'NotFound') this.$router.push('/cards');
        window.removeEventListener('keydown', this.leaveOnEscape);
      }
    },
    loggedIn(newValue, oldValue) {
      if (oldValue && !newValue) {
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
  created() {
    if (checkDarkMode()) {
      this.darkmode = true;
      document.documentElement.classList.add('mode-dark');
    } else {
      this.darkmode = false;
      document.documentElement.classList.remove('mode-dark');
    }
  },
  methods: {
    clearModal() {
      const { modal } = this;
      this.$store.dispatch('clearModal');
      if (modal.cancel) modal.cancel();
    },
    toggleMode() {
      if (!this.darkmode) {
        document.documentElement.classList.add('mode-dark');
        localStorage.setItem('mode', 'dark');
      } else {
        document.documentElement.classList.remove('mode-dark');
        localStorage.setItem('mode', 'light');
      }
      this.darkmode = !this.darkmode;
    },
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
.icon-light {
  transform-origin: center;
  transition: opacity .5s, transform .5s;
}
.icon-dark {
  transform: rotateX(180deg);
  transform-origin: center;
  transition: opacity .5s, transform .5s;
}
</style>
