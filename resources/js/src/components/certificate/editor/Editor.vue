<template>
  <div
    class="editor-wrapper"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
    }"
  >
    <div class="drag-toolbar">
      <v-select
        class="mr-3"
        v-model="dragOption.fontFamily"
        :options="dragToolbarOptions.fontFamilyList"
        :dir="$vs.rtl ? 'rtl' : 'ltr'"
        @input="changeFontFamily"
      />
      <v-select
        class="mr-3"
        v-model="dragOption.fontSize"
        :options="dragToolbarOptions.fontSizeList"
        :dir="$vs.rtl ? 'rtl' : 'ltr'"
        @input="changeFontSize"
      />
      <color-picker v-model="dragOption.color" @input="changeColor" />
      <i class="material-icons ml-3" @click="toggleUnderline">
        format_underline
      </i>
      <i class="material-icons ml-3" @click="toggleBold"> format_bold </i>
      <i class="material-icons ml-3" @click="handleAlignCenter">
        format_align_center
      </i>
      <i class="material-icons ml-auto" @click="togglePhoto"> insert_photo </i>
    </div>
    <img
      class="editor-bg"
      :src="image && image.file && image.file.file_path"
      alt="certificate-bg"
    />
    <Draggable
      v-for="(item, index) in draggableContent"
      :key="index + item.content"
      :data="item"
      :class="{
        activeDragItem: activeDragIndex == index,
      }"
      @endDrag="endDrag"
      @onDragMove="(val) => onDragMove(item, val)"
    >
      <div
        class="flex"
        :style="{
          ...item.style,
          left: 'unset',
          top: 'unset',
          transform: 'unset',
        }"
        @mousedown="dragItem(index)"
        :ref="'dragItem' + index"
      >
        <input
          v-if="activeIndex == index && item.type !== 'dynamic-text'"
          class="inputx input-text"
          placeholder="text"
          v-model="content[activeIndex].content"
          @keydown="(e) => changeContent(e)"
        />
        <div v-else class="drag-item">
          <p @dblclick="setActiveIndex(index)" v-html="item.content"></p>
          <!-- <i v-if="activeDragIndex == index" class="material-icons ml-auto text-red" @click="removeText" dir="rtl">
            delete
          </i> -->
        </div>
      </div>
    </Draggable>
    <Resizable
      v-for="(item, index) in resizableContent"
      :key="index"
      :data="item"
      :class="{
        activeDragItem: activeResizeIndex == index,
      }"
      @endDrag="endResize"
      @onDragMove="(val) => onDragMove(item, val)"
      @onResize="(val) => onResize(item, val)"
    >
      <div
        class="flex"
        :style="item.style"
        @mousedown="resizeItem(index)"
      ></div>
    </Resizable>
    <upload-image-modal
      ref="uploadImageModal"
      @click="activePrompt = true"
      @handleOk="setEditorImage"
    />
  </div>
</template>

<script>
import vSelect from "vue-select";

import ColorPicker from "./ColorPicker.vue";
import QuillEditor from "./QuillEditor";
import Draggable from "./Draggable";
import Resizable from "./Resizable";
import UploadImageModal from "../Modal/UploadImageModal.vue";

export default {
  props: {
    template: {
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
    dynamicTextList: {
      type: Array,
      required: false,
    },
    staticTextList: {
      type: Array,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: "#toolbar",
        },
      },
      content: [],

      staticTextContent: [],
      activeIndex: -1,
      mainContent: "",
      dragOption: {
        fontFamily: { id: 1, label: "Sora", value: "Sora" },
        fontSize: { id: 2, label: "Normal", value: "18px" },
        color: "#000000",
      },
      dragToolbarOptions: {
        fontFamilyList: [
          // TOP 20 Best Fonts
          { id: 1, label: "Sora", value: "Sora" },
          { id: 2, label: "Hahmlet", value: "Hahmlet" },
          { id: 3, label: "JetBrains Mono", value: "JetBrains Mono" },
          { id: 4, label: "Andada Pro", value: "Andada Pro" },
          { id: 5, label: "Epilogue", value: "Epilogue" },
          { id: 6, label: "Inter", value: "Inter" },
          { id: 7, label: "Encode Sans", value: "Encode Sans" },
          { id: 8, label: "Manrope", value: "Manrope" },
          { id: 9, label: "Lora", value: "Lora" },
          { id: 10, label: "BioRhyme", value: "BioRhyme" },
          {
            id: 11,
            label: "Playfair Display",
            value: "Playfair Display",
          },
          { id: 12, label: "Archivo", value: "Archivo" },
          { id: 13, label: "Roboto", value: "Roboto" },
          { id: 14, label: "Cormorant", value: "Cormorant" },
          { id: 15, label: "Spectral", value: "Spectral" },
          { id: 16, label: "Raleway", value: "Raleway" },
          { id: 17, label: "Work Sans", value: "Work Sans" },
          { id: 18, label: "Lato", value: "Lato" },
          { id: 19, label: "Anton", value: "Anton" },
          {
            id: 20,
            label: "Old Standard TT",
            value: "Old Standard TT",
          },
          { id: 21, label: "Oswald", value: "Oswald" },
          { id: 22, label: "Montserrat", value: "Montserrat" },
          { id: 23, label: "Poppins", value: "Poppins" },
          { id: 24, label: "Nunito", value: "Nunito" },
          {
            id: 25,
            label: "Source Sans Pro",
            value: "Source Sans Pro",
          },
          { id: 26, label: "Oxygen", value: "Oxygen" },
          { id: 27, label: "Open Sans", value: "Open Sans" },
          // 26 Best Cursive Fonts
          { id: 28, label: "Arizonia", value: "Arizonia" },
          { id: 29, label: "Lobster", value: "Lobster" },
          { id: 30, label: "Rouge Script", value: "Rouge Script" },
          { id: 31, label: "Pacifico", value: "Pacifico" },
          { id: 32, label: "Alex Brush", value: "Alex Brush" },
          {
            id: 33,
            label: "Kaushan Script",
            value: "Kaushan Script",
          },
          { id: 34, label: "Sail", value: "Sail" },
          { id: 35, label: "Sacramento", value: "Sacramento" },
          { id: 36, label: "Marck Script", value: "Marck Script" },
          { id: 37, label: "Sonsie One", value: "Sonsie One" },
          {
            id: 38,
            label: "Monsieur La Doulaise",
            value: "Monsieur La Doulaise",
          },
          { id: 39, label: "Rock Salt", value: "Rock Salt" },
          { id: 40, label: "Rochester", value: "Rochester" },
          { id: 41, label: "Rancho", value: "Rancho" },
          { id: 42, label: "Croissant One", value: "Croissant One" },
          { id: 43, label: "Yesteryear", value: "Yesteryear" },
          { id: 44, label: "Courgette", value: "Courgette" },
          { id: 45, label: "Sofia", value: "Sofia" },
          { id: 46, label: "Allura", value: "Allura" },
          { id: 47, label: "Redressed", value: "Redressed" },
          { id: 48, label: "Cookie", value: "Cookie" },
          { id: 49, label: "Amita", value: "Amita" },
          { id: 50, label: "Meie Script", value: "Meie Script" },
          {
            id: 51,
            label: "Euphoria Script",
            value: "Euphoria Script",
          },
          { id: 52, label: "Tangerine", value: "Tangerine" },
          { id: 53, label: "Sevillana", value: "Sevillana" },
        ],
        fontSizeList: [
          { id: 1, label: "Small", value: "12px" }, // 12px
          { id: 2, label: "Normal", value: "18px" }, // 18px
          { id: 3, label: "Large", value: "24px" }, // 24px
          { id: 4, label: "Huge", value: "30px" }, // 30px
        ],
      },
      activeDragIndex: -1,
      activeResizeIndex: -1,
    };
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
      return this.$store.getters["getTemplateList"];
    },
    draggableContent() {
      return this.content.filter((item) => item.type != "image");
    },
    resizableContent() {
      return this.content.filter((item) => item.type == "image");
    },
  },
  methods: {
    setActiveIndex(index) {
      this.activeIndex = index;
    },
    changeContent(e) {
      if (e.keyCode === 13) {
        this.activeIndex = -1;
      }
    },
    addDynamicText(id) {
      const sameTextCount = this.getSameDynamicTextCount(id);
      const content = this.dynamicTextList.filter(
        (text) => text.field_id == id
      )[0]["field_code"];

      if (content == "{staff_name}" && sameTextCount == 5)
        return this.$vs.notify({
          title: "Error",
          text: "You can select a maximum of 5 Staff Name",
          color: "danger",
          iconPack: "feather",
          icon: "icon-alert-circle",
        });

      this.content.push({
        id: id,
        type: "dynamic-text",
        style: {
          fontSize: "18px",
          width: "max-content",
          fontFamily: "Sora",
        },
        content: content + (sameTextCount ? sameTextCount : ""),
        x: 100,
        y: 100,
      });
    },
    getSameDynamicTextCount(id) {
      let count = 0;

      this.content.map((item) => {
        if (item.id == id) count++;
      });
      return count;
    },
    addStaticText(text) {
      this.content.push({
        type: "static-text",
        style: {
          fontSize: "18px",
          width: "max-content",
          fontFamily: "Sora",
        },
        content: text,
        x: 300,
        y: 300,
      });
    },
    removeStaticText(text) {
      const index = this.content.findIndex((item) => item.content == text);
      this.content.splice(index, 1);
    },
    dragItem(index) {
      this.activeDragIndex = index;
      this.dragOption.fontSize = this.getFontSizeOption(
        this.content[index].style.fontSize
      );
      this.dragOption.fontFamily = this.getFontFamilyOption(
        this.content[index].style.fontFamily
      );
      this.dragOption.color = this.content[index].style.color
        ? this.content[index].style.color
        : "#000000";
    },
    resizeItem(index) {
      this.activeResizeIndex = index;
    },
    endDrag() {
      this.activeDragIndex = -1;
    },
    endResize() {
      this.activeResizeIndex = -1;
    },
    getFontSizeOption(size) {
      switch (size) {
        case "12px":
          return { id: 1, label: "Small", value: "12px" };
        case "18px":
          return { id: 2, label: "Normal", value: "18px" };
        case "24px":
          return { id: 3, label: "Large", value: "24px" };
        case "30px":
          return { id: 4, label: "Huge", value: "30px" };
        default:
          return { id: 2, label: "Normal", value: "18px" };
      }
    },
    getFontFamilyOption(family) {
      switch (family) {
        // TOP 20 Best Fonts
        case "Sora":
          return { id: 1, label: "Sora", value: "Sora" };
        case "Hahmlet":
          return { id: 2, label: "Hahmlet", value: "Hahmlet" };
        case "JetBrains Mono":
          return { id: 3, label: "JetBrains Mono", value: "JetBrains Mono" };
        case "Andada Pro":
          return { id: 4, label: "Andada Pro", value: "Andada Pro" };
        case "Epilogue":
          return { id: 5, label: "Epilogue", value: "Epilogue" };
        case "Inter":
          return { id: 6, label: "Inter", value: "Inter" };
        case "Encode Sans":
          return { id: 7, label: "Encode Sans", value: "Encode Sans" };
        case "Manrope":
          return { id: 8, label: "Manrope", value: "Manrope" };
        case "Lora":
          return { id: 9, label: "Lora", value: "Lora" };
        case "BioRhyme":
          return { id: 10, label: "BioRhyme", value: "BioRhyme" };
        case "Playfair Display":
          return {
            id: 11,
            label: "Playfair Display",
            value: "Playfair Display",
          };
        case "Archivo":
          return { id: 12, label: "Archivo", value: "Archivo" };
        case "Roboto":
          return { id: 13, label: "Roboto", value: "Roboto" };
        case "Cormorant":
          return { id: 14, label: "Cormorant", value: "Cormorant" };
        case "Spectral":
          return { id: 15, label: "Spectral", value: "Spectral" };
        case "Raleway":
          return { id: 16, label: "Raleway", value: "Raleway" };
        case "Work Sans":
          return { id: 17, label: "Work Sans", value: "Work Sans" };
        case "Lato":
          return { id: 18, label: "Lato", value: "Lato" };
        case "Anton":
          return { id: 19, label: "Anton", value: "Anton" };
        case "Old Standard TT":
          return { id: 20, label: "Old Standard TT", value: "Old Standard TT" };
        case "Oswald":
          return { id: 21, label: "Oswald", value: "Oswald" };
        case "Montserrat":
          return { id: 22, label: "Montserrat", value: "Montserrat" };
        case "Poppins":
          return { id: 23, label: "Poppins", value: "Poppins" };
        case "Nunito":
          return { id: 24, label: "Nunito", value: "Nunito" };
        case "Source Sans Pro":
          return { id: 25, label: "Source Sans Pro", value: "Source Sans Pro" };
        case "Oxygen":
          return { id: 26, label: "Oxygen", value: "Oxygen" };
        case "Open Sans":
          return { id: 27, label: "Open Sans", value: "Open Sans" };
        // 26 Best Cursive Fonts
        case "Arizonia":
          return { id: 28, label: "Arizonia", value: "Arizonia" };
        case "Lobster":
          return { id: 29, label: "Lobster", value: "Lobster" };
        case "Rouge Script":
          return { id: 30, label: "Rouge Script", value: "Rouge Script" };
        case "Pacifico":
          return { id: 31, label: "Pacifico", value: "Pacifico" };
        case "Alex Brush":
          return { id: 32, label: "Alex Brush", value: "Alex Brush" };
        case "Kaushan Script":
          return { id: 33, label: "Kaushan Script", value: "Kaushan Script" };
        case "Sail":
          return { id: 34, label: "Sail", value: "Sail" };
        case "Sacramento":
          return { id: 35, label: "Sacramento", value: "Sacramento" };
        case "Marck Script":
          return { id: 36, label: "Marck Script", value: "Marck Script" };
        case "Sonsie One":
          return { id: 37, label: "Sonsie One", value: "Sonsie One" };
        case "Monsieur La Doulaise":
          return {
            id: 38,
            label: "Monsieur La Doulaise",
            value: "Monsieur La Doulaise",
          };
        case "Rock Salt":
          return { id: 39, label: "Rock Salt", value: "Rock Salt" };
        case "Rochester":
          return { id: 40, label: "Rochester", value: "Rochester" };
        case "Rancho":
          return { id: 41, label: "Rancho", value: "Rancho" };
        case "Croissant One":
          return { id: 42, label: "Croissant One", value: "Croissant One" };
        case "Yesteryear":
          return { id: 43, label: "Yesteryear", value: "Yesteryear" };
        case "Courgette":
          return { id: 44, label: "Courgette", value: "Courgette" };
        case "Sofia":
          return { id: 45, label: "Sofia", value: "Sofia" };
        case "Allura":
          return { id: 46, label: "Allura", value: "Allura" };
        case "Redressed":
          return { id: 47, label: "Redressed", value: "Redressed" };
        case "Cookie":
          return { id: 48, label: "Cookie", value: "Cookie" };
        case "Amita":
          return { id: 49, label: "Amita", value: "Amita" };
        case "Meie Script":
          return { id: 50, label: "Meie Script", value: "Meie Script" };
        case "Euphoria Script":
          return { id: 51, label: "Euphoria Script", value: "Euphoria Script" };
        case "Tangerine":
          return { id: 52, label: "Tangerine", value: "Tangerine" };
        case "Sevillana":
          return { id: 53, label: "Sevillana", value: "Sevillana" };
        default:
          return { id: 1, label: "Sora", value: "Sora" };
      }
    },
    changeFontSize() {
      if (this.activeDragIndex != -1) {
        this.content[this.activeDragIndex].style.fontSize =
          this.dragOption.fontSize.value;
      }
    },
    changeFontFamily() {
      if (this.activeDragIndex != -1) {
        this.content[this.activeDragIndex].style.fontFamily =
          this.dragOption.fontFamily.value;
      }
    },
    changeColor() {
      if (this.activeDragIndex != -1) {
        this.content[this.activeDragIndex].style.color = this.dragOption.color;
      }
    },
    toggleUnderline() {
      if (this.activeDragIndex != -1) {
        const value = this.content[this.activeDragIndex].style.textDecoration;
        this.content[this.activeDragIndex].style = {
          ...this.content[this.activeDragIndex].style,
          textDecoration: value && value == "underline" ? "unset" : "underline",
        };
      }
    },
    toggleBold() {
      if (this.activeDragIndex != -1) {
        const value = this.content[this.activeDragIndex].style.fontWeight;
        this.content[this.activeDragIndex].style = {
          ...this.content[this.activeDragIndex].style,
          fontWeight: value && value == "bold" ? "normal" : "bold",
        };
      }
    },
    handleAlignCenter() {
      if (this.activeDragIndex != -1) {
        const elementWidth =
          this.$refs[`dragItem${this.activeDragIndex}`][0].offsetWidth;

        this.content = [
          ...this.content.map((item, index) =>
            index === this.activeDragIndex
              ? {
                  ...item,
                  x: this.width / 2 - elementWidth / 2,
                  style: {
                    ...item.style,
                    left: "50%",
                    transform: "translateX(-50%)",
                  },
                }
              : item
          ),
        ];
      }
    },
    onDragMove(item, { x, y }) {
      const index = this.content.findIndex(
        (data) =>
          data.type == item.type &&
          data.style.backgroundImage == item.style.backgroundImage &&
          data.content == item.content
      );
      this.content[index].x = Math.floor(x);
      this.content[index].y = Math.floor(y);
      this.content[index].style.left = Math.floor(x) + "px";
      this.content[index].style.top = Math.floor(y) + "px";
    },
    onResize(item, { width, height }) {
      const index = this.content.findIndex(
        (data) =>
          data.type == item.type &&
          data.style.backgroundImage == item.style.backgroundImage
      );
      this.content[index].style.width = width + "px";
      this.content[index].style.height = height + "px";
    },
    setContent(content) {
      this.content = content;
    },
    togglePhoto() {
      this.$refs.uploadImageModal.toggleModal();
    },
    setEditorImage(image) {
      this.content.push({
        type: "image",
        style: {
          fontSize: "18px",
          width: "50px",
          height: "50px",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
        },
        content: "",
        x: 100,
        y: 100,
      });
    },
  },
  watch: {
    templateList(newVal) {
      if (newVal && newVal.length) {
        this.mainContent = newVal[this.template].content;
      }
    },
    mainContent(newVal) {
      this.$emit("changeMainContent", newVal);
    },
  },
  mounted() {
    document.addEventListener("keyup", (e) => {
      if (e.key === "Delete") {
        if (this.activeDragIndex == -1) return;

        const textInfo = this.content[this.activeDragIndex];

        if (textInfo.type == "static-text") {
          this.$emit("removeStaticText", textInfo.content);
        } else {
          this.content = this.content.filter((item) => item.id != textInfo.id);
        }
      }
    });
  },
};
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
  border: 1px solid rgb(66, 66, 150) !important;
  border-radius: 4px;
}

.resizable.activeDragItem {
  padding: 0;
}

.draggable .drag-item {
  position: relative;
}

.draggable .drag-item .material-icons {
  position: absolute;
  top: -35px;
  left: 95%;
}

.input-text {
  border: none;
  background: center;
}
</style>
