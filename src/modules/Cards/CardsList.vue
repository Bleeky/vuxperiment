<template>
  <div class="cards-list">
    <h2>Cards list</h2>
    <ul>
      <li>
        One element
        <router-link to="/cards-list">
          All cards
        </router-link>
        <router-link to="/cards-list/2">
          Go to this card
        </router-link>
      </li>
      <li>Two element</li>
    </ul>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'CardsList',
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
