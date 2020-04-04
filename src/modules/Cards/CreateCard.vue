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
              <div class="text-4xl font-extrabold text-blue-900 dark:text-white mb-8">
                Let's create a new Pokemon card !
              </div>
              <div class="mb-6">
                <label
                  class="block text-gray-700 font-bold mb-2 dark:text-gray-400"
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
                    class="py-2 px-3 rounded mt-1 block w-full border focus:outline-none focus:border-blue-900 dark:text-white dark:bg-gray-700 dark:border-gray-700 dark-focus:border-white"
                  >
                  <p class="text-red-500 text-xs mt-2">
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>
              </div>
              <div class="flex justify-center">
                <button
                  type="submit"
                  class="flex items-center bg-transparent hover:bg-blue-900 dark-hover:bg-white dark:text-white text-blue-900 font-semibold hover:text-white dark-hover:text-blue-900 py-2 px-4 border dark:border-white border-blue-900 hover:border-transparent rounded"
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
          <div class="text-4xl font-extrabold text-blue-900 dark:text-white mb-2">
            Let's select your Pokemon types.
          </div>
          <div class="font-light text-gray-700 dark:text-gray-400 mb-8">
            You can chose up to 2 types.
          </div>
          <Loading
            :reqs="['getTypes']"
            component="Spinner"
          >
            <div class="grid grid-cols-4 gap-2">
              <div
                v-for="type in types"
                :key="type.id"
                :class="['flex items-center cursor-pointer border-gray-400 dark:border-white border-2 rounded p-4 flex flex-col justify-between leading-normal', selectedTypes.find(stype => stype.name === type.name) ? 'border-blue-900 bg-gray-200 text-blue-900' : 'text-gray-900 dark:text-white']"
                @click="selectType(type)"
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
          <div class="text-4xl font-extrabold text-blue-900 dark:text-white mb-8">
            Where does your Pokemon lives?
          </div>
          <Loading
            :reqs="['getHabitats']"
            component="Spinner"
          >
            <div
              v-for="habitat in habitats"
              :key="habitat.id"
              :class="['font-bold cursor-pointer text-xl capitalize flex items-center flex-row border-gray-400 border-2 rounded p-4 mb-2', selectedHabitat && selectedHabitat.name === habitat.name ? 'border-blue-900 dark:border-white text-blue-900 dark:text-white' : 'text-gray-900 dark:text-white dark:border-gray-700']"
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
          <div class="text-4xl font-extrabold text-blue-900 dark:text-white mb-2">
            What are your Pokemon abilities?
          </div>
          <div class="font-light text-gray-700 dark:text-gray-400 mb-8">
            You can chose up to five abilities.
          </div>
          <Loading
            :reqs="['getAbilities']"
            component="Spinner"
          >
            <multiselect
              v-model="selectedAbilities"
              :options="abilities"
              :searchable="true"
              :close-on-select="false"
              :show-labels="true"
              :multiple="true"
              :hide-selected="true"
              track-by="name"
              label="name"
              :max="5"
              placeholder="Search for abilities"
              :class="'dark:border-transparent dark:rounded dark:border'"
              @select="getHabitat"
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
                  :v-if="selectedAbilities.length"
                  class="multiselect__clear"
                  @mousedown.prevent.stop="selectedAbilities = []"
                >
                  <Icon
                    icon="IconCross"
                    :class="'cursor-pointer fill-current text-blue-900 dark:text-white py-2 pl-1 h-full float-right'"
                  />
                </div>
              </template>
            </multiselect>
            <div
              v-for="ability in abilitiesDetailed"
              :key="ability.id"
              class="mt-4 flex items-center flex-row"
            >
              <div class="mb-2">
                <div class="font-bold text-xl mb-1 dark:text-white">
                  {{ ability.name }}
                </div>
                <div class="dark:text-gray-500">
                  {{ ability.effect }}
                </div>
              </div>
            </div>
          </Loading>
        </div>
        <div
          v-else-if="currentStep===4"
          key="pictureStep"
        >
          <div class="text-4xl font-extrabold text-blue-900 dark:text-white mb-8">
            What does your pokemon look like?
          </div>
          <Loading
            :reqs="['getTypes']"
            component="Spinner"
          >
            <ValidationObserver
              ref="imageForm"
              v-slot="{ handleSubmit }"
            >
              <form
                @submit.prevent="handleSubmit(onSubmit)"
              >
                <keep-alive>
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <dropzone
                      v-model="image"
                      label="File"
                      :errors="errors"
                      :name="'image'"
                    />
                  </ValidationProvider>
                </keep-alive>
              </form>
            </ValidationObserver>
          </Loading>
        </div>
        <div
          v-else-if="currentStep===5"
          key="recapStep"
        >
          <div class="text-4xl font-extrabold text-blue-900 dark:text-white mb-8">
            Here is what your new Pokemon will look like!
          </div>
          <div class="flex justify-center ">
            <card
              :card="card"
            />
          </div>
        </div>
      </transition>
    </div>
    <transition name="slide-fade">
      <div
        v-if="currentStep > 0"
        ref="bottomNav"
        class="steps-nav bg-white dark:bg-gray-800 fixed bottom-0 left-0 w-full p-10 flex items-center justify-between"
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
          class="flex items-center bg-transparent dark-hover:bg-white hover:bg-blue-900 text-blue-900 dark:text-white font-semibold hover:text-white dark-hover:text-blue-900 py-2 px-4 border dark:border-white border-blue-900 hover:border-transparent rounded"
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
          :class="['flex items-center bg-transparent dark-hover:bg-white hover:bg-blue-900 text-blue-900 dark:text-white font-semibold hover:text-white dark-hover:text-blue-900 py-2 px-4 border dark:border-white border-blue-900 hover:border-transparent rounded', !isStepValid && 'opacity-50 cursor-not-allowed']"
          @click.prevent="onSubmit"
        >
          <template v-if="currentStep === steps.length">
            Create
          </template>
          <template v-else>
            Continue
          </template>
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
import { Type, Habitat, Ability } from 'models';
import { Dropzone } from 'components/Inputs';
import CardView from 'modules/Cards/CardView';

export default {
  name: 'CreateCard',
  components: {
    Dropzone,
    Card: CardView,
  },
  data() {
    return {
      formErrors: [],
      image: null,
      name: null,
      selectedAbilities: [],
      selectedTypes: [],
      selectedHabitat: null,
      currentStep: 0,
      steps: [
        { validator: () => true },
        {
          validator: () => this.selectedTypes.length,
          action: () => { this.$store.dispatch('getTypes'); },
        },
        {
          validator: () => this.selectedHabitat,
          action: () => { this.$store.dispatch('getHabitats'); },
        },
        {
          validator: () => this.selectedAbilities.length,
          action: () => {
            if (this.abilities.length === 0) {
              this.$store.dispatch('getAbilities');
            }
          },
        },
        { validator: () => this.image },
      ],
      stepValid: false,
    };
  },
  computed: {
    abilitiesDetailed() {
      return Ability.findIn(this.selectedAbilities.map((hability) => hability.url));
    },
    abilities() {
      return Ability.all();
    },
    types() {
      return Type.all();
    },
    habitats() {
      return Habitat.all();
    },
    progress() {
      return Math.round((100 / this.steps.length) * this.currentStep);
    },
    isStepValid() {
      if (this.steps[this.currentStep] && !this.steps[this.currentStep].validator()) return false;
      return true;
    },
    card() {
      return ({
        name: this.name,
        types: this.selectedTypes,
        abilities: this.abilitiesDetailed,
        image: this.image.path,
      });
    },
  },
  watch: {
    currentStep(newValue) {
      if (this.steps[newValue] && this.steps[newValue].action) {
        this.steps[newValue].action();
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
    selectType(type) {
      if (this.selectedTypes.find((stype) => stype.name === type.name)) {
        this.selectedTypes = this.selectedTypes.filter((stype) => stype.name !== type.name);
      } else {
        if (this.selectedTypes.length === 2) {
          this.selectedTypes.pop();
        }
        this.selectedTypes.push(type);
      }
    },
    getHabitat(selectedOption) {
      this.$store.dispatch('getAbility', selectedOption);
    },
    onSubmit() {
      if (this.currentStep === this.steps.length) {
        this.$store.dispatch('createCard', this.card);
      } else if (this.$refs.imageForm) {
        this.$refs.imageForm.validate().then((success) => {
          if (!success) {
            return;
          }
          this.currentStep += 1;
        });
      } else this.currentStep += 1;
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
