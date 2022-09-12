<template>
  <div class="my-5">
    <!-- Header -->
    <div>
      <p><b>Preview</b></p>
      <div class="third-preview-section mt-5">
        <div class="flex template-pos">
          <img
            :src="!!templateList.length && templateList[template].certificate_image_details.file.file_path"
            width="500"
            height="300"
            alt=""
          >
        </div>
      </div>
      <!-- Next Button -->
      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="mt-8 flex flex-wrap items-center justify-end">
            <vs-button class="mr-auto mt-2 dark" type="flat" @click="changeTab">Back</vs-button>
            <div class="flex ml-auto mt-2">
              <save-modal @saveCertificate="saveCertificate" />
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

import axios from '../../axios'

export default {
  components: {
    SaveModal,
    GenerateModal,
    PreviewModal,
    SendModal
  },
  props: {
    template: {
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      modal: null
    }
  },
  computed: {
    templateList: function () {
      return this.$store.getters['getTemplateList']
    },
  },
  methods: {
    changeModal(name) {
      this.modal = name
    },
    changeTab() {
      this.$emit('changeTab', 1)
    },
    saveCertificate({title, description}) {
      axios.post('/certificate/template/create/184', {
        title,
        description,
        content: this.content,
        certificate_image_id: this.templateList[this.template].certificate_image_details.certificate_image_id,
        type: 0
      })
    }
  }
}
</script>

<style>
.third-preview-section {
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
