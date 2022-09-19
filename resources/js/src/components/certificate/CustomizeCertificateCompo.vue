<template>
  <div class="my-5">
    <div>
      <p><b>Choose a template or upload your own certificate to start</b></p>
      <div class="flex mt-5">
        <div class="mr-10">
          <p>Orientation</p>
          <div class="flex">
            <div class="mr-2">
              <vs-radio v-model="orientation" vs-value="landscape"
                >Landscape</vs-radio
              >
            </div>
            <div class="m">
              <vs-radio v-model="orientation" vs-value="portrait"
                >Portrait</vs-radio
              >
            </div>
          </div>
        </div>
        <div>
          <p>Size</p>
          <div class="flex">
            <div class="mr-2">
              <vs-radio
                v-model="size"
                vs-value="size-a4"
                @change="changeSize(877, 620)"
                >A4</vs-radio
              >
            </div>
            <div class="m">
              <vs-radio
                v-model="size"
                vs-value="size-legal"
                @change="changeSize(1071, 650)"
                >Legal</vs-radio
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="my-5">
      <p class="mb-10"><b>Preview</b></p>
      <div class="preview-section my-5">
        <div class="flex template-pos">
          <img
            v-if="previewImage"
            :src="previewImage"
            class="uploading-image"
            :style="{
              width: `${width}px`,
              height: `${height}px`,
            }"
          />
          <TemplateSection
            v-if="!previewImage && templateList.length"
            type="topImage"
            :style="{
              width: `${width}px`,
              height: `${height}px`,
            }"
            :width="width"
            :height="height"
            :image="templateList[selectedTemplate].certificate_image_details"
            :content="JSON.parse(templateList[selectedTemplate].content)"
          />
        </div>
      </div>
    </div>

    <div class="my-5">
      <p><b>Templates</b></p>
      <div class="flex flex-wrap">
        <div class="templates-section mx-2">
          <certificate-file-upload
            class="file-upload"
            :file_repository_id="4103"
            section_type="CertificateComponent"
            @image="setImage"
          />
          <div
            :class="`template-box mr-2 mt-5 ${
              selectedTemplate === index ? 'template-box-active' : ''
            }`"
            v-for="(template, index) in templateList"
            :key="index"
            @click="selectTemplate(index)"
          >
            <TemplateSection
              :type="index"
              :style="{
                width: `200px`,
                height: `143px`,
              }"
              :width="width"
              :height="height"
              :image="templateList[index].certificate_image_details"
              :content="JSON.parse(template.content)"
            />
          </div>
        </div>
        <div
          class="mt-3 mx-auto"
          v-if="templateListMetaData && templateListMetaData.total"
        >
          <vs-pagination
            circle
            v-model="currentPage"
            not-margin
            :dotted-number="10"
            color="success"
            :total="totalPages"
          />
        </div>
      </div>
    </div>
    <!-- Footer -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button class="ml-auto mt-2" @click="nextTab">Next</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TemplateSection from "./editor/TemplateSection.vue";
import CertificateFileUpload from "./editor/CertificateFileUpload.vue";

export default {
  components: {
    TemplateSection,
    CertificateFileUpload,
  },
  props: {
    selectedTemplate: {
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
  // mixins: [fileUpload],
  computed: {
    templateList: function () {
      return this.$store.getters["getTemplateList"];
    },
    templateListMetaData: function () {
      return this.$store.getters["getTemplateListMetaData"];
    },
    totalPages: function () {
      return Math.ceil(this.templateListMetaData.total / 20);
    },
  },
  mounted() {
    this.$store
      .dispatch("getTemplates", {
        page: 1,
      })
      .then(() => {
        this.$emit("changeTemplate", 0);
      });
  },
  methods: {
    setImage(image) {
      this.previewImage = image.file.file_path;
      this.$emit("changeImage", image);
    },
    selectTemplate(index) {
      this.$emit("changeTemplate", index);
      this.previewImage = "";
    },
    nextTab() {
      if (!this.previewImage) {
        this.$emit(
          "setInitialContent",
          JSON.parse(this.templateList[this.selectedTemplate].content)
        );
        this.$emit(
          "changeImage",
          this.templateList[this.selectedTemplate].certificate_image_details
        );
      }
      this.$emit("nextTab");
    },
    changeSize(w, h) {
      if (this.orientation == "landscape") {
        this.$emit("changeImageSize", {
          width: w,
          height: h,
        });
      } else {
        this.$emit("changeImageSize", {
          width: h,
          height: w,
        });
      }
    },
  },
  data() {
    return {
      orientation: "landscape",
      size: "size-a4",
      currentPage: 1,
      template: [],
      content: "",
      previewImage: null,
    };
  },
  watch: {
    orientation() {
      this.$emit("changeImageSize", {
        width: this.height,
        height: this.width,
      });
    },
    currentPage(newVal) {
      this.$store.dispatch("getTemplates", {
        page: newVal,
      });
    },
  },
};
</script>

<style lang="scss">
.uploading-image {
  display: flex;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 1px;
  border: 1px solid gray;
  border-radius: 8px;
}

.template-box {
  position: relative;
  padding: 4px 8px;
  border: 1px solid gray;
  border-radius: 8px;
}

.template-box-active {
  border: 1px solid blue;
}

.template-img {
  border-radius: 8px;
}

.preview-section {
  position: relative;
  width: 100%;
  height: 100%;
}

.templates-section {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.template-pos {
  height: 100%;
  align-items: center;
  justify-content: center;
  background: white;
}

.template-placeholder {
  position: absolute;
  width: 100%;
  top: 10%;
  text-align: center !important;
}

.con-img-upload {
  display: flex !important;
  flex-wrap: wrap;
  padding: 0px !important;
  margin-top: 0px !important;
}

.vs-input {
  width: 107px;
  height: 34px;
}

.close-modal {
  color: #6e6b7b;
  transform: translate(-50%, 50%) !important;
  box-shadow: none !important;
}

.vs-dialog-cancel:hover {
  box-shadow: 0 5px 20px 0 rgb(0 0 0 / 10%) !important;
}

.file-upload {
  .collapse-cstm-card {
    width: 220px !important;
  }

  .vs-card--content {
    padding: 0;
  }

  .collapseContent {
    padding: 0;
  }

  .con-vs-card {
    margin: 0;
  }

  &.certificate-file-upload {
    width: unset !important;
    margin-right: 0.5rem;
  }

  .cstm_vuefileagent_holder {
    top: 18px;
    position: absolute;
    width: 100%;
    border-radius: 10px;
    height: 152px;
  }
}
</style>
