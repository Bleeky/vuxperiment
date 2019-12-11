<template>
  <p class="demo">
    <button
      class="btn-primary"
      @click.prevent="handleClick"
    >
      <slot />(clicked - {{ count }})
    </button>
    <card-form />
  </p>
</template>

<script>
import CardForm from './CardForm';

export default {
  components: {
    CardForm,
  },
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    handleClick() {
      this.count++;
      // console.log('clicked', this.count);
    },
  },
};
</script>
