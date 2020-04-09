<template>
  <div
    :key="card.cardId"
    class="m-2 card py-2 px-4 border rounded hover:bg-gray-100"
  >
    <div
      class="card-name"
    >
      {{ card.name }}
    </div>
    <p
      class="card-id"
    >
      #6
    </p>
    <div class="flex">
      <div
        v-for="type in card.types"
        :key="type.name"
        :class="`card-type ${type.name}`"
      >
        <span class="inline align-middle">
          {{ type.name }}
        </span>
      </div>
    </div>
    <template v-if="card.image.includes('http')">
      <S3Image
        :s3="false"
        :image-path="card.image"
      />
    </template><template v-else>
      <S3Image
        :image-path="card.image"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'CardView',
  components: {
  },
  props: {
    class: {
      type: String,
      default: '',
    },
    card: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
