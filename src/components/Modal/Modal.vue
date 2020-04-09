<template>
  <transition
    name="slide-fade"
    appear
  >
    <div
      v-if="visible"
      class="bg-gray-900-hue table h-full fixed left-0 top-0 w-full"
    >
      <div class="absolute top-0 right-0 p-6 flex">
        <span
          class="cursor-pointer p-3 border rounded dark:bg-gray-900 bg-white dark:text-white border-blue-900 dark:border-white hover:text-white dark-hover:bg-white dark-hover:text-blue-900 hover:border-transparent hover:bg-blue-900"
          @click.once="$emit('close')"
        >
          <Icon
            icon="IconCross"
            :class="'fill-current h-6 w-6'"
          />
        </span>
      </div>

      <transition
        name="slide-fade"
        appear
      >
        <div
          class="table-cell align-middle"
          @click="$emit('close')"
        >
          <slot />
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    visible(newValue) {
      if (newValue === true) window.addEventListener('keydown', this.leaveOnEscape);
      else window.removeEventListener('keydown', this.leaveOnEscape);
    },
  },
  beforeCreate() {
    this.leaveOnEscape = (event) => {
      if (event.keyCode === 27) {
        this.$emit('close');
      }
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
