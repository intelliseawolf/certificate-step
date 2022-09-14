<template>
  <div class="my-5">
    <!-- Size Section -->
    <div>
      <p><b>Choose a template or upload your own certificate to start</b></p>
      <div class="flex mt-5">
        <!-- Orientation -->
        <div class="mr-10">
          <p>Orientation</p>
          <div class="flex">
            <div class="mr-2">
              <vs-radio v-model="orientation" vs-value="landscape">Landscape</vs-radio>
            </div>
            <div class="m">
              <vs-radio v-model="orientation" vs-value="portrait">Portrait</vs-radio>
            </div>
          </div>
        </div>
        <!-- Size -->
        <div>
          <p>Size</p>
          <div class="flex">
            <div class="mr-2">
              <vs-radio v-model="size" vs-value="size-a4" @change="changeSize(877, 620)">A4</vs-radio>
            </div>
            <div class="m">
              <vs-radio v-model="size" vs-value="size-legal" @change="changeSize(1071,650)">Legal</vs-radio>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Preview Section -->
    <div class="my-5">
      <p class="mb-10"><b>Preview</b></p>
      <div class="preview-section my-5">
        <div class="flex template-pos">
          <TemplateSection v-if="templateList.length" type="topImage" :style="{
            width: `${width}px`,
            height: `${height}px`
          }" :width="width" :height="height" :template="templateList[selectedTemplate]"
            :content="JSON.parse(templateList[selectedTemplate].content)" />
        </div>
        <!-- <div class="template-placeholder">
          <p v-html="templateList[selectedTemplate].title"
            v-if="templateList[selectedTemplate] && templateList[selectedTemplate].title !== null"></p>
          <p v-html="templateList[selectedTemplate].description"
            v-if="templateList[selectedTemplate] && templateList[selectedTemplate].description !== null"></p>
          <p v-html="templateList[selectedTemplate].content"
            v-if="templateList[selectedTemplate] && templateList[selectedTemplate].content !== null"></p>
        </div> -->
      </div>
    </div>
    <!-- Templates Section -->
    <div class="my-5">
      <p><b>Templates</b></p>
      <div class="flex flex-wrap">
        <div class="templates-section mx-2">
          <!-- Upload -->
          <div class="mt-5 mr-2">
            <img :src="previewImage" class="uploading-image" />
            <!-- <input type="file" accept="image/jpeg" @change=uploadImage> -->
            <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input" />
          </div>
          <div :class="`template-box mr-2 mt-5 ${selectedTemplate === index ? 'template-box-active' : ''}`"
            v-for="(template, index) in templateList" :key="index" @click="selectTemplate(index)">
            <TemplateSection :type="index" :style="{
              width: `200px`,
              height: `143px`
            }" :width="width" :height="height" :template="template" :content="JSON.parse(template.content)" />
            <!-- <div class="template-placeholder">
              <p v-html="template.title" v-if="template && template.title !== null"></p>
              <p v-html="template.description" v-if="template && template.description !== null"></p>
              <p v-html="template.content" v-if="template && template.content !== null"></p>
            </div> -->
          </div>
        </div>
        <div class="mt-3 mx-auto" v-if="templateListMetaData && templateListMetaData.total">
          <vs-pagination circle v-model="currentPage" not-margin :dotted-number="10" color="success"
            :total="totalPages" />
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
import TemplateSection from "./editor/TemplateSection.vue"

export default {
  components: {
    TemplateSection,
  },
  props: {
    selectedTemplate: {
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
  },
  computed: {
    templateList: function () {
      return this.$store.getters['getTemplateList']
    },
    templateListMetaData: function () {
      return this.$store.getters['getTemplateListMetaData']
    },
    totalPages: function () {
      return Math.ceil(this.templateListMetaData.total / 20)
    }
  },
  mounted() {
    this.$store.dispatch('getTemplates', {
      page: 1,
    })
      .then(() => {
        this.$emit("changeTemplate", 0)
      })
  },
  methods: {
    // uploadImage(e) {
    //   const image = e.target.files[0]
    //   const reader = new FileReader()
    //   reader.readAsDataURL(image)
    //   reader.onload = e => {
    //     this.previewImage = e.target.result
    //   }
    // },
    uploadImage(event) {
      const URL = 'https://scoolio-backend-dev.track-progress.com/api/certificate/file/save'

      let data = new FormData()
      data.append('name', 'my-picture')
      data.append('file', event.target.files[0])

      let config = {
        header: {
          'Content-Type': 'image/png'
        }
      }

      axios.post(
        URL,
        data,
        config
      ).then(
        response => {
          console.log('image upload response > ', response)
        }
      )
    },
    selectTemplate(index) {
      this.$emit("changeTemplate", index)
    },
    nextTab() {
      this.$emit("nextTab")
      this.$emit("setInitialContent", JSON.parse(this.templateList[this.selectedTemplate].content))
    },
    changeSize(w, h) {
      if (this.orientation == 'landscape') {
        this.$emit("changeImageSize", {
          width: w,
          height: h
        })
      } else {
        this.$emit("changeImageSize", {
          width: h,
          height: w
        })
      }
    },
  },
  data() {
    return {
      orientation: 'landscape',
      size: 'size-a4',
      // AgGrid
      currentPage: 1,
      template: [],
      content: "",
      previewImage: null
    }
  },
  watch: {
    orientation() {
      this.$emit("changeImageSize", {
        width: this.height,
        height: this.width
      })
    },
    currentPage(newVal) {
      this.$store.dispatch('getTemplates', {
        page: newVal,
      })
    }
  }
}
</script>

<style>
.uploading-image {
  display: flex;
  width: 240px;
  height: 144px;
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
  width: 100%
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
</style>
