<template>
  <div class="pokeball">
    <div
      class="pokeball-divider"
    />
    <div
      class="pokeball-circle"
    />
  </div>
</template>

<script>
export default {
  name: 'Pokeball',
};
</script>

<style lang="scss" scoped>

$color-body-background: #747D8C;
$color-white: #F6F7F8;
$color-red: #EF4144;
$color-grey-dark: #302D2D;

@-webkit-keyframes color_change {
  from { background-color: $color-white; }
  to { background-color: yellow; }
}

.pokeball {
  background: linear-gradient($color-red 50%, $color-white 50%);
  border-radius: 30px;
  box-shadow: 10px 10px 25px -9px rgba(0,0,0,0.46);
  display: flex;
  height: 20rem;
  position: relative;
  // transition: width 0.3s 0.1s ease, height 0.3s 0.3s ease;

  &-divider {
    align-self: center;
    background-color: $color-grey-dark;
    height: 2.8rem;
    // transition: width 0.3s 0.1s ease, height 0.3s 0.3s ease;
    width: 100%;
  }

  &-circle {
    animation: color_change 1s infinite alternate;
    background-color: $color-white;
    border: 1.2rem solid $color-grey-dark;
    border-radius: 2000rem;
    height: 6rem;
    left: calc(50% - 3rem);
    position: absolute;
    top: calc(50% - 3rem);
    // transition: all 0.3s ease;
    width: 6rem;
  }
}
</style>
