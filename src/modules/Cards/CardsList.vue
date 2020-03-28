<template>
  <div class="cards-list">
    <transition
      appear
      name="fade"
      leave-active-class="fade-leave"
    >
      <div class="flex flex-wrap justify-center">
        <div
          v-for="card in cards"
          class="m-2 card py-2 px-4 border rounded hover:bg-gray-100"
        >
          <div
            id="pokeName"
            class="card__title"
          >
            Charizard
          </div>
          <p
            id="pokeID"
            class="card__id"
          >
            #6
          </p>
          <div
            id="pokeTag"
            class="card__tag"
          >
            Fire
          </div>
          <div class="card__img">
            <img
              id="pokeImg"
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
              alt=""
            >
          </div>
        </div>
      </div>
    </transition>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'CardsList',
  data() {
    return {
      cards: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    };
  },
  beforeCreate() {
    this.$store.dispatch('setCreationMode', false);
    this.$store.dispatch('getCards');
  },
};
</script>

<style lang="scss" scoped>

</style>
