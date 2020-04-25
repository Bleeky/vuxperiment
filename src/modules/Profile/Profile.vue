<template>
  <transition
    appear
    name="fade"
    leave-active-class="fade-leave"
  >
    <div class="flex flex-col justify-center items-center">
      <button
        class="focus:outline-none bg-blue-900 hover:bg-gray-700 text-white font-semibold hover:text-white py-2 px-4 border border-blue-900 hover:border-gray-700 rounded"
        @click="deleteAccount"
      >
        Delete account
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Profile',
  methods: {
    deleteAccount() {
      this.$store.dispatch('deleteAccount');
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
