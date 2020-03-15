<template>
  <div>
    <transition name="slide-fade">
      <div
        v-if="entry"
        key="loading"
      >
        <div v-if="component">
          <component :is="componentLoader" />
        </div>
        <div v-else>
          <Spinner />
        </div>
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
import Spinner from './Spinner';

export default {
  name: 'Loading',
  components: { Spinner },
  props: {
    type: {
      type: String,
    },
    req: {
      type: String,
      required: true,
    },
    component: {
      type: String,
      default: () => null,
    },
  },
  computed: {
    entry() { return this.$store.getters.entries(this.req); },
    componentLoader() {
      return () => import(`./${this.component}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  // transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>
