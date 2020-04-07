<template>
  <transition
    appear
    name="fade"
  >
    <img
      v-show="loaded"
      :src="url"
      @load="onLoaded"
    >
  </transition>
</template>

<script>
import { Storage } from 'aws-amplify';

export default {
  name: 'S3Image',
  props: {
    s3: {
      type: Boolean,
      default: true,
    },
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
      loaded: false,
      url: null,
      error: '',
    };
  },
  mounted() {
    if (this.s3) this.getImage();
    else this.url = this.imagePath;
  },
  methods: {
    onLoaded() {
      this.loaded = true;
    },
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
