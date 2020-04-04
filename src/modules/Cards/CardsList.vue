<template>
  <div class="cards-list">
    <Loading
      :reqs="['getCards']"
      component="Spinner"
    >
      <transition-group
        appear
        name="fade"
        class="flex flex-wrap justify-center"
      >
        <card
          v-for="card in cards"
          :key="card.cardId"
          :card="card"
        />
      </transition-group>
    </Loading>
    <router-view />
  </div>
</template>

<script>
import CardView from 'modules/Cards/CardView';
import { Card } from 'models';

export default {
  name: 'CardList',
  components: {
    Card: CardView,
  },
  computed: {
    cards() {
      return Card.all();
    },
  },
  beforeCreate() {
    this.$store.dispatch('setCreationMode', false);
    this.$store.dispatch('getCards');
  },
};
</script>

<style lang="scss" scoped>
</style>
