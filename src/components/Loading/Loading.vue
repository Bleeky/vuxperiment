<template>
  <div>
    <transition name="slide-fade">
      <div
        v-if="entry"
        key="loading"
      >
        <component :is="componentLoader" />
      </div>
      <div
        v-else
        key="not-loading"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    reqs: {
      type: Array,
      required: true,
    },
    component: {
      type: String,
      default: 'Spinner',
    },
  },
  computed: {
    entry() { return this.$store.getters.entries(this.reqs); },
    componentLoader() {
      return () => import(`./${this.component}`);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
