<template>
  <p class="demo">
    <button
      class="btn-primary"
      @click.prevent="handleClick"
    >
      <slot />(clicked - {{ count }})
    </button>
  </p>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    handleClick() {
      this.count++;
      console.log('clicked', this.count);
    },
  },
};
</script>
