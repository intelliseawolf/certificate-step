<template>
  <div class="my-5">
    <!-- Header -->
    <div>
      <p><b>Edit text and dynamic fields</b></p>
      <div class="flex">
        <div class="template-toolbar">
          <Menubutton @setDynamicText="setDynamicText" :activeDynamicTexts="activeDynamicTexts"
            :dynamicTextList="dynamicTextList" />
        </div>
        <div class="template-edit-box">
          <Editor :dynamicTextList="dynamicTextList" :template="template" ref="editor" />
        </div>
      </div>

      <!-- Next Button -->
      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="mt-8 flex flex-wrap items-center justify-end">
            <vs-button class="mr-auto mt-2 dark" type="flat">Back</vs-button>
            <vs-button class="ml-auto mt-2">Preview</vs-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menubutton from './dropdown/MenuButton.vue'
import Editor from './editor/Editor.vue'

export default {
  props: {
    template: {
      required: true
    },
  },
  mounted() {
    this.$store.dispatch("getTemplates")
      .then(() => {
        this.selected = 0
      })
    this.$store.dispatch("getDynamicTexts")
  },
  computed: {
    dynamicTextList: function () {
      return this.$store.getters['getDynamicTextList']
    },
  },
  methods: {
    selectTemplate(index) {
      this.selected = index
    },
    setDynamicText(id) {
      this.$refs.editor.addDynamicText(id)
      this.activeDynamicTexts.push(id)
    }
  },
  data() {
    return {
      orientation: "landscape",
      width: 300,
      height: 500,
      // AgGrid
      currentPage: 1,
      selected: -1,
      activeDynamicTexts: []
    }
  },
  components: { Editor, Menubutton },
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

.template-toolbar {
  margin-right: 56px;
  padding: 16px;
  height: 932px;
  width: 340px;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.04);
}

.template-edit-box {
  width: 100%;
  height: 925px;
  left: 716px;
  top: 356px;
  border-radius: 6px;
  margin-top: 7px;
  background: #F6F6F6;
  padding: 50px 43px 50px 43px;
}
</style>
