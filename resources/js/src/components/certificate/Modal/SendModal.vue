<template>
  <div>
    <vs-prompt @close="close" @accept="acceptAlert" buttonAccept="false" buttonCancel="false" :active="activePrompt"
      title="Send Certificates" class="flex">
      <div class="con-exemple-prompt">
        <div class="flex award-section my-12">
          <ul class="centerx">
            <li class="radio-border">
              <vs-radio v-model="award_radio" vs-value="radio1">Award Now</vs-radio>
            </li>
            <li class="radio-border">
              <vs-radio v-model="award_radio" vs-value="radio2">Award Certificates on Course Completion
              </vs-radio>
            </li>
            <li class="radio-border">
              <vs-radio v-model="award_radio" vs-value="radio3">Set Date</vs-radio>
            </li>
          </ul>
        </div>
        <!-- Footer -->
        <div class="flex mt-3 justify-between">
          <vs-button color="dark" class="mr-2 primary" type="flat" @click="close">Cancel</vs-button>
          <div>
            <vs-button class="mr-2 primary" type="flat">Save</vs-button>
            <vs-button>Award Certificates</vs-button>
          </div>
        </div>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
export default {
  props: {
    activePrompt: Boolean,
  },
  data() {
    return {
      award_radio: 'radio1',
    }
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
    close() {
      this.$vs.notify({
        color: 'danger',
        title: 'Closed',
        text: 'You close a dialog!'
      })
      this.$emit('cancel')
    },
    clearValMultiple() {
      this.valMultipe.value1 = ""
      this.valMultipe.value2 = ""
    }
  }
}
</script>

<style>
.vs-dialog {
  max-width: 720px !important;
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

.con-vs-radio {
  padding: 16px;
  align-items: center;

}

.award-section {
  align-items: center;
  justify-content: center;
}

.radio-border {
  display: flex;
  border: 1px solid #DFDFE1;
  border-radius: 4px;
  margin-bottom: 16px;
}
</style>
