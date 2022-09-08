<template>
  <div>
    <vs-button class="mr-2 primary" type="flat" @click="activePrompt = true">Save</vs-button>

    <vs-prompt @cancel="val = ''" @accept="acceptAlert" buttonAccept="false" buttonCancel="false"
      :active.sync="activePrompt" title="" @close="close">
      <h3 class="text-center mb-4">Save Certificate Template</h3>
      <div class="con-exemple-prompt">
        <span class="mb-1">Certificate Name</span>
        <vs-input placeholder="Batch 14' S.Y.19-20" vs-placeholder="Batch 14' S.Y.19-20" v-model="val"
          class="w-full mb-3" />
        <!-- <slot></slot> -->
        <vs-button class="menu-button" color="primary" type="border" icon-pack="feather" icon="icon-plus-circle"
          @click="handleShow" v-if="!showDescription">
          Add Description
        </vs-button>
        <span class="mb-1" v-if="showDescription">Description</span>
        <vs-textarea v-model="textarea" v-if="showDescription" placeholder="Lorem Ipsum" height="115px" />

        <div class="flex">
          <vs-button class="ml-auto primary" type="flat" @click="changeModal('generate')">Generate Certificate Now
          </vs-button>
          <generate-modal :activePrompt="modal === 'generate'" @preview="changeModal('preview')" />
          <preview-modal :activePrompt="modal === 'preview'" @send="changeModal('send')" />
          <send-modal :activePrompt="modal === 'send'" />
        </div>
        <div class="flex mt-3">
          <vs-button class="ml-auto">Save Certificate</vs-button>
        </div>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
import GenerateModal from './GenerateModal.vue'
import PreviewModal from './PreviewModal.vue'
import SendModal from './SendModal.vue'

export default {
  components: { GenerateModal, PreviewModal, SendModal },
  data() {
    return {
      modal: null,
      showDescription: false,
      activePrompt: false,
      val: '',
      valMultipe: {
        value1: '',
        value2: ''
      },
      textarea: '',
    }
  },
  computed: {
    validName() {
      return (this.valMultipe.value1.length > 0 && this.valMultipe.value2.length > 0)
    }
  },
  methods: {
    changeModal(name) {
      this.modal = name
    },
    handleShow() {
      this.showDescription = true
    },
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
      this.showDescription = false
      this.textarea = ''
    }
  }
}
</script>

<style>
.vs-dialog {
  max-width: 570px !important;
}

.vs-dialog footer {
  display: none !important;
}

.con-vs-dialog .vs-dialog header {
  background: none;
  height: 48px;
}

.vs-dialog-cancel {
  color: #6E6B7B;
  transform: translate(0, 0) !important;
  box-shadow: none !important;
}

.vs-dialog-cancel:hover {
  box-shadow: 0 5px 20px 0 rgb(0 0 0 / 10%) !important;
}

.menu-button {
  width: 100%;
  justify-content: left;
  padding: 8px 16px 8px 16px !important;
  font-size: 16px !important;
  margin-top: 16px;
  margin-bottom: 30px;
}
</style>
