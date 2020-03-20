<template>
  <div class="cards-list">
    <h2>Cards list</h2>
    <div class="flex">
      <div class="card">
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
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'CardsList',
  beforeCreate() {
    console.error(
      'getCards',
    );
    this.$store.dispatch('setCreationMode', false);
    this.$store.dispatch('getCards');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

$primaryColor: #43A047;

.card {
  align-items: center;
  background-color: whitesmoke;
  border-radius: 20px;
  box-shadow: 12px 12px 24px rgba(grey, .2), -12px -12px 12px rgba(white, 1);

  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5rem 1.5rem 0rem 1.5rem;

  &:hover {
    animation: wiggle .3s;
  }

  &__title {
    color: $primaryColor;
    font-size: 1.2rem;
    font-weight: 800;
  }

  &__tag {
    background-color: $primaryColor;
    border-radius: 50px;
    color: white;
    cursor: pointer;
    font-size: .6rem;
    margin: .5rem 1rem;
    padding: .2rem .5rem;
    text-transform: uppercase;
  }

  &__id {
    color: #666;
    font-size: .6rem;
    margin-bottom: .5rem;
  }

}
</style>
