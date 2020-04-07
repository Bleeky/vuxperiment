<template>
  <div
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
    card: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  height: 300px;
  width: 200px;
  @apply flex flex-col justify-center items-center;
  &:hover {
    @apply bg-gray-100;
  }
  &-name {
    @apply text-black font-extrabold text-xl;
  }

  &-type {
    border-radius: 50px;
    cursor: pointer;
    @apply text-xs uppercase mx-1 my-2 py-1 px-2;
  }

  &-id {
    margin-bottom: .5rem;
    @apply text-gray-800 text-xs;
  }

  img {
    max-height: 96px;
    max-width: 96px;
  }
}
.mode-dark {
  .card:hover {
    @apply bg-gray-800;
  }
  .card-name {
    @apply text-white;
  }
  .card-id {
    @apply text-gray-400;
  }
}
</style>
