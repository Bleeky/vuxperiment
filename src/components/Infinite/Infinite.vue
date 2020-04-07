<template>
  <div>
    <div class="flex flex-wrap justify-center">
      <div
        v-for="element in data"
        :key="element.id"
      >
        <slot :element="element" />
      </div>
    </div>
    <div
      ref="observer"
    />
    <Loading
      :reqs="['getCards']"
      component="Spinner"
    />
  </div>
</template>

<script>
export default {
  name: 'Infinite',
  props: {
    data: {
      type: Array,
      default: () => [],
      required: true,
    },
    selector: {
      type: String,
      default: '',
    },
    lim: {
      type: Number,
      default: 5,
    },
    getData: {
      type: Function,
      default: () => null,
    },
    clearData: {
      type: Function,
      default: () => null,
    },
  },
  data() {
    return {
      offset: false,
    };
  },
  computed: {
    next() { return this.$store.getters.next(this.selector); },
  },
  watch: {
    next(newValue) {
      this.isFetching = false;
      if (newValue) {
        this.observer.unobserve(this.$refs.observer);
        this.observer.observe(this.$refs.observer);
      } else {
        this.observer.unobserve(this.$refs.observer);
      }
    },
  },
  destroyed() {
    this.$store.dispatch('clearInfinite', { selector: this.selector });
    this.clearData();
  },
  mounted() {
    this.observer = new IntersectionObserver((entry) => {
      if (entry[0].isIntersecting && !this.isFetching) {
        this.isFetching = true;
        this.getData({ lim: this.lim, next: this.next, selector: this.selector });
      }
    });
    if (this.$refs.observer) {
      this.observer.observe(this.$refs.observer);
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
