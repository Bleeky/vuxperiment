<template>
  <component :is="iconLoader" />
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
  computed: {
    iconLoader() {
      return () => ({
        component: import(/* webpackChunkName: "[request]" */ `./${this.icon}`),
        delay: 200,
        timeout: 3000,
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
