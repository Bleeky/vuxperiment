<template>
  <div class="cards-list">
    <h2>Cards list</h2>
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
    this.$store.dispatch('getCards');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
