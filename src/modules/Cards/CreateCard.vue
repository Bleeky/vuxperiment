<template>
  <Loading
    :reqs="['createCard']"
    component="Spinner"
  >
    <div
      ref="formWrapper"
    >
      <transition
        appear
        name="fade"
        leave-active-class="fade-leave"
      >
        <div
          v-if="currentStep===0"
          key="nameStep"
        >
          <ValidationObserver
            v-slot="{ handleSubmit }"
          >
            <form
              @submit.prevent="handleSubmit(onSubmit)"
            >
              <div class="text-4xl font-extrabold text-blue-900 mb-8">
                Let's create a new Pokemon card !
              </div>
              <div class="mb-6">
                <label
                  class="block text-gray-700 font-bold mb-2"
                >
                  What is the name of your Pokemon ?
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
                    class="py-2 px-3 rounded mt-1 block w-full border focus:outline-none focus:border-blue-900"
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
                  <Icon
                    icon="RightArrow"
                    :class="'fill-current h-3 w-3 ml-2'"
                  />
                </button>
              </div>
            </form>
          </ValidationObserver>
        </div>
        <div
          v-else-if="currentStep===1"
          key="typeStep"
        >
          <div class="text-4xl font-extrabold text-blue-900 mb-8">
            Let's select a type.
          </div>
          <Loading
            :reqs="['getTypes']"
            component="Spinner"
          >
            <div class="grid grid-cols-4 gap-2">
              <div
                v-for="type in types"
                :key="type.id"
                :class="['flex items-center cursor-pointer border-gray-400 border-2 rounded p-4 flex flex-col justify-between leading-normal', selectedtype && selectedtype.name === type.name ? 'border-blue-900 bg-gray-200 text-blue-900' : 'text-gray-900']"
                @click="selectedtype = type"
              >
                <div class="font-bold text-xl capitalize">
                  {{ type.name }}
                </div>
                <Icon
                  :icon="type.icon"
                  custom-chunk="pokemon-icons"
                  :class="'mt-4 h-12 w-12'"
                />
              </div>
            </div>
          </Loading>
        </div>
        <div
          v-else-if="currentStep===2"
          key="habitatStep"
        >
          <div class="text-4xl font-extrabold text-blue-900 mb-8">
            Where does your Pokemon lives?
          </div>
          <Loading
            :reqs="['getTypes']"
            component="Spinner"
          >
            <div
              v-for="habitat in habitats"
              :key="habitat.id"
              :class="['font-bold cursor-pointer text-xl capitalize flex items-center flex-row border-gray-400 border-2 rounded p-4 mb-2', selectedHabitat && selectedHabitat.name === habitat.name ? 'border-blue-900 text-blue-900' : 'text-gray-900']"
              @click="selectedHabitat = habitat"
            >
              {{ habitat.name }}
            </div>
          </Loading>
        </div>
        <div
          v-else-if="currentStep===3"
          key="abilitiesStep"
        >
          <div class="text-4xl font-extrabold text-blue-900 mb-8">
            What are your Pokemon abilities?
          </div>
          <Loading
            :reqs="['getTypes']"
            component="Spinner"
          >
            <input
              id="name"
              v-model="name"
              type="text"
              name="name"
              placeholder="Name"
              class="py-2 px-3 rounded mt-1 block w-full border focus:outline-none focus:border-blue-900"
            >
            <multiselect
              v-model="value"
              :options="abilities"
              :searchable="true"
              :close-on-select="false"
              :show-labels="false"
              :multiple="true"
              :taggable="true"
              tag-placeholder="Add this as new tag"
              placeholder="Pick a value"
            />
          </Loading>
        </div>
        <div
          v-else-if="currentStep===4"
          key="pictureStep"
        >
          <div class="text-4xl font-extrabold text-blue-900 mb-8">
            What does your pokemon look like?
          </div>
          <Loading
            :reqs="['getTypes']"
            component="Spinner"
          >
            Form here
          </Loading>
        </div>
        <div
          v-else-if="currentStep===5"
          key="recapStep"
        >
          <div class="text-4xl font-extrabold text-blue-900 mb-8">
            Here is what your new Pokemon will look like!
          </div>
          <Loading
            :reqs="['getTypes']"
            component="Spinner"
          >
            Form here
          </Loading>
        </div>
      </transition>
    </div>
    <transition name="slide-fade">
      <div
        v-if="currentStep > 0"
        ref="bottomNav"
        class="steps-nav bg-white fixed bottom-0 left-0 w-full p-10 flex items-center justify-between"
      >
        <div class="absolute bottom-0 left-0 h-2 bg-gray-300 w-full" />
        <div
          ref="progressBar"
          class="steps-nav-progress-bar absolute bottom-0 left-0 h-2 bg-yellow-500 rounded-r-md"
        />
        <div
          ref="progress"
          class="steps-nav-progress-bar-number absolute text-sm font-bold"
          :style="`bottom: 0.5rem`"
        >
          {{ progress }}%
        </div>
        <button
          class="flex items-center bg-transparent hover:bg-blue-900 text-blue-900 font-semibold hover:text-white py-2 px-4 border border-blue-900 hover:border-transparent rounded"
          @click.prevent="currentStep > 0 ? currentStep -= 1 : 0"
        >
          <Icon
            icon="LeftArrow"
            :class="'fill-current h-3 w-3 mr-2'"
          />
          Back
        </button>
        <button
          :disabled="!isStepValid"
          :class="['flex items-center bg-transparent hover:bg-blue-900 text-blue-900 font-semibold hover:text-white py-2 px-4 border border-blue-900 hover:border-transparent rounded', !isStepValid && 'opacity-50 cursor-not-allowed']"
          @click.prevent="onSubmit"
        >
          Continue
          <Icon
            icon="RightArrow"
            :class="'fill-current h-3 w-3 ml-2'"
          />
        </button>
      </div>
    </transition>
  </Loading>
</template>

<script>
import { Type, Habitat } from 'models';

import { API } from 'aws-amplify';

export default {
  name: 'CreateCard',
  data() {
    return {
      formErrors: [],
      name: null,
      value: null,
      selectedtype: null,
      selectedHabitat: null,
      currentStep: 0,
      steps: [{}, {}, {}, {}, {}, {}],
      stepValid: false,
    };
  },
  computed: {
    abilities() {
      return ['Select option', 'options', 'selected', 'mulitple', 'label', 'searchable', 'clearOnSelect', 'hideSelected', 'maxHeight', 'allowEmpty', 'showLabels', 'onChange', 'touched'];
    },
    types() {
      return Type.all();
    },
    habitats() {
      return Habitat.all();
    },
    progress() {
      return Math.round((100 / (this.steps.length - 1)) * this.currentStep);
    },
    isStepValid() {
      if (this.currentStep === 1 && !this.selectedtype) return false;
      if (this.currentStep === 2 && !this.selectedHabitat) return false;
      return true;
    },
  },
  watch: {
    currentStep(newValue) {
      if (newValue === 1) {
        this.$store.dispatch('getTypes');
      } else if (newValue === 2) {
        this.$store.dispatch('getHabitats');
      }
    },
  },
  updated() {
    this.$nextTick(function () {
      if (this.$refs.progress && this.$refs.progressBar) {
        let progressFromLeft = this.$refs.progress.clientWidth / 2;
        if (this.currentStep === 0) progressFromLeft = 0;
        else if (this.currentStep === 5) progressFromLeft = this.$refs.progress.clientWidth + 10;
        this.$refs.progress.style.left = `calc(${this.progress}% - ${progressFromLeft}px)`;
        this.$refs.progressBar.style.width = `${this.progress}%`;
      }
      if (this.$refs.bottomNav && this.$refs.formWrapper) {
        this.$refs.formWrapper.style.marginBottom = `${this.$refs.bottomNav.clientHeight + 40}px`;
      }
    });
  },
  beforeCreate() {
    this.$store.dispatch('setCreationMode', true);
  },
  methods: {
    onSubmit() {
      this.currentStep += 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.steps-nav {
  box-shadow: 0px 0 30px rgba(42, 67, 101, .2);

  .steps-nav-progress-bar {
    background-color: #f60a49;
    transition: width 0.3s ease-out;
  }
  .steps-nav-progress-bar-number {
    color: #f60a49;
    transition: left 0.3s ease-out;
  }
}

</style>
