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
  <div
    class="editor-wrapper"
    :style="{
      width: `${width}px`,
      height: `${height}px`
    }"
  >
    <!-- <vs-switch v-model="canEditable" style="width: 60px;">
      <span slot="on">Editor</span>
      <span slot="off">Drag</span>
    </vs-switch> -->
    <div class="drag-toolbar">
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
      <i class="material-icons ml-3" @click="toggleUnderline"> format_underline </i>
      <i class="material-icons ml-3" @click="toggleBold"> format_bold </i>
      <i class="material-icons ml-auto" @click="togglePhoto"> insert_photo </i>
    </div>
    <img
      class="editor-bg"
      :src="image && image.file && image.file.file_path"
      alt="certificate-bg"
    >
    <Draggable
      v-for="(item, index) in draggableContent"
      :key="index + item.content"
      :data="item"
      :class="{
        activeDragItem: activeDragIndex == index
      }"
      @endDrag="endDrag"
      @onDragMove="(val) => onDragMove(index, val)"
    >
      <div
        class="flex"
        :style="item.style"
        @mousedown="dragItem(index)"
      >
        <vs-input
          v-if="activeIndex == index"
          class="inputx"
          placeholder="text"
          v-model="content[activeIndex].content"
          @keydown="(e) => changeContent(e)"
        />
        <div v-else class="drag-item">
          <p @dblclick="setActiveIndex(index)" v-html="item.content"></p>
          <i v-if="activeDragIndex == index" class="material-icons ml-auto text-red" @click="removeText" dir="rtl">
            delete
          </i>
        </div>

      </div>
    </Draggable>
    <Resizable
      v-for="(item, index) in resizableContent"
      :key="index"
      :data="item"
      :class="{
        activeDragItem: activeDragIndex == index
      }"
      @endDrag="endDrag"
      @onDragMove="(val) => onDragMove(index, val)"
      @onResize="(val) => onResize(index, val)"
    >
      <div
        class="flex"
        :style="item.style"
        @mousedown="dragItem(index)"
      >
      </div>
    </Resizable>
    <!-- <quill-editor
      v-if="canEditable"
      v-model="mainContent"
      @dblclick="toggleDraggable"
    /> -->
    <!-- <div class="editor-static-text" v-html="mainContent"></div> -->
    <upload-image-modal
      ref="uploadImageModal"
      @handleOk="setEditorImage"
    />
  </div>
</template>

<script>
import vSelect from 'vue-select'

import ColorPicker from "./ColorPicker.vue"
import QuillEditor from "./QuillEditor"
import Draggable from './Draggable'
import Resizable from "./Resizable"
import UploadImageModal from '../Modal/UploadImageModal.vue'

export default {
  props: {
    template: {
      required: true
    },
    image: {
      type: Object,
      required: true
    },
    dynamicTextList: {
      type: Array,
      required: false
    },
    staticTextList: {
      type: Array,
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: '#toolbar'
        }
      },
      content: [{
        type: 'image',
        style: { width: "50px", height: "50px", backgroundImage: `url('https://scoolio-files.s3.ap-south-1.amazonaws.com/20211129063744097501/Default/kmBCI10023i6i2mO.jpg')` },
        content: "",
        x: 100,
        y: 100
      }],
      
      staticTextContent: [],
      activeIndex: -1,
      mainContent: "",
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
    UploadImageModal,
    Resizable,
  },
  computed: {
    templateList: function () {
      return this.$store.getters["getTemplateList"]
    },
    draggableContent() {
      return this.content.filter((item) => item.type != 'image')
    },
    resizableContent() {
      return this.content.filter((item) => item.type == 'image')
    }
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
      const sameTextCount = this.getSameDynamicTextCount(id);

      this.content.push({
        id: id,
        type: 'dynamic-text',
        style: { fontSize: '18px', width: 'max-content' },
        content: this.dynamicTextList.filter((text) => text.field_id == id)[0]['field_code'] + sameTextCount,
        x: 100,
        y: 100
      })
      // this.mainContent = this.mainContent.concat('', `<p>${this.dynamicTextList.filter((text) => text.field_id == id)[0]['field_code']}</p>`)
    },
    getSameDynamicTextCount(id) {
      let count = 0

      this.content.map((item) => {
        if (item.id == id) count++
      })
      return count
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
      console.log(index, 'dragItem')
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
    },
    toggleUnderline() {
      if (this.activeDragIndex != -1) {
        const value = this.content[this.activeDragIndex].style.textDecoration
        this.content[this.activeDragIndex].style = {
          ...this.content[this.activeDragIndex].style,
          textDecoration: value && value == 'underline' ? 'unset' : 'underline'
        }
      }
    },
    toggleBold() {
      if (this.activeDragIndex != -1) {
        const value = this.content[this.activeDragIndex].style.fontWeight
        this.content[this.activeDragIndex].style = {
          ...this.content[this.activeDragIndex].style,
          fontWeight: value && value == 'bold' ? 'normal' : 'bold'
        }
      }
    },
    onDragMove(index, {x, y}) {
      this.content[index].x = x;
      this.content[index].y = y;
    },
    onResize(index, {width, height}) {
      this.content[index].style.width = width + "px";
      this.content[index].style.height = height + "px";
    },
    setContent(content) {
      this.content.push(content)
    },
    removeText() {
      if (this.activeDragIndex == -1) return
      const textInfo = this.content[this.activeDragIndex]
      if (textInfo.type == 'static-text') {
        this.$emit("removeStaticText", textInfo.content)
      } else {
        this.content = this.content.filter((item) => item.id != textInfo.id)
      }
    },
    togglePhoto() {
      this.$refs.uploadImageModal.toggleModal()
    },
    setEditorImage(image) {
      console.log('setEditorImage', image)
      this.content.push({
        type: 'image',
        style: { width: "50px", height: "50px", backgroundImage: `url(${image})` },
        content: "",
        x: 100,
        y: 100
      })
      console.log(image)
    },
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

.draggable .drag-item {
  position: relative;
}

.draggable .drag-item .material-icons {
  position: absolute;
  top: -35px;
  left: 95%;
}
</style>
