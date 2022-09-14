<template>
  <div>
    <vs-prompt @accept="acceptAlert" @close="close" buttonAccept="false" buttonCancel="false" :active="activePrompt"
      title="Preview" class="flex">
      <div class="flex">
        <vs-button class="ml-auto mr-2 primary" type="flat">Edit</vs-button>
        <vs-button @click="handleDownload" class="primary" type="flat">
          <span>
            Download Certificates
          </span>
        </vs-button>
      </div>
      <div class="con-exemple-prompt">
        <div class="modal-preview-section mt-5">
          <div class="flex template-pos flex-col">
            <!-- Carousel Certificates -->
            <div class="carousel-certificates">
              <swiper :options="swiperOption" :dir="$vs.rtl ? 'rtl' : 'ltr'" :key="$vs.rtl" ref="mySwiper"
                @slide-change="changeSwiperIndex">
                <swiper-slide v-for="(template, index) in templateList" :key="index" @click="selectTemplate(index)">
                  <TemplateSection :type="index" :style="{ width: `478px`, height: `334px`}" :template="template"
                    :width="width" :height="height" :content="JSON.parse(template.content)" />
                </swiper-slide>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
              </swiper>
            </div>
            <span>{{ this.count }}/{{ templateListMetaData.total }}</span>
          </div>
        </div>
        <!-- Footer -->
        <div class="flex mt-1 justify-between">
          <vs-button color="dark" class="mr-2 primary" type="flat" @click="close">Cancel</vs-button>
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
import 'swiper/dist/css/swiper.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import SendModal from './SendModal.vue'
import TemplateSection from '../editor/TemplateSection.vue'

export default {
  props: {
    activePrompt: Boolean,
  },
  data() {
    return {
      width: 478,
      height: 334,
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        onSlideChangeEnd: function () {
          this.onSwipe()
        }
      },
      vueCanvas: null,
      count: 1,
      swiper: null
    }
  },
  components: {
    swiper,
    swiperSlide,
    SendModal,
    TemplateSection
  },
  computed: {
    templateList: function () {
      return this.$store.getters['getTemplateList']
    },
    templateListMetaData: function () {
      return this.$store.getters['getTemplateListMetaData']
    },
    validName() {
      return (this.valMultipe.value1.length > 0 && this.valMultipe.value2.length > 0)
    },
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted() {
    this.swiper.on('slideChange', () => {
      this.onSwipe(this)
    })
  },
  methods: {
    acceptAlert() {
      this.$vs.notify({
        color: 'success',
        title: 'Accept Selected',
        text: 'Lorem ipsum dolor sit amet, consectetur'
      })
    },
    clearValMultiple() {
      this.valMultipe.value1 = ""
      this.valMultipe.value2 = ""
    },
    close() {
      this.$vs.notify({
        color: 'danger',
        title: 'Closed',
        text: 'You close a dialog!'
      })
      this.$emit('cancel')
    },
    handleOpen() {
      // this.$emit('close')
      console.error('this. active prmot')
      this.activePrompt = true
    },
    handleSend() {
      this.$emit('send')
    },
    handleDownload() {
      this.$emit('download')
    },
    changeSwiperIndex() {
      this.count = this.$refs.mySwiper.swiper.activeIndex + 1
    }
  }
}
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
  background-color: #F6F6F6;
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
  color: #6E6B7B;
  transform: translate(0, 0) !important;
  box-shadow: none !important;
}

.vs-dialog-cancel:hover {
  box-shadow: 0 5px 20px 0 rgb(0 0 0 / 10%) !important;
}
</style>
