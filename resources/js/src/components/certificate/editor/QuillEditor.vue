<template>
  <div class="custom-quill-editor">
    <quill-editor v-model="content" theme="snow">
    </quill-editor>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  name: "QuillEditor",
  components: {
    quillEditor,
  },
  props: {
    value: {
      required: true
    }
  },
  data() {
    return {
      content: this.value
    }
  },
  methods: {
    customButtonClick() {
      alert("Button clicked!");
    }
  },
  watch: {
    content(newVal) {
      this.$emit("input", newVal)
    },
    value(newVal) {
      this.content = newVal
    }
  }
};
</script>

<style lang="scss">
.custom-quill-editor {
  position: absolute;
  width: 100%;

  .ql-container {
    width: 877px;
    margin-right: auto;
    margin-left: auto;
    border: none !important;
  }

  .ql-toolbar {
    position: absolute;
    background: white;
    top: -85px;
    width: 100%;
    border: none !important;
  }
}


</style>