<template>
  <div>
    <vs-button @click="activePrompt = true">Send Certificates</vs-button>

    <vs-prompt @cancel="val = ''" @accept="acceptAlert" buttonAccept="false" buttonCancel="false"
      :active.sync="activePrompt" title="Download Certificates" class="flex">
      <div class="con-exemple-prompt">
        <span class="mb-1">Search Student</span>
        <vs-input icon-pack="feather" icon="icon-search" v-model="val" class="w-full mb-3" />
        <!-- Students -->
        <ul class="centerx">
          <li class="mb-4">
            <vs-checkbox v-model="selectBox">Select All</vs-checkbox>
          </li>
          <li class="flex mb-4">
            <vs-checkbox v-model="checkBox1"></vs-checkbox>
            <img class="rounded-circle" src="/images/avatar-s-1.jpg" alt="avatar1.jpg">
            <span class="ml-2 my-auto">John Smith</span>
          </li>
          <li class="flex mb-4">
            <vs-checkbox v-model="checkBox2"></vs-checkbox>
            <img class="rounded-circle" src="/images/avatar-s-15.jpg" alt="avatar1.jpg">
            <span class="ml-2 my-auto">Bernard</span>
          </li>
          <li class="flex mb-4">
            <vs-checkbox v-model="checkBox3"></vs-checkbox>
            <img class="rounded-circle" src="/images/avatar-s-18.jpg" alt="avatar1.jpg">
            <span class="ml-2 my-auto">Catherine</span>
          </li>
          <li class="flex mb-4">
            <vs-checkbox v-model="checkBox4"></vs-checkbox>
            <img class="rounded-circle" src="/images/avatar-s-8.jpg" alt="avatar1.jpg">
            <span class="ml-2 my-auto">John Smith</span>
          </li>
          <li class="flex mb-4">
            <vs-checkbox v-model="checkBox4"></vs-checkbox>
            <img class="rounded-circle" src="/images/avatar-s-12.jpg" alt="avatar1.jpg">
            <span class="ml-2 my-auto">John Doe</span>
          </li>
          <li class="flex mb-4">
            <vs-checkbox v-model="checkBox4"></vs-checkbox>
            <img class="rounded-circle" src="/images/avatar-s-3.jpg" alt="avatar1.jpg">
            <span class="ml-2 my-auto">John Doe</span>
          </li>
          <li class="flex mb-4">
            <vs-checkbox v-model="checkBox4"></vs-checkbox>
            <img class="rounded-circle" src="/images/avatar-s-4.jpg" alt="avatar1.jpg">
            <span class="ml-2 my-auto">John doe</span>
          </li>
        </ul>
        <!-- Footer -->
        <div class="flex mt-3 justify-between">
          <vs-button color="dark" class="mr-2 primary" type="flat">Cancel</vs-button>
          <div>
            <vs-button class="mr-2 primary" type="flat">Preview</vs-button>
            <vs-button>Download Certificates</vs-button>
          </div>
        </div>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activePrompt: false,
      val: '',
      valMultipe: {
        value1: '',
        value2: ''
      },
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
    clearValMultiple() {
      this.valMultipe.value1 = ""
      this.valMultipe.value2 = ""
    }
  }
}
</script>

<style>
.vs-dialog {
  max-width: 540px !important;
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
