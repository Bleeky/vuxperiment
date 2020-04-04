<template>
  <div>
    <img
      :src="url"
    >
  </div>
</template>

<script>
import { Storage } from 'aws-amplify';

export default {
  name: 'S3Image',
  props: {
    imagePath: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: 'private',
    },
  },
  data() {
    return {
      url: null,
      error: '',
    };
  },
  mounted() {
    this.getImage();
  },
  methods: {
    getImage() {
      if (!this.imagePath) {
        this.setError('Image path not provided.');
      } else {
        Storage
          .get(this.imagePath, { level: this.location })
          .then((url) => {
            this.url = url;
          })
          .catch((e) => this.setError(e));
      }
    },
    setError(e) {
    },
  },
};
</script>
