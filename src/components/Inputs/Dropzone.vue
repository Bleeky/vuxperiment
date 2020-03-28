<template>
  <div>
    <vue-dropzone
      id="pokemon-upload-image"
      ref="dropzone"
      :options="options"
      :use-custom-slot="true"
      :name="name"
      @vdropzone-upload-progress="uploadProgress"
      @vdropzone-success="uploadSuccess"
      @vdropzone-file-added="fileAdded"
      @vdropzone-max-files-exceeded="maxExceed"
    >
      <div class="dropzone-custom-content">
        <div class="relative w-16 h-auto mx-auto z-10 m-8">
          <Icon
            icon="IconPicture"
            :class="'picture-center'"
          >
            <div class="absolute w-12 h-auto mx-auto bottom-0 z-0 picture-left">
              <Icon icon="IconPicture" />
            </div>
            <div class="absolute w-12 h-auto mx-auto bottom-0 z-0 picture-right">
              <Icon icon="IconPicture" />
            </div>
          </Icon>
        </div>
        <div class="dark:text-gray-600">
          Drop your image here, or <span class="font-semibold text-blue-900 dark:text-gray-300">browse</span>
        </div>
      </div>
    </vue-dropzone>
    <div id="preview-container" />
    <p class="text-red-500 text-xs mt-2">
      {{ errors[0] }}
    </p>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';

export default {
  name: 'Dropzone',
  components: {
    vueDropzone: vue2Dropzone,
  },
  props: {
    errors: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      name: '',
      uploaded: [],
      options: {
        url: 'https://httpbin.org/post',
        maxFiles: 1,
        acceptedFiles: 'image/*',
        previewsContainer: '#preview-container',
        createImageThumbnails: false,
        previewTemplate: this.template(),
      },
    };
  },
  methods: {
    maxExceed(file) {
      this.$refs.dropzone.removeAllFiles(true);
      this.$refs.dropzone.addFile(file);
    },
    uploadSuccess(file, response) {
      const refPercent = file.previewElement.querySelectorAll('[dz-progress-counter]');
      const refDetails = file.previewElement.querySelectorAll('[dz-details]');
      const refIcon = file.previewElement.querySelectorAll('[dz-icon-status]');
      const refProgressBar = file.previewElement.querySelectorAll('[dz-progress-bar]');
      refDetails[0].classList.add('completed');
      refProgressBar[0].classList.add('finished');
      refPercent[0].style.display = 'none';
      refIcon[0].style.display = 'block';
      this.uploaded = response;
      this.$emit('input', this.uploaded);
    },
    fileAdded(file) {
      const refName = file.previewElement.querySelectorAll('[dz-name]');
      refName[0].innerHTML = file.name;
    },
    uploadProgress(file, progress) {
      if (file.previewElement) {
        const refProgressBg = file.previewElement.querySelectorAll('[dz-progress-bg]');
        const refProgressBar = file.previewElement.querySelectorAll('[dz-progress-bar]');
        const refCounter = file.previewElement.querySelectorAll('[dz-progress-counter]');
        refProgressBg[0].style.width = `${progress}%`;
        refProgressBar[0].style.width = `${progress}%`;
        refCounter[0].innerHTML = `${Math.round(progress)}%`;
        if (progress === 100) {
          refProgressBg[0].style.opacity = 0;
          refProgressBar[0].classList.add('completed');
        }
      }
    },
    template() {
      return `<div class="dz-preview dz-file-preview">
                <div class="dz-status" dz-status></div>
                <div class="dz-details" dz-details>
                  <div>
                    <div class="dz-name" dz-name></div>
                    <div class="dz-counter" dz-progress-counter></div>
                  </div>
                  <svg dz-icon-status class="checkmark" viewBox="0 0 52 52"><circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
                  <div class="dz-progress-bar" dz-progress-bar ></div>
                </div>
                <div class="dz-progress-bg" dz-progress-bg ></div>
              </div>
            `;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
