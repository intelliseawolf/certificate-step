<template>
  <div class="my-5">
    <!-- Header -->
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
              <vs-radio v-model="size" vs-value="size-a4" @change="changesize(877, 620)">A4</vs-radio>
            </div>
            <div class="m">
              <vs-radio v-model="size" vs-value="size-legal" @change="changesize(1071,650)">Legal</vs-radio>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Preview -->
    <div class="my-5">
      <p class="mb-10"><b>Preview</b></p>
      <div class="preview-section my-5">
        <div class="flex template-pos">
          <img :width="width" :height="height"
            :src="!!templateList.length && templateList[selectedTemplate].certificate_image_details.file.file_path"
            alt="1.png" v-if="orientation === 'landscape'">
          <img :width="height" :height="width"
            :src="!!templateList.length && templateList[selectedTemplate].certificate_image_details.file.file_path"
            alt="1.png" v-else>
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
    <!-- Templates -->
    <div class="my-5">
      <p><b>Templates</b></p>
      <div class="flex flex-wrap">
        <div class="templates-section mx-2">
          <!-- Upload -->
          <div class="mt-5 mr-2">
            <vs-upload action="https://jsonplaceholder.typicode.com/posts/" text="" accept="image/*">
            </vs-upload>
          </div>
          <div :class="`template-box mr-2 mt-5 ${selectedTemplate === index ? 'template-box-active' : ''}`"
            v-if="(index >= (currentPage - 1) * 5) && (index < currentPage * 5)"
            v-for="(template, index) in templateList" :key="template.title" @click="selectTemplate(index)">
            <img :src="template.certificate_image_details.file.file_path" width="240" height="144"
              class="template-img" />
            <!-- <div class="template-placeholder">
              <p v-html="template.title" v-if="template && template.title !== null"></p>
              <p v-html="template.description" v-if="template && template.description !== null"></p>
              <p v-html="template.content" v-if="template && template.content !== null"></p>
            </div> -->
          </div>
        </div>
        <div class="mt-3 w-1/2" v-if="templateListMetaData && templateListMetaData.total">
          <vs-pagination :length="totalPages" circle v-model="currentPage" not-margin :dotted-number="10"
            color="success" :total="templateListMetaData.total" />
        </div>
      </div>
    </div>
    <!-- Next Button -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button class="ml-auto mt-2" @click="changeTab">Next</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedTemplate: {
      required: true
    },
  },
  computed: {
    templateList: function () {
      return this.$store.getters['getTemplateList']
    },
    templateListMetaData: function () {
      return this.$store.getters['templateListMetaData']
    },
    totalPages: function () {
      return Math.ceil(this.templateList / 5)
    }
  },
  mounted() {
    this.$store.dispatch('getTemplates')
      .then(() => {
        this.$emit("changeTemplate", 0)
      })
  },
  methods: {
    selectTemplate(index) {
      this.$emit("changeTemplate", index)
    },
    changeTab() {
      this.$emit("changeTab", 1)
    },
    changesize(w, h) {
      this.width = w
      this.height = h
    }
  },
  data() {
    return {
      orientation: 'landscape',
      size: 'size-a4',
      width: 877,
      height: 620,
      // AgGrid
      currentPage: 1,
      template: [],
      content: ""
    }
  }
}
</script>

<style>
.template-box {
  position: relative;
  width: 242px;
  height: 146px;
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

.con-input-upload,
.img-upload {
  width: 240px !important;
  height: 144px !important;
  margin-top: 0px !important;
  margin-bottom: 0px !important;
  margin-left: 0px !important;
  margin-right: 1px !important;
}

.con-input-upload {
  order: -1;
}

.img-upload {
  margin-left: 1px !important;
  margin-right: 1px !important;
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
