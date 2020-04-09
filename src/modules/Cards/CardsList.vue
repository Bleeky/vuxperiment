<template>
  <div class="cards-list">
    <Infinite
      selector="cards"
      :lim="10"
      :data="cards"
      :get-data="getData"
      :clear-data="clearData"
    >
      <template
        v-slot:default="props"
      >
        <transition
          appear
          name="fade"
        >
          <card
            :key="props.element.cardId"
            class="cursor-pointer"
            :card="props.element"
            @click.native="getDetails(props.element)"
          />
        </transition>
      </template>
    </Infinite>
    <Modal
      :visible="details!==null"
      @close="details = null"
    >
      <div
        v-if="details"
        class="modal-content m-2 py-2 px-4 rounded mx-auto flex flex-col items-center text-white"
        @click.stop
      >
        <div class="text-3xl font-bold">
          {{ details.name }}
        </div>
        <p
          class="card-id"
        >
          #6
        </p>
        <div class="flex">
          <div
            v-for="type in details.types"
            :key="type.name"
            :class="`card-type ${type.name}`"
          >
            <span class="inline align-middle">
              {{ type.name }}
            </span>
          </div>
        </div>
        <template v-if="details.image.includes('http')">
          <S3Image
            :s3="false"
            :image-path="details.image"
          />
        </template>
        <template v-else>
          <S3Image
            :image-path="details.image"
          />
        </template>
        <div
          v-for="ability in details.abilities"
          :key="ability.name"
        >
          {{ ability.name }}
        </div>
      </div>
    </Modal>
    <router-view />
  </div>
</template>

<script>
import CardView from 'modules/Cards/CardView';
import { Card } from 'models';
import Infinite from 'components/Infinite';

export default {
  name: 'CardList',
  components: {
    Infinite,
    Card: CardView,
  },
  data() {
    return {
      details: null,
    };
  },
  computed: {
    cards() {
      return Card.all();
    },
  },
  beforeCreate() {
    this.$store.dispatch('setCreationMode', false);
  },
  methods: {
    getDetails(card) {
      this.details = card;
    },
    clearData() {
      Card.deleteAll();
    },
    getData(params) {
      this.$store.dispatch('getCards', params);
    },
  },
};
</script>

<style lang="scss" scoped>
.dark-mode {

}

</style>
