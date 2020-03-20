<template>
  <Loading
    :reqs="['addCard']"
    component="Spinner"
  >
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
          Search input for card here. Don't forget to debounce search for live results.
          <button
            type="submit"
            class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </ValidationObserver>
  </Loading>
</template>

<script>
export default {
  name: 'AddCard',
  data() {
    return {
      formErrors: [],
    };
  },
  beforeCreate() {
    this.$store.dispatch('setCreationMode', true);
    console.error('creation fullscreen mode');
  },
  methods: {
    async onSubmit() {
      console.error('form submitted');
      this.$store.dispatch('addCard', {
        name: this.name,
        types: this.types,
      });
    },
  },
};
</script>
