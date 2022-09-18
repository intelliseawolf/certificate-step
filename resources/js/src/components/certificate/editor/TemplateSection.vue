<template>
  <div :class="`template-section template-section-${type ? type : ''}`">
    <img
      :src="image && image.file && image.file.file_path"
      alt="template image"
      width="100%"
      height="100%"
    />
    <div
      :class="`template-content-section flex index-${index}`"
      v-for="(item, index) in content"
      :key="index"
      :style="{
        ...item.style,
        fontSize: getStyleValue(item.style.fontSize, rate.x),
        width: `${
          item.style.width ? getStyleValue(item.style.width, rate.x) : 'auto'
        }`,
        height: `${
          item.style.height ? getStyleValue(item.style.height, rate.y) : 'auto'
        }`,
        top: `${item.style.top ? getStyleValue(item.style.top, rate.y) : 0}`,
        left: `${item.style.left ? getStyleValue(item.style.left, rate.x) : 0}`,
      }"
    >
      <p v-html="item.content"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TemplateSection",
  props: {
    type: {
      required: false,
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
      required: false,
    },
    content: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      innerWidth: 0,
      innerHeight: 0,
      rate: { x: 1, y: 1 },
    };
  },
  mounted() {
    this.setInnerBoxParams();
  },
  methods: {
    setInnerBoxParams() {
      const box = document.querySelector(
        `.template-section-${this.type ? this.type : ""}`
      );
      this.innerWidth = box.offsetWidth ? box.offsetWidth : this.width;
      this.innerHeight = box.offsetHeight ? box.offsetHeight : this.height;
      this.rate.x = this.innerWidth / this.width;
      this.rate.y = this.innerHeight / this.height;
    },
    extractNumber(text) {
      const reg = new RegExp(/\d+/);

      return reg.exec(text);
    },
    extractString(text) {
      const reg = new RegExp(/\D+/);

      return reg.exec(text);
    },
    getStyleValue(value, rate) {
      return this.extractString(value) == "%"
        ? this.extractNumber(value) + this.extractString(value)
        : this.extractNumber(value) * rate + this.extractString(value);
    },
  },
  watch: {
    width() {
      this.setInnerBoxParams();
    },
    height() {
      this.setInnerBoxParams();
    },
  },
};
</script>

<style lang="scss" scoped>
.template-section {
  position: relative;

  .template-content-section {
    position: absolute;
  }
}
</style>
