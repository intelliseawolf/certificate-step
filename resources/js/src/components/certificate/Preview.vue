<template>
  <div class="my-5">
    <div v-if="!isUploadCSV">
      <p><b>Preview</b></p>
      <div class="third-preview-section mt-5">
        <div class="flex template-pos">
          <TemplateSection
            :style="{
              width: `${width}px`,
              height: `${height}px`,
            }"
            :width="width"
            :height="height"
            :image="image"
            :content="content"
          />
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="mt-8 flex flex-wrap items-center justify-end">
            <vs-button class="mr-auto mt-2 dark" type="flat" @click="prevTab"
              >Back</vs-button
            >
            <div class="flex ml-auto mt-2">
              <vs-button
                class="mr-2 primary"
                type="flat"
                @click="changeModal('save')"
                >Save</vs-button
              >
              <save-modal
                ref="saveModal"
                :activePrompt="modal === 'save'"
                @saveCertificate="saveTemplate"
                @generate="changeModal('generate')"
                @cancel="changeModal(null)"
              />
              <vs-button @click="changeModal('generate')"
                >Generate & Save</vs-button
              >
              <generate-modal
                :activePrompt="modal === 'generate'"
                :content="content"
                @preview="changeModal('preview')"
                @cancel="changeModal(null)"
                @selectStudent="receiveStudent"
                @setStaffMapping="setStaffMapping"
                @saveTemplate="saveTemplate"
                @toggleCsvUploading="toggleCsvUploading"
                @addMappingData="addMappingData"
              />
              <preview-modal
                :activePrompt="modal === 'preview'"
                :selectedStudent="selectedStudent"
                :template="template"
                :image="image"
                :content="content"
                :mappingData="mappingData"
                :width="width"
                :height="height"
                @download="changeModal('download')"
                @send="changeModal('send')"
                @cancel="changeModal(null)"
              />
              <download-modal
                :activePrompt="modal === 'download'"
                @preview="changeModal('preview')"
                @cancel="changeModal(null)"
                :selectedStudent="selectedStudent"
                :image="image"
                :content="content"
                :width="width"
                :height="height"
              />
              <send-modal
                :activePrompt="modal === 'send'"
                @cancel="changeModal(null)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <UploadCSV
      v-else
      :content="content"
      @toggleCsvUploading="toggleCsvUploading"
      @addCsvMapping="addMappingData"
    />
  </div>
</template>

<script>
import SaveModal from "./Modal/SaveModal.vue";
import GenerateModal from "./Modal/GenerateModal.vue";
import PreviewModal from "./Modal/PreviewModal.vue";
import SendModal from "./Modal/SendModal.vue";
import TemplateSection from "./editor/TemplateSection.vue";
import DownloadModal from "./Modal/DownloadModal.vue";
import UploadCSV from "./editor/UploadCSV.vue";

import axios from "../../axios";

export default {
  components: {
    SaveModal,
    GenerateModal,
    PreviewModal,
    SendModal,
    TemplateSection,
    DownloadModal,
    UploadCSV,
  },
  props: {
    template: {
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
    content: {
      type: Array,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      modal: null,
      selectedStudent: [],
      isUploadCSV: false,
      mappingData: [],
    };
  },
  computed: {
    templateList: function () {
      return this.$store.getters["getTemplateList"];
    },
  },
  methods: {
    toggleCsvUploading() {
      this.isUploadCSV = !this.isUploadCSV;
    },
    changeModal(name) {
      this.modal = name;
    },
    prevTab() {
      this.$emit("prevTab");
    },
    saveTemplate({ title, description }) {
      if (!title) {
        return this.$vs.notify({
          title: "Error",
          text: "Please enter a Certificate Name before saving",
          color: "danger",
          time: 2000,
        });
      }
      axios
        .post("/certificate/template/create/184", {
          title,
          description,
          content: JSON.stringify(this.content),
          certificate_image_id: this.image.certificate_image_id,
          type: 0,
        })
        .then(() => {
          this.$refs.saveModal.closeModal();
          window.location.reload();
        });
    },
    receiveStudent(student) {
      this.selectedStudent = student;
    },
    setStaffMapping(mappingData) {
      const updatedMappingData = [];

      mappingData.map((item) => {
        const index = updatedMappingData.findIndex(
          (mappingItem) =>
            mappingItem.id == item.id && mappingItem.content == item.content
        );
        if (index === -1) {
          updatedMappingData.push({
            id: item.id,
            content: item.content,
            name: [item.name],
          });
        } else {
          updatedMappingData[index]["name"].push(item.name);
        }
      });
      updatedMappingData.map((item) => {
        this.mappingData.push({
          id: item.id,
          content: item.content,
          name: item.name.toString(),
        });
      });
    },
    addMappingData(mappingData) {
      mappingData.map((data) => {
        const index = this.mappingData.findIndex(
          (item) => item.id == data.id && item.content == data.content
        );

        if (index != -1) this.mappingData.splice(index, 1, data);
        else this.mappingData = [...this.mappingData, data];
      });
    },
  },
};
</script>

<style>
.third-preview-section {
  width: 100%;
  background-color: #f6f6f6;
}

.template-pos {
  height: 100%;
  align-items: center;
  justify-content: center;
}
</style>
