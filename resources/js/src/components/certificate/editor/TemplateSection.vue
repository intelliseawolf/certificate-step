<template>
  <div class="template-section">
    <img
      :src="template && template.certificate_image_details && template.certificate_image_details.file.file_path"
      alt="template image"
      width="100%"
      height="100%"
    >
    <div
      class="template-content-section flex"
      v-for="(item, index) in content"
      :key="index"
      :style="{
        ...item.style,
        left: `${item.x}px`,
        top: `${item.y}px`,
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
      innerHeight: 0
    }
  },
  mounted() {
    this.setInnerBoxParams()
  },
  methods: {
    setInnerBoxParams() {
      const box = document.querySelector('.template-section');
      this.innerWidth = box.offsetWidth ? box.offsetWidth : this.width;
      this.innerHeight = box.offsetHeight ? box.offsetHeight : this.height;
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
