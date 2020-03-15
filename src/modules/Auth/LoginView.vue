<template>
  <div class="min-h-screen p-8 bg-gray-100">
    <div class="container mx-auto w-full sm:max-w-md">
      <ValidationObserver v-slot="{ handleSubmit }">
        <Loading
          type="spinner"
          req="login"
          component="Pokeball"
        >
          <form
            id="login"
            class="bg-white shadow-md rounded px-8 pt-6 pb-8"
            @submit.prevent="handleSubmit(onSubmit)"
          >
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
                rules="required"
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
            <div class="flex items-center justify-between">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline whitespace-no-wrap"
                type="submit"
              >
                Sign In
              </button>
              <button
                type="button"
                class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Don't have an account ? Create one here.
              </button>
            </div>
          </form>
        </Loading>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import store from 'store';

export default {
  data() {
    return {
      formErrors: [],
      username: null,
      password: null,
    };
  },
  methods: {
    onSubmit() {
      store.dispatch('login', {
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
