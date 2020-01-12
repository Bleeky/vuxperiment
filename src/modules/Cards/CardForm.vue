<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form
      id="app"
      action="https://vuejs.org/"
      method="post"
      @submit.prevent="handleSubmit(onSubmit)"
    >
      <div class="container mx-auto">
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
            rules="required|email"
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
            for="age"
            class="text-gray-700"
          >Age</span>
          <input
            id="age"
            v-model="age"
            type="number"
            name="age"
            min="0"
            class="form-input mt-1 block w-full"
          >
        </label>
      </div>


      <p>
        <label for="movie">Favorite Movie</label>
        <select
          id="movie"
          v-model="movie"
          name="movie"
        >
          <option>Star Wars</option>
          <option>Vanilla Sky</option>
          <option>Atomic Blonde</option>
        </select>
      </p>

      <p>
        <input
          type="submit"
          value="Submit"
        >
      </p>
    </form>
  </ValidationObserver>
</template>

<script>
import { Auth, API } from 'aws-amplify';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

// No message specified.
extend('email', email);

// Override the default message.
extend('required', {
  ...required,
  message: 'This field is required',
});

export default {
  name: 'CardForm',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      formErrors: [],
      name: null,
      age: null,
      movie: null,
    };
  },
  beforeCreate: () => {
    API.get('cards', '/cards');
  },
  methods: {
    async onSubmit() {
      console.error('form submitted');
      try {
        await Auth.signIn('bleeky@admin.com', '!79*KnfqyqBcKrzR');
        API.get('cards', '/cards');
        alert('Logged in');
      } catch (e) {
        alert(e.message);
      }
    },
  },
};
</script>
