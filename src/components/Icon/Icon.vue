<template>
  <component :is="iconLoader">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
  watch: {
    icon: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue || !oldValue) {
          this.iconLoader = () => ({
            component: import(/* webpackChunkName: "[request]" */ `./${this.icon}`),
            delay: 200,
            timeout: 3000,
          });
          this.$forceUpdate();
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
