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
    <div
      v-if="card.image"
      class="card-img"
    >
      <template v-if="card.image.includes('PokeAPI')">
        <img :src="card.image">
      </template><template v-else>
        <S3Image
          :image-path="card.image"
        />
      </template>
    </div>
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
