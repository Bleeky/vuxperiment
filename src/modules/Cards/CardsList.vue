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
            :card="props.element"
          />
        </transition>
      </template>
    </Infinite>
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
  computed: {
    cards() {
      return Card.all();
    },
  },
  beforeCreate() {
    this.$store.dispatch('setCreationMode', false);
  },
  methods: {
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
</style>
