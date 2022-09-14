<template>
  <div :class="`template-section template-section-${type ? type : ''}`">
    <img :src="template && template.certificate_image_details && template.certificate_image_details.file.file_path"
      alt="template image" width="100%" height="100%">
    <div class="template-content-section flex" v-for="(item, index) in content" :key="index" :style="{
      ...item.style,
      fontSize: `${Number(item.style.fontSize.slice(0, item.style.fontSize.length - 2)) * rate.y}px`,
      left: `${item.x * rate.x}px`,
      top: `${item.y * rate.y}px`,
    }">
      <p v-html="item.content"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TemplateSection",
  props: {
    type: {
      required: false
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    template: {
      type: Object,
      required: false
    },
    content: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      innerWidth: 0,
      innerHeight: 0,
      rate: { x: 1, y: 1 }
    }
  },
  mounted() {
    this.setInnerBoxParams()
  },
  methods: {
    setInnerBoxParams() {
      const box = document.querySelector(`.template-section-${this.type ? this.type : ''}`)
      this.innerWidth = box.offsetWidth ? box.offsetWidth : this.width
      this.innerHeight = box.offsetHeight ? box.offsetHeight : this.height
      this.rate.x = this.innerWidth / this.width
      this.rate.y = this.innerHeight / this.height
    }
  },
  watch: {
    width() {
      this.setInnerBoxParams()
    },
    height() {
      this.setInnerBoxParams()
    }
  }
}
</script>

<style lang="scss" scoped>
.template-section {
  position: relative;

  .template-content-section {
    position: absolute;
  }
}
</style>
