<template>
  <div class="my-5">
    <!-- Header -->
    <div>
      <p><b>Edit text and dynamic fields</b></p>
      <div class="flex">
        <div class="template-toolbar">
          <Menubutton
            @setDynamicText="setDynamicText"
            @createStaticText="createStaticText"
            @removeStaticText="removeStaticText"
            :dynamicTextList="dynamicTextList"
            :staticTextList="staticTextList"
          />
        </div>
        <div class="template-edit-box">
          <Editor
            :dynamicTextList="dynamicTextList"
            :template="template"
            :image="image"
            :width="width"
            :height="height"
            @changeMainContent="changeContent"
            @removeStaticText="removeStaticText"
            ref="editor"
          />
        </div>
      </div>

      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="mt-8 flex flex-wrap items-center justify-end">
            <vs-button class="mr-auto mt-2 dark" type="flat" @click="prevTab"
              >Back</vs-button
            >
            <vs-button class="ml-auto mt-2" @click="nextTab">Preview</vs-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menubutton from "./dropdown/MenuButton.vue";
import Editor from "./editor/Editor.vue";

export default {
  props: {
    template: {
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
    image: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.$store.dispatch("getDynamicTexts");
  },
  computed: {
    dynamicTextList: function () {
      return this.$store.getters["getDynamicTextList"];
    },
  },
  methods: {
    setDynamicText(id) {
      this.$refs.editor.addDynamicText(id);
    },
    nextTab() {
      if (!this.$refs.editor.content.length) {
        return this.$vs.notify({
          title: "Warning",
          text: "You must choose the static or dynamic texts",
          color: "danger",
          iconPack: "feather",
          icon: "icon-alert-circle",
        });
      }
      this.$emit("nextTab");
    },
    prevTab() {
      this.$emit("prevTab");
    },
    changeContent(content) {
      this.$emit("changeContent", content);
    },
    createStaticText(text) {
      this.staticTextList.push(text);
      this.$refs.editor.addStaticText(text);
    },
    removeStaticText(text) {
      this.staticTextList = this.staticTextList.filter((item) => item != text);
      this.$refs.editor.removeStaticText(text);
    },
    getEditorContent() {
      return this.$refs.editor.content;
    },
    setEditorContent(content) {
      this.$refs.editor.setContent(content);
    },
  },
  data() {
    return {
      orientation: "landscape",
      // AgGrid
      currentPage: 1,
      selected: -1,
      staticTextList: [],
    };
  },
  components: {
    Editor,
    Menubutton,
  },
};
</script>

<style>
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
  left: 716px;
  top: 356px;
  border-radius: 6px;
  margin-top: 7px;
  background: #f6f6f6;
  padding: 150px 43px 50px;
}
</style>
