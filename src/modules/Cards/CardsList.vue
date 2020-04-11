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
      <template v-slot:button>
        <span
          class="mr-3 cursor-pointer p-3 border rounded bg-gray-900 text-white border-white hover:bg-white hover:text-blue-900 hover:border-transparent"
          @click.once="deleteCard(details)"
        >
          <Icon
            icon="IconTrash"
            :class="'stroke-current h-6 w-6'"
          />
        </span>
      </template>
      <template v-slot:content>
        <div
          v-if="details"
          @click.stop
        >
          <card
            class="text-white p-4"
            :card="details"
            detailed
          />
        </div>
      </template>
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
      return Card.query().with('abilities').get();
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
    deleteCard(card) {
      this.details = null;
      this.$store.dispatch('modal', {
        type: 'confirm',
        action: () => {
          this.$store.dispatch('deleteCard', card);
        },
        cancel: () => {
          this.details = card;
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
