<template>
  <div
    :key="card.cardId"
    :class="['card ', !detailed && 'm-2 card-ratio py-2 px-4 border rounded hover:bg-gray-100']"
  >
    <div
      :class="[
        'text-black font-extrabold text-xl dark:text-white',
        detailed && 'text-white text-3xl font-bold'
      ]"
    >
      {{ card.name }}
    </div>
    <p
      :class="[
        'text-xs mb-2',
        detailed && 'text-gray-400',
        !detailed && 'text-gray-800 dark:text-gray-400'
      ]"
    >
      #6
    </p>
    <div class="flex">
      <div
        v-for="type in card.types"
        :key="type.name"
        :class="`text-xs uppercase mx-1 my-2 py-1 px-2 rounded-full cursor-pointer ${type.name}`"
      >
        <span class="inline align-middle">
          {{ type.name }}
        </span>
      </div>
    </div>
    <template v-if="card.image.includes('http')">
      <S3Image
        :s3="false"
        :image-path="card.image"
      />
    </template><template v-else>
      <S3Image
        :image-path="card.image"
      />
    </template>
    <div
      v-if="detailed"
      class="flex flex-row items-end relative flex-wrap justify-center"
    >
      <div
        v-for="ability in card.abilities"
        :key="ability.name"
        :ref="ability.name"
        :class="[
          'card-ability text-center h-20 flex items-end justify-center relative py-4 px-6 text-lg font-thin cursor-pointer hover:text-gray-600',
          selectedAbility && selectedAbility.name === ability.name ? 'text-2xl font-extrabold' : ''
        ]"
        @click="selectAbility(ability)"
      >
        {{ ability.name }}
      </div>
      <div
        ref="selectedAbilityUnder"
        :class="[
          'card-ability-selected absolute left-0 bottom-0 border-b w-10',
          selectedAbility ? 'visible' : 'hidden'
        ]"
      />
    </div>
    <div
      v-if="detailed"
      class="mt-8 italic h-40"
    >
      <template v-if="selectedAbilityDetailed">
        <Loading
          :reqs="['getAbility']"
        >
          {{ selectedAbilityDetailed.effect }}
        </Loading>
      </template>
    </div>
  </div>
</template>

<script>
import { Ability } from 'models';

export default {
  name: 'CardView',
  props: {
    detailed: {
      type: Boolean,
      default: false,
    },
    card: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedAbility: null,
    };
  },
  computed: {
    selectedAbilityDetailed() {
      if (this.selectedAbility) return Ability.find(this.selectedAbility.url);
      return null;
    },
  },
  beforeDestroy() {
    if (this.detailed) {
      window.removeEventListener('resize', this.watchResize);
    }
  },
  created() {
    if (this.detailed) {
      this.watchResize = () => {
        if (this.selectedAbility) {
          this.setAbilitySelectorPosition();
        }
      };
      window.addEventListener('resize', this.watchResize);
    }
  },
  methods: {
    setAbilitySelectorPosition() {
      const abilityRef = this.$refs[this.selectedAbility.name][0];
      const underlineRef = this.$refs.selectedAbilityUnder;
      if (abilityRef && underlineRef) {
        underlineRef.style.bottom = `${abilityRef.offsetParent.clientHeight - abilityRef.offsetTop - abilityRef.clientHeight}px`;
        underlineRef.style.left = `${abilityRef.offsetLeft + abilityRef.clientWidth / 4}px`;
        underlineRef.style.width = `${abilityRef.clientWidth / 2}px`;
      }
    },
    selectAbility(ability) {
      this.selectedAbility = ability;
      this.setAbilitySelectorPosition();
      if (!Ability.find(ability.url).effect) this.$store.dispatch('getAbility', ability);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
