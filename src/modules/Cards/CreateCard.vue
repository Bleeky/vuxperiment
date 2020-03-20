<template>
  <Loading
    :reqs="['createCard']"
    component="Spinner"
  >
    <ValidationObserver v-slot="{ handleSubmit }">
      <form
        @submit.prevent="handleSubmit(onSubmit)"
      >
        <template v-if="currentStep===0">
          <div class="text-4xl font-extrabold text-blue-900 mb-8">
            Let's create a new card !
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 font-bold mb-2"
            >
              What is the name of the card ?
            </label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <input
                id="name"
                v-model="name"
                type="text"
                name="name"
                placeholder="Name"
                class="form-input mt-1 block w-full"
              >
              <p class="text-red-500 text-xs mt-2">
                {{ errors[0] }}
              </p>
            </ValidationProvider>
          </div>
          <div class="flex justify-center">
            <button
              type="submit"
              class="flex items-center bg-transparent hover:bg-blue-900 text-blue-900 font-semibold hover:text-white py-2 px-4 border border-blue-900 hover:border-transparent rounded"
            >
              Continue
              <svg
                class="fill-current h-3 w-3 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 24"
              ><path
                d="M-4 0h24v24H-4z"
                opacity="0"
              /><path
                d="M1.5 24a1.001 1.001 0 01-.646-1.764L12.951 12 .854 1.764A1.002 1.002 0 01.736.354a1.002 1.002 0 011.41-.118l13 11a1.001 1.001 0 010 1.528l-13 11A1.003 1.003 0 011.5 24"
              /></svg>
            </button>
          </div>
        </template>
        <template v-if="currentStep === 1">
          <div class="text-4xl font-extrabold text-blue-900 mb-8">
            Let's select a type.
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div
              :class="['flex items-center cursor-pointer border-gray-400 border-2 bg-white rounded p-4 flex flex-col justify-between leading-normal', type === 1 ? 'border-blue-900 bg-gray-200 text-blue-900' : 'text-gray-900']"
              @click="type = 1"
            >
              <div class="font-bold text-xl">
                Poison
              </div>
              <Icon
                icon="IconPoison"
                :class="'h-10 w-10'"
              />
            </div>
            <div
              :class="['flex items-center cursor-pointer border-gray-400 border-2 bg-white rounded p-4 flex flex-col justify-between leading-normal', type === 2 ? 'border-blue-900 bg-gray-200 text-blue-900' : 'text-gray-900']"
              @click="type = 2"
            >
              <div class="font-bold text-xl">
                Fire
              </div>
              <Icon
                icon="IconFire"
                :class="'h-10 w-10'"
              />
            </div>
            <div
              :class="['flex items-center cursor-pointer border-gray-400 border-2 bg-white rounded p-4 flex flex-col justify-between leading-normal', type === 3 ? 'border-blue-900 bg-gray-200 text-blue-900' : 'text-gray-900']"
              @click="type = 3"
            >
              <div class="font-bold text-xl">
                Electric
              </div>
              <Icon
                icon="IconElectric"
                :class="'h-10 w-10'"
              />
            </div>
          </div>
        </template>
        <div
          v-if="currentStep > 0"
          class="steps-nav fixed bottom-0 left-0 w-full p-10 flex items-center justify-between"
        >
          <div class="absolute bottom-0 left-0 h-2 bg-gray-300 w-full" />
          <div
            class="steps-nav-progress-bar absolute bottom-0 left-0 h-2 bg-yellow-500 rounded-r-md"
            :style="`width:${progress}%`"
          />
          <div
            ref="progress"
            class="absolute text-sm"
            :style="`bottom: 0.5rem; left: calc(${progress}% - ${currentStep === 0 ? 0 : (progressWidth / 2)}px)`"
          >
            {{ progress }}%
          </div>
          <button
            class="flex items-center bg-transparent hover:bg-blue-900 text-blue-900 font-semibold hover:text-white py-2 px-4 border border-blue-900 hover:border-transparent rounded"
            @click.prevent="currentStep > 0 ? currentStep -= 1 : 0"
          >
            <svg
              viewBox="0 0 16 24"
              class="fill-current h-3 w-3 mr-2"
              xmlns="http://www.w3.org/2000/svg"
            ><path
              d="M-4 0h24v24H-4z"
              opacity="0"
            /><path d="M14.5 24a1 1 0 01-.646-.236l-13-11a1.001 1.001 0 010-1.528l13-11a1 1 0 011.293 1.528L3.048 12l12.098 10.236A1 1 0 0114.498 24" /></svg>
            Back
          </button>
          <button
            class="flex items-center bg-transparent hover:bg-blue-900 text-blue-900 font-semibold hover:text-white py-2 px-4 border border-blue-900 hover:border-transparent rounded"
            type="submit"
          >
            Continue
            <svg
              class="fill-current h-3 w-3 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 24"
            ><path
              d="M-4 0h24v24H-4z"
              opacity="0"
            /><path
              d="M1.5 24a1.001 1.001 0 01-.646-1.764L12.951 12 .854 1.764A1.002 1.002 0 01.736.354a1.002 1.002 0 011.41-.118l13 11a1.001 1.001 0 010 1.528l-13 11A1.003 1.003 0 011.5 24"
            /></svg>
          </button>
        </div>
      </form>
    </ValidationObserver>
  </Loading>
</template>

<script>
import { API } from 'aws-amplify';
import req from 'utils/req';

const loadData = req((fetch) => async (url) => {
  const response = await fetch(url);
  const data1 = await response.json();

  // const data2 = await API.get('cards', '/cards');
  //   const data2 = await getSomeOtherData();
  //   updateUI(data1, data2);
  console.error(data1);
});

loadData('https://pokeapi.co/api/v2/evolution-chain/?limit=20&offset=20');
loadData('https://pokeapi.co/api/v2/evolution-chain/?limit=20&offset=20');
loadData('https://pokeapi.co/api/v2/evolution-chain/?limit=20&offset=20');

export default {
  name: 'CreateCard',
  data() {
    return {
      formErrors: [],
      name: null,
      type: null,
      currentStep: 0,
      progressWidth: 0,
    };
  },
  computed: {
    progress() {
      return (100 / 4) * this.currentStep;
    },
  },
  beforeCreate() {
    this.$store.dispatch('setCreationMode', true);
  },
  updated() {
    this.$nextTick(function () {
      this.getProgressWidth();
    });
  },
  methods: {
    getProgressWidth() {
      if (this.$refs.progress) {
        this.progressWidth = this.$refs.progress.clientWidth;
      }
    },
    async onSubmit() {
      console.error('submit', this.$refs);
      if (this.currentStep === 1 && !this.type) {
        this.typeError = true;
      } else {
        this.currentStep += 1;
      }
      // this.$store.dispatch('addCard', {
      //   name: this.name,
      //   types: this.types,
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.steps-nav {
  box-shadow: 0px 0 30px rgba(42, 67, 101, .2);

  .steps-nav-progress-bar {
    background-color: #f60a49
  }
}
</style>
