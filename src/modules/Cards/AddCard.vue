<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <transition
      appear
      name="fade"
      leave-active-class="fade-leave"
    >
      <form
        @submit.prevent="handleSubmit(onSubmit)"
      >
        <div class="text-4xl font-extrabold text-blue-900 dark:text-white mb-8">
          Let's add a new pre-existing Pokemon card to your deck.
        </div>
        <Loading
          :reqs="['getPokemons']"
          component="Spinner"
        >
          <div class="mb-6">
            <label
              class="block text-gray-700 font-bold mb-2 dark:text-gray-400"
            >
              What is the name of the Pokemon you wish to add ?
            </label>
            <multiselect
              v-model="selectedPokemon"
              :options="pokemons"
              :searchable="true"
              :show-labels="true"
              :hide-selected="true"
              track-by="name"
              label="name"
              placeholder="Search for pokemons"
              :class="'dark:border-transparent dark:rounded dark:border'"
              @select="getPokemon"
            >
              <template
                slot="tag"
                slot-scope="{ option, remove }"
              >
                <span
                  class="multiselect__tag py-1 px-2 rounded flex items-center bg-blue-900 text-white"
                ><span>{{ option.name }}</span>
                  <Icon
                    icon="IconCross"
                    :class="'cursor-pointer fill-current h-5 w-5 text-white ml-2 hover:text-gray-500'"
                    @click.native="remove(option)"
                  /></span>
              </template>
              <template
                slot="clear"
              >
                <div
                  :v-if="selectedPokemon"
                  class="multiselect__clear"
                  @mousedown.prevent.stop="selectedPokemon = null"
                >
                  <Icon
                    icon="IconCross"
                    :class="'cursor-pointer fill-current text-blue-900 dark:text-white py-2 pl-1 h-full float-right'"
                  />
                </div>
              </template>
            </multiselect>
          </div>
          <div
            v-if="pokemonDetailed"
            class="flex justify-center"
          >
            <Loading
              :reqs="['getPokemon']"
              component="Spinner"
            >
              <card :card="pokemonDetailed" />
            </Loading>
          </div>
        </Loading>
        <div
          v-if="pokemonDetailed && pokemonDetailed.name"
          class="flex justify-center"
        >
          <button
            type="submit"
            class="flex items-center bg-transparent hover:bg-blue-900 dark-hover:bg-white dark:text-white text-blue-900 font-semibold hover:text-white dark-hover:text-blue-900 py-2 px-4 border dark:border-white border-blue-900 hover:border-transparent rounded"
          >
            Add
          </button>
        </div>
      </form>
    </transition>
  </ValidationObserver>
</template>

<script>
import { Pokemon } from 'models';
import CardView from 'modules/Cards/CardView';

export default {
  name: 'AddCard',
  components: {
    Card: CardView,
  },
  data() {
    return {
      selectedPokemon: null,
      formErrors: [],
    };
  },
  computed: {
    pokemons() {
      return Pokemon.all();
    },
    pokemonDetailed() {
      return Pokemon.find(this.selectedPokemon?.url);
    },
  },
  beforeCreate() {
    if (!this.pokemons) {
      this.$store.dispatch('getPokemons');
    }
    this.$store.dispatch('setCreationMode', true);
  },
  methods: {
    getPokemon(selectedOption) {
      this.$store.dispatch('getPokemon', selectedOption);
    },
    async onSubmit() {
      this.$store.dispatch('createCard', this.pokemonDetailed);
    },
  },
};
</script>
