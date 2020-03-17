<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form
      id="app"
      action="https://vuejs.org/"
      method="post"
      @submit.prevent="handleSubmit(onSubmit)"
    >
      <div class="container mx-auto">
        <div class="text-xl">
          Add a new card
        </div>
        <p v-if="formErrors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li
              v-for="error in formErrors"
              :key="error.id"
            >
              {{ error }}
            </li>
          </ul>
        </p>

        <label class="block">
          <span class="text-gray-700">Name</span>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
          >
            <input
              id="name"
              v-model="name"
              type="text"
              name="name"
              placeholder="name"
              class="form-input mt-1 block w-full"
            >
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </label>
        <label class="block">
          <span
            for="password"
            class="text-gray-700"
          >Age</span>
          <input
            id="password"
            v-model="age"
            type="text"
            name="password"
            class="form-input mt-1 block w-full"
          >
        </label>
      </div>

      <button
        type="submit"
        class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
      >
        Submit
      </button>
    </form>
  </ValidationObserver>
</template>

<script>
export default {
  name: 'CardForm',
  data() {
    return {
      formErrors: [],
      name: null,
      age: null,
      movie: null,
    };
  },
  methods: {
    async onSubmit() {
      console.error('form submitted');
    },
  },
};
</script>
