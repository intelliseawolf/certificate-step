<template>
  <div class="my-5">
    <!-- Header -->
    <div>
      <p><b>Choose a template or upload your own certificate to start</b></p>
      <div class="flex mt-5">
        <!-- Orientation -->
        <div class="mr-3">
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
          <span>Size</span>
          <div class="flex">
            <div class="items-center flex mt-2 mr-4">
              <label class="mr-3" for="width">W </label>
              <vs-input class="text-right" type="number" v-model="width" />
            </div>
            <div class="items-center flex mt-2">
              <label class="mr-3" for="height">H </label>
              <vs-input class="text-right" type="number" v-model="height" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Preview -->
    <div class="my-5">
      <p><b>Preview</b></p>
      <div class="preview-section my-5">
        <div class="flex template-pos">
          <img :width="width" :height="height"
            :src="!!templateList.length && templateList[selectedTemplate].certificate_image_details.file.file_path"
            alt="1.png" v-if="orientation === 'landscape'">
          <img :width="height" :height="width"
            :src="!!templateList.length && templateList[selectedTemplate].certificate_image_details.file.file_path"
            alt="1.png" v-else>
        </div>
      </div>
    </div>
    <!-- Styles -->
    <div class="my-5">
      <span><b>Styles</b></span>
      <vs-checkbox class="my-3">Any style</vs-checkbox>
      <div class="flex justify-center row-gap-3 flex-wrap">
        <a href="#">
          <img class="mx-2" width="245" height="158" src="/images/styles_img/style_1.png" alt="style_1.png">
        </a>
        <a href="#">
          <img class="mx-2" width="245" height="158" src="/images/styles_img/style_2.png" alt="style_2.png">
        </a>
        <a href="#">
          <img class="mx-2" width="245" height="158" src="/images/styles_img/style_3.png" alt="style_3.png">
        </a>
        <a href="#">
          <img class="mx-2" width="245" height="158" src="/images/styles_img/style_4.png" alt="style_4.png">
        </a>
        <a href="#">
          <img class="mx-2" width="245" height="158" src="/images/styles_img/style_5.png" alt="style_5.png">
        </a>
      </div>
    </div>
    <!-- Templates -->
    <div class="my-5">
      <p><b>Templates</b></p>
      <div class="flex flex-wrap">
        <div class="flex flex-wrap">
          <!-- Upload -->
          <div class="mt-5 mx-2">
            <vs-upload action="https://jsonplaceholder.typicode.com/posts/" text="" accept="image/*">
            </vs-upload>
          </div>
          <div :class="`template-box mr-2 mt-5 ${selectedTemplate === index ? 'template-box-active' : ''}`"
            v-if="(index >= (currentPage - 1) * 5) && (index < currentPage * 5)"
            v-for="(template, index) in templateList" :key="template.title" @click="selectTemplate(index)">
            <img :src="template.certificate_image_details.file.file_path" width="240" height="144"
              class="template-img" />
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
    }
  },
  data() {
    return {
      orientation: 'landscape',
      width: 500,
      height: 300,
      // AgGrid
      currentPage: 1,
      template: [],
    }
  }
}
</script>

<style>
.preview-section {
  background-color: #F6F6F6;
  width: 100%;
  height: 504px;
}

.template-box {
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

.template-pos {
  height: 100%;
  align-items: center;
  justify-content: center;
}

.con-input-upload {
  width: 240px !important;
  height: 144px !important;
  margin: 0px !important;
}

.con-img-upload {
  padding: 0px !important;
  margin-top: 0px !important;
}

.vs-input {
  width: 107px;
  height: 34px;
}
</style>
