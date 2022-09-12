<template>
  <div>
    <vs-prompt @accept="acceptAlert" @close="close" buttonAccept="false" buttonCancel="false" :active="activePrompt"
      title="Preview" class="flex">
      <vs-button class="ml-auto mr-5 primary" type="flat">Edit</vs-button>
      <vs-button class="ml-auto primary" type="flat">Download Certificates</vs-button>
      <div class="con-exemple-prompt">
        <div class="modal-preview-section mt-5">
          <div class="flex template-pos">
            <img src="https://scoolio-files.s3.ap-south-1.amazonaws.com/platform_certificate_images/certificate3.jpg"
              width="478" height="334" alt="">
          </div>
        </div>
        <!-- Footer -->
        <div class="flex mt-3 justify-between">
          <vs-button color="dark" class="mr-2 primary" type="flat" @click="close">Cancel</vs-button>
          <div class="flex">
            <vs-button class="mr-2 primary" type="flat">Save</vs-button>
            <vs-button @click="$emit('send')">Send Certificates</vs-button>
            <!-- <send-modal /> -->
          </div>
        </div>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
import SendModal from './SendModal.vue'

export default {
  props: {
    activePrompt: Boolean,
  },
  data() {
    return {

    }
  },
  components: {
    SendModal
  },
  computed: {
    validName() {
      return (this.valMultipe.value1.length > 0 && this.valMultipe.value2.length > 0)
    }
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
    }
  }
}
</script>

<style>
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
