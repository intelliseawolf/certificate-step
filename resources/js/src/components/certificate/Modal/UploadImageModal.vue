<template>
  <div class="upload-image-modal">
    <vs-prompt
      @close="close"
      @accept="acceptAlert"
      buttonAccept="false"
      buttonCancel="false"
      :active="activePrompt"
      title=""
    >
      <h3 class="text-center mb-4">Image Upload</h3>
      <div class="con-exemple-prompt">
        <certificate-file-upload
          class="editor-image-upload"
          :file_repository_id="4103"
          section_type="CertificateComponent"
          @image="setImagePath"
        />
        <div class="flex mt-3">
          <vs-button class="ml-auto mr-3" @click="toggleModal">Cancel</vs-button>
          <vs-button @click="handleOk">Ok</vs-button>
        </div>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
import CertificateFileUpload from '../editor/CertificateFileUpload.vue';

export default {
  name: "UploadImageModal",
  components: {
    CertificateFileUpload
  },
  data() {
    return {
      activePrompt: false,
      image: ""
    }
  },
  methods: {
    close() {
      this.$vs.notify({
        color: 'danger',
        title: 'Closed',
        text: 'You close a dialog!'
      })
      this.$emit('cancel')
    },
    acceptAlert() {
      this.$vs.notify({
        color: 'success',
        title: 'Accept Selected',
        text: 'Lorem ipsum dolor sit amet, consectetur'
      })
    },
    setImagePath(image) {
      this.image = image.file.file_path
    },
    toggleModal() {
      this.activePrompt = !this.activePrompt
    },
    handleOk() {
      this.activePrompt = false
      this.$emit("handleOk", this.image)
    }
  }
}
</script>
