<template>
  <div class="my-5">
    <!-- Header -->
    <div>
      <p><b>Preview</b></p>
      <div class="preview-section mt-5">
        <div class="flex template-pos">
          <img src="https://scoolio-files.s3.ap-south-1.amazonaws.com/platform_certificate_images/certificate3.jpg"
            width="628" height="440" alt="">
        </div>
      </div>
      <!-- Next Button -->
      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="mt-8 flex flex-wrap items-center justify-end">
            <vs-button class="mr-auto mt-2 dark" type="flat" @click="changeTab">Back</vs-button>
            <div class="flex ml-auto mt-2">
              <save-modal />
              <vs-button @click="changeModal('generate')">Generate & Save</vs-button>
              <generate-modal :activePrompt="modal === 'generate'" @preview="changeModal('preview')"
                @cancel="changeModal(null)" />
              <preview-modal :activePrompt="modal === 'preview'" @send="changeModal('send')"
                @cancel="changeModal(null)" />
              <send-modal :activePrompt="modal === 'send'" @cancel="changeModal(null)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SaveModal from './Modal/SaveModal.vue'
import GenerateModal from './Modal/GenerateModal.vue'
import PreviewModal from './Modal/PreviewModal.vue'
import SendModal from './Modal/SendModal.vue'

export default {
  components: { SaveModal, GenerateModal, PreviewModal, SendModal },
  data() {
    return {
      modal: null
    }
  },
  methods: {
    changeModal(name) {
      this.modal = name
    },
    changeTab() {
      this.$emit('changeTab', 1)
    }
  }
}
</script>

<style>
.preview-section {
  width: 100%;
  height: 550px;
  background-color: #F6F6F6;
}

.drop {
  width: 400px;
  height: 100px;
  background-color: white;
}

.template-pos {
  height: 100%;
  align-items: center;
  justify-content: center;
}
</style>
