<template>
  <div>
    <vs-prompt @close="close" @accept="acceptAlert" buttonAccept="false" buttonCancel="false" :active="activePrompt"
      title="">
      <h3 class="text-center mb-4">Save Certificate Template</h3>
      <div class="con-exemple-prompt">
        <span class="mb-1">Certificate Name</span>
        <vs-input placeholder="Batch 14' S.Y.19-20" vs-placeholder="Batch 14' S.Y.19-20" v-model="form.title"
          class="w-full mb-3" />
        <!-- <slot></slot> -->
        <vs-button class="menu-button" color="primary" type="border" icon-pack="feather" icon="icon-plus-circle"
          @click="handleShow" v-if="!showDescription">
          Add Description
        </vs-button>
        <span class="mb-1" v-if="showDescription">Description</span>
        <vs-textarea v-model="form.description" v-if="showDescription" placeholder="Lorem Ipsum" rows="4" />

        <div class="flex">
          <vs-button class="ml-auto primary" type="flat" @click="handleGenerate">Generate Certificate Now
          </vs-button>
        </div>
        <div class="flex mt-3">
          <vs-button class="ml-auto" @click="saveCertificate">Save Certificate</vs-button>
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
  props: {
    activePrompt: Boolean,
  },
  components: { GenerateModal, PreviewModal, SendModal },
  data() {
    return {
      modal: null,
      showDescription: false,
      form: {
        title: "",
        description: ""
      },
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
    close() {
      this.$vs.notify({
        color: 'danger',
        title: 'Closed',
        text: 'You close a dialog!'
      })
      this.$emit('cancel')
      this.showDescription = false
      this.textarea = ''
    },
    saveCertificate() {
      this.$emit("saveCertificate", this.form)
    },
    handleGenerate() {
      this.$emit('generate')
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
