<template>
  <div class="my-5">
    <!-- Header -->
    <div v-if="!isUploadCSV">
      <p><b>Preview</b></p>
      <div class="third-preview-section mt-5">
        <div class="flex template-pos">
          <TemplateSection :style="{
            width: `${width}px`,
            height: `${height}px`
          }" :width="width" :height="height" :image="image" :content="content" />
        </div>
      </div>
      <!-- Next Button -->
      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="mt-8 flex flex-wrap items-center justify-end">
            <vs-button class="mr-auto mt-2 dark" type="flat" @click="prevTab">Back</vs-button>
            <div class="flex ml-auto mt-2">
              <vs-button class="mr-2 primary" type="flat" @click="changeModal('save')">Save</vs-button>
              <save-modal ref="saveModal" :activePrompt="modal === 'save'" @saveCertificate="saveCertificate"
                @generate="changeModal('generate')" @cancel="changeModal(null)" />
              <vs-button @click="changeModal('generate')">Generate & Save</vs-button>
              <generate-modal :activePrompt="modal === 'generate'" @preview="changeModal('preview')"
                @cancel="changeModal(null)" :content="content" @selectStudent="receiveStudent" @setStaffMapping="setStaffMapping" />
              <preview-modal :activePrompt="modal === 'preview'" @download="changeModal('download')"
                @send="changeModal('send')" @cancel="changeModal(null)" :selectedStudent="selectedStudent"
                :template="template" :image="image" :content="content" :width="width" :height="height" />
              <download-modal :activePrompt="modal === 'download'" @preview="changeModal('preview')"
                @cancel="changeModal(null)" :selectedStudent="selectedStudent" :image="image" :content="content" :width="width" :height="height" />
              <send-modal :activePrompt="modal === 'send'" @cancel="changeModal(null)" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <UploadCSV v-else />
  </div>
</template>

<script>
import SaveModal from './Modal/SaveModal.vue'
import GenerateModal from './Modal/GenerateModal.vue'
import PreviewModal from './Modal/PreviewModal.vue'
import SendModal from './Modal/SendModal.vue'
import TemplateSection from "./editor/TemplateSection.vue"
import DownloadModal from "./Modal/DownloadModal.vue"
import UploadCSV from "./editor/UploadCSV.vue"

import axios from '../../axios'

export default {
  components: {
    SaveModal,
    GenerateModal,
    PreviewModal,
    SendModal,
    TemplateSection,
    DownloadModal,
    UploadCSV
  },
  props: {
    template: {
      required: true
    },
    image: {
      type: Object,
      required: true
    },
    content: {
      type: Array,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      modal: null,
      selectedStudent: [],
      isUploadCSV: false
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
    prevTab() {
      this.$emit('prevTab')
    },
    saveCertificate({ title, description }) {
      axios.post('/certificate/template/create/184', {
        title,
        description,
        content: JSON.stringify(this.content),
        certificate_image_id: this.image.certificate_image_id,
        type: 0
      })
        .then(() => {
          this.$refs.saveModal.closeModal()
          window.location.reload()
        })
    },
    receiveStudent(student) {
      this.selectedStudent = student
    },
    setStaffMapping(mappingData) {
      const updatedMappingData = []

      mappingData.map((item) => {
        const index = updatedMappingData.findIndex((mappingItem) => mappingItem.id == item.id && mappingItem.content == item.content)
        if (index === -1) {
          updatedMappingData.push({
            id: item.id,
            content: item.content,
            name: [item.name],
          })
        } else {
          updatedMappingData[index]['name'].push(item.name)
        }
      })
      updatedMappingData.map((item) => {
        this.$emit("mapDynamicContent", {
          id: item.id,
          content: item.content,
          name: item.name.toString()
        })
      })
    }
  }
}
</script>

<style>
.third-preview-section {
  width: 100%;
  background-color: #F6F6F6;
}

.template-pos {
  height: 100%;
  align-items: center;
  justify-content: center;
}
</style>
