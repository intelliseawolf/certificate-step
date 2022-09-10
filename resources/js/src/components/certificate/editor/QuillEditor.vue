<template>
  <div class="custom-quill-editor">
    <quill-editor v-model="content" :options="editorOption" theme="bubble">
      <div id="toolbar" slot="toolbar">
        <button class="ql-bold">Bold</button>
        <button class="ql-italic">Italic</button>
        <button class="ql-underline">Underline</button>
        <button class="ql-link">Link</button>

        <select class="ql-size">
          <option value="small"></option>
          <option selected></option>
          <option value="large"></option>
          <option value="huge"></option>
        </select>

        <select class="ql-font">
          <option selected="selected"></option>
          <option value="serif"></option>
          <option value="monospace"></option>
        </select>

        <button class="ql-image float-right">Image</button>
      </div>
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
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: '#toolbar'
        }
      },
      content: `...`,
    }
  },
  methods: {
    customButtonClick() {
      alert("Button clicked!");
    }
  }
};
</script>
