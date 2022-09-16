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
  <div class="editor-wrapper" :style="{
    width: `${width}px`,
    height: `${height}px`
  }">
    <!-- <vs-switch v-model="canEditable" style="width: 60px;">
      <span slot="on">Editor</span>
      <span slot="off">Drag</span>
    </vs-switch> -->
    <div class="drag-toolbar">
      <v-select class="mr-3" v-model="dragOption.fontFamily" :options="dragToolbarOptions.fontFamilyList"
        :dir="$vs.rtl ? 'rtl' : 'ltr'" @input="changeFontFamily" />
      <v-select class="mr-3" v-model="dragOption.fontSize" :options="dragToolbarOptions.fontSizeList"
        :dir="$vs.rtl ? 'rtl' : 'ltr'" @input="changeFontSize" />
      <color-picker v-model="dragOption.color" @input="changeColor" />
      <i class="material-icons ml-3" @click="toggleUnderline"> format_underline </i>
      <i class="material-icons ml-3" @click="toggleBold"> format_bold </i>
      <i class="material-icons ml-auto text-red" @click="removeText" dir="rtl">
        delete
      </i>
    </div>
    <img class="editor-bg" :src="image && image.file && image.file.file_path" alt="certificate-bg">
    <draggable v-for="(item, index) in content" :key="index" :data="item" @endDrag="endDrag"
      @onDragMove="(val) => onDragMove(index, val)">
      <div :style="item.style" :class="{
        flex: true,
        activeDragItem: activeDragIndex == index
      }" @mousedown="dragItem(index)">
        <vs-input v-if="activeIndex == index" class="inputx" placeholder="text" v-model="content[activeIndex].content"
          @keydown="(e) => changeContent(e)" />
        <p v-else @dblclick="setActiveIndex(index)" v-html="item.content"></p>
      </div>
    </draggable>
    <!-- <quill-editor
      v-if="canEditable"
      v-model="mainContent"
      @dblclick="toggleDraggable"
    /> -->
    <!-- <div class="editor-static-text" v-html="mainContent"></div> -->
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
      content: [],
      staticTextContent: [],
      activeIndex: -1,
      mainContent: "",
      dragOption: {
        fontFamily: { id: 1, label: 'Sora', value: 'Sora' },
        fontSize: { id: 2, label: 'Normal', value: '18px' },
        color: "#000000"
      },
      dragToolbarOptions: {
        fontFamilyList: [
          // TOP 20 Best Fonts
          { id: 1, label: 'Sora', value: 'Sora' },
          { id: 2, label: 'Hahmlet', value: 'Hahmlet' },
          { id: 3, label: 'JetBrains Mono', value: 'JetBrains Mono' },
          { id: 4, label: 'Andada Pro', value: 'Andada Pro' },
          { id: 5, label: 'Epilogue', value: 'Epilogue' },
          { id: 6, label: 'Inter', value: 'Inter' },
          { id: 7, label: 'Encode Sans', value: 'Encode Sans' },
          { id: 8, label: 'Manrope', value: 'Manrope' },
          { id: 9, label: 'Lora', value: 'Lora' },
          { id: 10, label: 'BioRhyme', value: 'BioRhyme' },
          { id: 11, label: 'Playfair Display', value: 'Playfair Display' },
          { id: 12, label: 'Archivo', value: 'Archivo' },
          { id: 13, label: 'Roboto', value: 'Roboto' },
          { id: 14, label: 'Cormorant', value: 'Cormorant' },
          { id: 15, label: 'Spectral', value: 'Spectral' },
          { id: 16, label: 'Raleway', value: 'Raleway' },
          { id: 17, label: 'Work Sans', value: 'Work Sans' },
          { id: 18, label: 'Lato', value: 'Lato' },
          { id: 19, label: 'Anton', value: 'Anton' },
          { id: 20, label: 'Old Standard TT', value: 'Old Standard TT' },
          { id: 21, label: 'Oswald', value: 'Oswald' },
          { id: 22, label: 'Montserrat', value: 'Montserrat' },
          { id: 23, label: 'Poppins', value: 'Poppins' },
          { id: 24, label: 'Nunito', value: 'Nunito' },
          { id: 25, label: 'Source Sans Pro', value: 'Source Sans Pro' },
          { id: 26, label: 'Oxygen', value: 'Oxygen' },
          { id: 27, label: 'Open Sans', value: 'Open Sans' },
          // 26 Best Cursive Fonts
          { id: 28, label: 'Arizonia', value: 'Arizonia' },
          { id: 29, label: 'Lobster', value: 'Lobster' },
          { id: 30, label: 'Rouge Script', value: 'Rouge Script' },
          { id: 31, label: 'Pacifico', value: 'Pacifico' },
          { id: 32, label: 'Alex Brush', value: 'Alex Brush' },
          { id: 33, label: 'Kaushan Script', value: 'Kaushan Script' },
          { id: 34, label: 'Sail', value: 'Sail' },
          { id: 35, label: 'Sacramento', value: 'Sacramento' },
          { id: 36, label: 'Marck Script', value: 'Marck Script' },
          { id: 37, label: 'Sonsie One', value: 'Sonsie One' },
          { id: 38, label: 'Monsieur La Doulaise', value: 'Monsieur La Doulaise' },
          { id: 39, label: 'Rock Salt', value: 'Rock Salt' },
          { id: 40, label: 'Rochester', value: 'Rochester' },
          { id: 41, label: 'Rancho', value: 'Rancho' },
          { id: 42, label: 'Croissant One', value: 'Croissant One' },
          { id: 43, label: 'Yesteryear', value: 'Yesteryear' },
          { id: 44, label: 'Courgette', value: 'Courgette' },
          { id: 45, label: 'Sofia', value: 'Sofia' },
          { id: 46, label: 'Allura', value: 'Allura' },
          { id: 47, label: 'Redressed', value: 'Redressed' },
          { id: 48, label: 'Cookie', value: 'Cookie' },
          { id: 49, label: 'Amita', value: 'Amita' },
          { id: 50, label: 'Meie Script', value: 'Meie Script' },
          { id: 51, label: 'Euphoria Script', value: 'Euphoria Script' },
          { id: 52, label: 'Tangerine', value: 'Tangerine' },
          { id: 53, label: 'Sevillana', value: 'Sevillana' },
        ],
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
        id: id,
        type: 'dynamic-text',
        style: { fontSize: '18px', width: 'max-content', fontFamily: 'Sora' },
        content: this.dynamicTextList.filter((text) => text.field_id == id)[0]['field_code'],
        x: 100,
        y: 100
      })
      // this.mainContent = this.mainContent.concat('', `<p>${this.dynamicTextList.filter((text) => text.field_id == id)[0]['field_code']}</p>`)
    },
    addStaticText(text) {
      this.content.push({
        type: 'static-text',
        style: { fontSize: '18px', width: 'max-content', fontFamily: 'Sora' },
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
      this.activeDragIndex = index
      this.dragOption.fontSize = this.getFontSizeOption(this.content[index].style.fontSize)
      this.dragOption.fontFamily = this.getFontFamilyOption(this.content[index].style.fontFamily)
      this.dragOption.color = this.content[index].style.color ? this.content[index].style.color : '#000000'
    },
    endDrag() {
      this.activeDragIndex = -1
    },
    getFontSizeOption(size) {
      switch (size) {
        case "12px":
          return { id: 1, label: 'Small', value: '12px' }
        case "18px":
          return { id: 2, label: 'Normal', value: '18px' }
        case "24px":
          return { id: 3, label: 'Large', value: '24px' }
        case "30px":
          return { id: 4, label: 'Huge', value: '30px' }
        default:
          return { id: 2, label: 'Normal', value: '18px' }
      }
    },
    getFontFamilyOption(family) {
      switch (family) {
        case "Sora":
          return { id: 4, label: 'Sora', value: 'Sora' }
        default:
          return { id: 2, label: 'Sora', value: 'Sora' }
      }
    },
    changeFontSize() {
      if (this.activeDragIndex != -1) {
        this.content[this.activeDragIndex].style.fontSize = this.dragOption.fontSize.value
      }
    },
    changeFontFamily() {
      if (this.activeDragIndex != -1) {
        this.content[this.activeDragIndex].style.fontFamily = this.dragOption.fontFamily.value
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
    onDragMove(index, { x, y }) {
      this.content[index].x = x
      this.content[index].y = y
    },
    setContent(content) {
      this.content = content
    },
    removeText() {
      if (this.activeDragIndex == -1) return
      const textInfo = this.content[this.activeDragIndex]
      if (textInfo.type == 'static-text') {
        this.$emit("removeStaticText", textInfo.content)
      } else {
        this.content = this.content.filter((item) => item.id != textInfo.id)
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

.mr-3 .vs__dropdown-toggle {
  min-width: 140px !important;
  max-width: 240px !important;
}

.activeDragItem {
  padding: 5px 10px;
  border: 1px solid rgb(66, 66, 150);
  border-radius: 4px;
}
</style>
