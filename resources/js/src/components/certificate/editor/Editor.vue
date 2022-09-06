<template>
  <!-- <quill-editor v-model="content" :options="editorOption" class="editor">
    <div id="toolbar" slot="toolbar">
      <button class="ql-bold">Bold</button>
      <button class="ql-italic">Italic</button>
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
      <button class="ql-script" value="sub"></button>
      <button class="ql-script" value="super"></button>
      <button style="width:auto" @click="customButtonClick">Click here</button>
    </div>
  </quill-editor> -->
  <div class="w-full h-full editor-wrapper">
    <img
      class="editor-bg"
      :src="!!templateList.length && templateList[template].certificate_image_details.file.file_path"
      alt="1.png"
    >
    <draggable v-for="(item, index) in content" :key="index" :data="item">
      <div :style="item.style">
        <vs-input
          v-if="activeIndex == index"
          size="small"
          class="inputx"
          placeholder="Size small"
          v-model="content[activeIndex].content"
          @keydown="(e) => changeContent(e)"
        />
        <p v-else @dblclick="setActiveIndex(index)">{{ item.content }}</p>
      </div>
    </draggable>
  </div>
</template>


<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import Draggable from './Draggable'

export default {
  props: {
    template: {
      required: true
    },
    dynamicTextList: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: '#toolbar'
        }
      },
      content: [
        {
          type: 'static-text',
          style: { 'align-items': 'center', 'text-align': 'center', fontSize: '14px', fontWeight: '500', width: '80px', height: '80px', background: '#DFE4EB', 'border-radius': '47px' },
          content: 'School Logo',
          x: 50,
          y: 0
        },
        {
          type: 'static-text',
          style: { fontSize: '18px', fontWeight: 'bold' },
          content: 'Congratulations!',
          x: 250,
          y: 0
        },
        {
          type: 'static-text',
          style: { fontSize: '14px', width: 'max-content' },
          content: 'This is text number 1 if selected.',
          x: 250,
          y: 80
        }
      ],
      activeIndex: -1,
    }
  },
  components: {
    quillEditor,
    Draggable
  },
  computed: {
    templateList: function () {
      return this.$store.getters["getTemplateList"]
    },
  },
  methods: {
    customButtonClick() {
      alert('Button clicked!')
    },
    setActiveIndex(index) {
      this.activeIndex = index
    },
    changeContent(e) {
      if (e.keyCode === 13) {
        this.activeIndex = -1
      }
    },
    addDynamicText(id) {
      this.content.push({
        type: 'static-text',
        style: { fontSize: '14px', width: 'max-content' },
        content: this.dynamicTextList.filter((text) => text.field_id == id)[0]['field_code'],
        x: 100,
        y: 100
      })
    }
  }
}
</script>
<style>
.editor {
  height: 925px;
}

.editor-wrapper {
  position: relative;
}

.editor-bg {
  position: absolute;
  width: 100%;
  height: 100%;
}


.ql-editor {
  margin-top: 84px;
  margin-left: 118px;
  margin-bottom: 188px;
  margin-right: 128px;
  background-color: white;
  height: 547px;
}


.ql-container {
  border: none !important;
}


.template-content {
  align-items: center;
}


.certificate-editor {
  width: 840px !important;
  height: 547px !important;
  background-color: white !important;
  margin-top: 10;
  margin-left: 10;
}


#toolbar {
  background-color: white;
}
</style>