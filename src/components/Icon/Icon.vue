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
      return () => import(`./${this.icon}`);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
