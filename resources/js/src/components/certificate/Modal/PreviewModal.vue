<template>
  <div>
    <vs-prompt
      @accept="acceptAlert"
      @close="close"
      buttonAccept="false"
      buttonCancel="false"
      :active="activePrompt"
      title="Preview"
      class="flex"
    >
      <div class="flex">
        <vs-button class="ml-auto mr-2 primary" type="flat">Edit</vs-button>
        <vs-button @click="handleDownload" class="primary" type="flat">
          <i class="material-icons ml-3"> file_download </i>
          <span> Download Certificates </span>
        </vs-button>
      </div>
      <div class="con-exemple-prompt">
        <div class="modal-preview-section mt-5">
          <div class="flex template-pos flex-col">
            <div class="carousel-certificates">
              <swiper
                :options="swiperOption"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                :key="$vs.rtl"
                ref="mySwiper"
                @slide-change="changeSwiperIndex"
              >
                <swiper-slide v-for="item in selectedStudent" :key="item.id">
                  <TemplateSection
                    :style="{
                      width: `478px`,
                      height: `334px`,
                    }"
                    :width="width"
                    :height="height"
                    :image="image"
                    :content="getMappedContent(item)"
                    :type="item.id"
                  />
                </swiper-slide>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
              </swiper>
            </div>
            <span>{{ this.count }}/{{ selectedStudent.length }}</span>
          </div>
        </div>
        <!-- Footer -->
        <div class="flex mt-1 justify-between">
          <vs-button
            color="dark"
            class="mr-2 primary"
            type="flat"
            @click="close"
            >Cancel</vs-button
          >
          <div class="flex">
            <vs-button class="mr-2 primary" type="flat">Save</vs-button>
            <vs-button @click="handleSend">Send Certificates</vs-button>
            <!-- <send-modal /> -->
          </div>
        </div>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import SendModal from "./SendModal.vue";
import TemplateSection from "../editor/TemplateSection.vue";

import "swiper/dist/css/swiper.min.css";

export default {
  props: {
    activePrompt: Boolean,
    selectedStudent: {
      type: Array,
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
    content: {
      type: Array,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    mappingData: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          type: "progressbar",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        onSlideChangeEnd: function () {},
      },
      vueCanvas: null,
      count: 1,
    };
  },
  components: {
    swiper,
    swiperSlide,
    SendModal,
    TemplateSection,
  },
  computed: {
    templateList: function () {
      return this.$store.getters["getTemplateList"];
    },
    templateListMetaData: function () {
      return this.$store.getters["getTemplateListMetaData"];
    },
    validName() {
      return (
        this.valMultipe.value1.length > 0 && this.valMultipe.value2.length > 0
      );
    },
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  methods: {
    acceptAlert() {
      this.$vs.notify({
        color: "success",
        title: "Accept Selected",
        text: "Lorem ipsum dolor sit amet, consectetur",
      });
    },
    clearValMultiple() {
      this.valMultipe.value1 = "";
      this.valMultipe.value2 = "";
    },
    close() {
      this.$vs.notify({
        color: "danger",
        title: "Closed",
        text: "You close a dialog!",
      });
      this.$emit("cancel");
    },
    handleOpen() {
      this.activePrompt = true;
    },
    handleSend() {
      this.$emit("send");
    },
    handleDownload() {
      this.$emit("download");
    },
    changeSwiperIndex() {
      this.count = this.$refs.mySwiper.swiper.activeIndex + 1;
    },
    getMappedContent(student) {
      const content = [];

      for (let item of this.content) {
        if (item.content == "{student_name}") {
          content.push({
            ...item,
            content: student.first_name + " " + student.last_name,
          });

          continue;
        }

        const index = this.mappingData.findIndex(
          (mapping) => mapping.id == item.id && mapping.content == item.content
        );

        if (index != -1)
          content.push({
            ...item,
            content: this.mappingData[index].name,
          });
        else content.push({ ...item });
      }

      return content;
    },
  },
};
</script>

<style>
.carousel-certificates {
  position: relative;
  width: 478px;
  height: 334px;
}

.swiper-button-next {
  position: absolute;
  right: 0;
}

.swiper-button-prev {
  position: absolute;
  left: 0;
}

.vs-dialog {
  max-width: 720px !important;
}

.modal-preview-section {
  width: 100%;
  height: 454px;
  background-color: #f6f6f6;
}

.template-pos {
  height: 100%;
  align-items: center;
  justify-content: center;
}

.vs-dialog footer {
  display: none !important;
}

.vs-dialog-cancel {
  color: #6e6b7b;
  transform: translate(0, 0) !important;
  box-shadow: none !important;
}

.vs-dialog-cancel:hover {
  box-shadow: 0 5px 20px 0 rgb(0 0 0 / 10%) !important;
}
</style>
