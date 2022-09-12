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
  <div class="editor-wrapper">
    <vs-switch v-model="canEditable">
      <span slot="on">Editor</span>
      <span slot="off">Drag</span>
    </vs-switch>
    <div class="drag-toolbar" v-if="!canEditable">
      <v-select
        class="mr-3"
        v-model="dragOption.fontSize"
        :options="dragToolbarOptions.fontSizeList"
        :dir="$vs.rtl ? 'rtl' : 'ltr'"
        @input="changeFontSize"
      />
      <color-picker
        v-model="dragOption.color"
        @input="changeColor"
      />
    </div>
    <img
      class="editor-bg"
      :src="!!templateList.length && templateList[template].certificate_image_details.file.file_path"
      alt="certificate-bg"
    >
    <draggable
      v-for="(item, index) in content"
      :key="index"
      :data="item"
      @endDrag="endDrag"
    >
      <div
        :style="item.style"
        :class="{
          flex: true,
          activeDragItem: activeDragIndex == index
        }"
        @mousedown="dragItem(index)"
      >
        <vs-input
          v-if="activeIndex == index"
          class="inputx"
          placeholder="text"
          v-model="content[activeIndex].content"
          @keydown="(e) => changeContent(e)"
        />
        <p v-else @dblclick="setActiveIndex(index)" v-html="item.content"></p>
      </div>
    </draggable>
    <quill-editor
      v-if="canEditable"
      v-model="mainContent"
      @dblclick="toggleDraggable"
    />
    <div v-else class="editor-static-text" v-html="mainContent"></div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import ColorPicker from "./ColorPicker.vue"
import QuillEditor from "./QuillEditor"
import Draggable from './Draggable'

export default {
  props: {
    template: {
      required: true
    },
    dynamicTextList: {
      type: Array,
      required: false
    },
    staticTextList: {
      type: Array,
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
        // {
        //   type: 'static-text',
        //   style: { fontSize: '14px', width: 'max-content' },
        //   content: 'This is text number 1 if selected.',
        //   x: 250,
        //   y: 80
        // }
      ],
      staticTextContent: [],
      activeIndex: -1,
      mainContent: "",
      canEditable: true,
      dragOption: {
        fontSize: { id: 2, label: 'Normal', value: '18px' },
        color: "#000000"
      },
      dragToolbarOptions: {
        fontSizeList: [
          { id: 1, label: 'Small', value: '12px' }, // 12px
          { id: 2, label: 'Normal', value: '18px' }, // 18px
          { id: 3, label: 'Large', value: '24px' }, // 24px
          { id: 4, label: 'Huge', value: '30px' }, // 30px
        ],
      },
      activeDragIndex: -1,
    }
  },
  components: {
    QuillEditor,
    Draggable,
    vSelect,
    ColorPicker,
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
        type: 'dynamic-text',
        style: { fontSize: '18px', width: 'max-content' },
        content: this.dynamicTextList.filter((text) => text.field_id == id)[0]['field_code'],
        x: 100,
        y: 100
      })
      this.canEditable = false
      // this.mainContent = this.mainContent.concat('', `<p>${this.dynamicTextList.filter((text) => text.field_id == id)[0]['field_code']}</p>`)
    },
    toggleDraggable() {
      this.canEditable = !this.canEditable
    },
    allowDraggable() {
      this.canEditable = false;
    },
    addStaticText(text) {
      this.content.push({
        type: 'static-text',
        style: { fontSize: '18px', width: 'max-content' },
        content: text,
        x: 300,
        y: 300
      })
    },
    removeStaticText(text) {
      const index = this.content.findIndex((item) => item.content == text)
      this.content.splice(index, 1)
    },
    dragItem(index) {
      this.activeDragIndex = index;
      this.dragOption.fontSize = this.getFontSizeOption(this.content[index].style.fontSize)
      this.dragOption.color = this.content[index].style.color ? this.content[index].style.color : '#000000'
    },
    endDrag() {
      this.activeDragIndex = -1;
    },
    getFontSizeOption(size) {
      switch (size) {
        case "12px":
          return { id: 1, label: 'Small', value: '12px' };
        case "18px":
          return { id: 2, label: 'Normal', value: '18px' };
        case "24px":
          return { id: 3, label: 'Large', value: '24px' };
        case "30px":
          return { id: 4, label: 'Huge', value: '30px' };
        default:
          return { id: 2, label: 'Normal', value: '18px' };
      }
    },
    changeFontSize() {
      if (this.activeDragIndex != -1) {
        this.content[this.activeDragIndex].style.fontSize = this.dragOption.fontSize.value
      }
    },
    changeColor() {
      if (this.activeDragIndex != -1) {
        this.content[this.activeDragIndex].style.color = this.dragOption.color
      }
    }
  },
  watch: {
    templateList(newVal) {
      if (newVal && newVal.length) {
        this.mainContent = newVal[this.template].content
      }
    },
    mainContent(newVal) {
      this.$emit('changeMainContent', newVal)
    },
  }
}
</script>

<style>
.editor {
  height: 925px;
}

.editor-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  width: 877px;
  height: 620px;
  margin-right: auto;
  margin-left: auto;
}

.editor-bg {
  position: absolute;
  width: 100%;
  height: 100%;
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

.editor-static-text {
  position: absolute;
  top: 12px;
  left: 15px;
}

.vs-switch {
  position: absolute;
  top: -125px;
  left: 0;
}

.drag-toolbar {
  position: absolute;
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: white;
  width: 100%;
  top: -85px;
  left: 0px;
}

[dir] .vs__dropdown-toggle {
  width: 140px !important;
}

.activeDragItem {
  padding: 5px 10px;
  border: 1px solid rgb(66, 66, 150);
  border-radius: 4px;
}
</style>
