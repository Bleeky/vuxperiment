<template>
  <div class="min-h-screen p-8 bg-gray-200">
    <div class="container mx-auto w-full sm:max-w-md">
      <Logo :class="'mb-6 justify-center'" />
      <ValidationObserver v-slot="{ handleSubmit }">
        <Errors
          :reqs="['login', 'signup', 'verify']"
          :max="1"
        />
        <Loading
          :reqs="['login', 'signup', 'verify']"
          component="Pokeball"
        >
          <form
            class="bg-white shadow-md rounded px-8 pt-6 pb-8"
            @submit.prevent="handleSubmit(onSubmit)"
          >
            <template v-if="status==='verify'">
              <div class="mb-6">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="code"
                >
                  Code
                </label>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Code"
                  rules="required"
                >
                  <input
                    id="code"
                    v-model="code"
                    :class="{ 'border border-red-500': errors[0]}"
                    class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Verification code"
                  >
                  <p class="text-red-500 text-xs italic mt-2">
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>
              </div>
            </template>

            <template v-else>
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="username"
                >
                  Username
                </label>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Username"
                  rules="required"
                >
                  <input
                    id="username"
                    v-model="username"
                    :class="{ 'border border-red-500': errors[0]}"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Username"
                  >
                  <p class="text-red-500 text-xs italic mt-2">
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>
              </div>
              <div class="mb-6">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="password"
                >
                  Password
                </label>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Password"
                  :rules="`required${status === 'signup' ? '|confirmed:confirmation' : ''}`"
                >
                  <input
                    id="password"
                    v-model="password"
                    :class="{ 'border border-red-500': errors[0]}"
                    class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    placeholder="******************"
                  >
                  <p class="text-red-500 text-xs italic mt-2">
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>
              </div>
              <transition name="slide-fade">
                <template v-if="status==='signup'">
                  <div class="mb-6">
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="passwordConfirm"
                    >
                      Password confirm
                    </label>
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="PasswordConfirm"
                      rules="required"
                      vid="confirmation"
                    >
                      <input
                        id="passwordConfirm"
                        v-model="passwordConfirm"
                        :class="{ 'border border-red-500': errors[0]}"
                        class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        placeholder="******************"
                      >
                      <p class="text-red-500 text-xs italic mt-2">
                        {{ errors[0] }}
                      </p>
                    </ValidationProvider>
                  </div>
                </template>
              </transition>
            </template>
            <div class="flex items-center justify-between">
              <template v-if="status==='signup'">
                <router-link to="/login">
                  <button
                    class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  >
                    Back
                  </button>
                </router-link>
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline whitespace-no-wrap"
                  type="submit"
                >
                  Create account
                </button>
              </template>
              <template v-else-if="status==='verify'">
                <router-link to="/login">
                  <button
                    class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  >
                    Back
                  </button>
                </router-link>
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline whitespace-no-wrap"
                  type="submit"
                >
                  Verify
                </button>
              </template>
              <template v-else>
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline whitespace-no-wrap"
                  type="submit"
                >
                  Sign In
                </button>
                <router-link to="/signup">
                  <button
                    type="button"
                    class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  >
                    Don't have an account ? Create one here.
                  </button>
                </router-link>
              </template>
            </div>
          </form>
        </Loading>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import Logo from 'components/Logo';
import store from 'store';
import { mapState } from 'vuex';

export default {
  components: { Logo },
  props: {
    status: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      username: null,
      password: null,
      passwordConfirm: null,
      code: null,
    };
  },
  computed: mapState({
    loggedIn: (state) => state.auth.loggedIn,
  }),
  watch: {
    loggedIn: {
      immediate: true,
      handler(newValue, oldValue) {
        if (!oldValue && newValue) {
          if (this.$route.query.redirect) this.$router.push(this.$route.query.redirect);
          else this.$router.push('/cards');
        }
      },
    },
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch('checkSession');
    next();
  },
  methods: {
    onSubmit() {
      this.$store.dispatch(this.status, {
        username: this.username ? this.username : this.$route.params.username,
        password: this.password,
        code: this.code,
      }).then(() => {
        if (this.status === 'signup' && !this.$store.getters.error) {
          this.$router.push({ path: '/verify' });
        }
      }).catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
