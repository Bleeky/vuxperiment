<template>
  <div>
    <vue-dropzone
      id="pokemon-upload-image"
      ref="dropzone"
      :options="options"
      :use-custom-slot="true"
      :name="name"
      @vdropzone-processing="vdropzoneProcessing"
      @vdropzone-sending="vdropzoneSending"
      @vdropzone-upload-progress="uploadProgress"
      @vdropzone-error="uploadError"
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
import { API } from 'aws-amplify';
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
        url: '/',
        maxFiles: 1,
        parallelUploads: 1,
        method: 'put',
        autoProcessQueue: false,
        acceptedFiles: 'image/*',
        previewsContainer: '#preview-container',
        createImageThumbnails: false,
        header: '',
        previewTemplate: this.template(),
        accept: (file, done) => {
          const refProgressBar = file.previewElement.querySelectorAll('[dz-progress-bar]');
          refProgressBar[0].style.width = '100%';
          refProgressBar[0].classList.add('completed');

          const filePath = `${Date.now()}-${file.name}`;
          API.post('cards', '/signedURL', {
            body: {
              filePath,
              contentType: file.type,
            },
          })
            .then((response) => {
              refProgressBar[0].classList.remove('completed');
              file.uploadURL = response.url;
              file.key = response.key;
              file.path = filePath;
              done();
              setTimeout(() => this.$refs.dropzone.processQueue(file));
            })
            .catch((e) => {
              refProgressBar[0].classList.remove('completed');
              done('Failed to get an S3 signed upload URL', e);
            });
        },
      },
    };
  },
  methods: {
    async vdropzoneSending(file, xhr, formData) {
      const overrideSend = xhr.send;
      xhr.send = () => {
        overrideSend.call(xhr, file);
      };
    },
    vdropzoneProcessing(file) {
      this.$refs.dropzone.setOption('url', file.uploadURL);
    },
    maxExceed(file) {
      this.$refs.dropzone.removeAllFiles(true);
      this.$refs.dropzone.addFile(file);
    },
    uploadError(file) {
      const refPercent = file.previewElement.querySelectorAll('[dz-progress-counter]');
      const refDetails = file.previewElement.querySelectorAll('[dz-details]');
      const refIcon = file.previewElement.querySelectorAll('[dz-icon-status-error]');
      const refProgressBar = file.previewElement.querySelectorAll('[dz-progress-bar]');
      refDetails[0].classList.add('completed');
      refProgressBar[0].classList.add('finished');
      refPercent[0].style.display = 'none';
      refIcon[0].style.display = 'block';
      console.error('upload error', file);
    },
    uploadSuccess(file, response) {
      const refPercent = file.previewElement.querySelectorAll('[dz-progress-counter]');
      const refDetails = file.previewElement.querySelectorAll('[dz-details]');
      const refIcon = file.previewElement.querySelectorAll('[dz-icon-status-success]');
      const refProgressBar = file.previewElement.querySelectorAll('[dz-progress-bar]');
      refDetails[0].classList.add('completed');
      refProgressBar[0].classList.add('finished');
      refPercent[0].style.display = 'none';
      refIcon[0].style.display = 'block';
      this.uploaded = response;
      this.$emit('input', file);
      console.error('upload success', file, response);
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
                  <svg dz-icon-status-success class="checkmark" viewBox="0 0 52 52"><circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
                  <svg dz-icon-status-error class="error" viewBox="0 0 52 52"><circle class="error-circle" cx="26" cy="26" r="25" fill="none"/><path class="error-cross" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
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
