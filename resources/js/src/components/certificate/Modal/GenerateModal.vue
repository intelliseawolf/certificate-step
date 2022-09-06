<template>
  <div>
    <vs-prompt @cancel="val = ''" @accept="acceptAlert" @close="close" buttonAccept="false" buttonCancel="false"
      :active.sync="activePrompt" title="Genrate Certificate">
      <div class="con-exemple-prompt">
        <!-- Body -->
        <span class="mb-1">Certificate Name</span>
        <vs-input placeholder="Batch 14' S.Y.19-20" vs-placeholder="Batch 14' S.Y.19-20" v-model="val"
          class="w-full mb-3" />
        <!-- SLOT -->
        <!-- <slot></slot> -->
        <vs-button class="menu-button" color="primary" type="border" icon-pack="feather" icon="icon-plus-circle"
          @click="handleShow" v-if="!showDescription">
          Add Description
        </vs-button>
        <span class="mb-1" v-if="showDescription">Description</span>
        <vs-textarea v-model="textarea" v-if="showDescription" placeholder="Lorem Ipsum" height="115px" />

        <div class="flex justify-between">
          <span>Select Course / Class</span>
          <a href="/certificate/generate" class="ml-auto">Upload CSV</a>
        </div>
        <v-select v-model="classes_list" :options="classes" :dir="$vs.rtl ? 'rtl' : 'ltr'" /><br>
        <!-- Student & Stuff Tabs -->
        <div class="mt-1">
          <vs-tabs alignment="fixed">
            <vs-tab label="Student">
              <div>
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
                    <span class="ml-2 my-auto">Anna</span>
                  </li>
                </ul>
              </div>
            </vs-tab>
            <vs-tab label="Stuff">
              <div>
                <ul class="centerx">
                  <li class="mb-4">
                    <vs-checkbox v-model="selectBox">Select All</vs-checkbox>
                  </li>
                  <li class="flex mb-4">
                    <vs-checkbox v-model="checkBox1"></vs-checkbox>
                    <img class="rounded-circle" src="/images/avatar-s-1.jpg" alt="avatar1.jpg">
                    <span class="ml-2 my-auto">John Smith</span>
                    <v-select class="ml-auto" v-model="stuff_list" :options="stuff" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                    <!-- <img class="ml-auto" src="/images/stuff_icon.png" width="27" height="24" alt="stuff_icon"> -->
                  </li>
                  <li class="flex mb-4">
                    <div class="flex">
                      <vs-checkbox v-model="checkBox2"></vs-checkbox>
                      <img class="rounded-circle" src="/images/avatar-s-15.jpg" alt="avatar1.jpg">
                      <span class="ml-2 my-auto">Bernard</span>
                    </div>
                    <v-select class="ml-auto" v-model="stuff_list" :options="stuff" :dir="$vs.rtl ? 'rtl' : 'ltr'"
                      disabled />
                  </li>
                  <li class="flex mb-4">
                    <div class="flex">
                      <vs-checkbox v-model="checkBox3"></vs-checkbox>
                      <img class="rounded-circle" src="/images/avatar-s-18.jpg" alt="avatar1.jpg">
                      <span class="ml-2 my-auto">Catherine</span>
                    </div>
                    <v-select class="ml-auto" v-model="stuff_list" :options="stuff" :dir="$vs.rtl ? 'rtl' : 'ltr'"
                      disabled />
                  </li>
                  <li class="flex mb-4">
                    <div class="flex">
                      <vs-checkbox v-model="checkBox4"></vs-checkbox>
                      <img class="rounded-circle" src="/images/avatar-s-8.jpg" alt="avatar1.jpg">
                      <span class="ml-2 my-auto">Anna</span>
                    </div>
                    <v-select class="ml-auto" v-model="stuff_list" :options="stuff" :dir="$vs.rtl ? 'rtl' : 'ltr'"
                      disabled />
                  </li>
                </ul>
              </div>
            </vs-tab>
          </vs-tabs>
        </div>
        <!-- Footer -->
        <div class="flex mt-3 justify-between">
          <vs-button color="dark" class="mr-2 primary" type="flat">Cancel</vs-button>
          <div class="flex">
            <vs-button class="mr-2 primary" type="flat">Save</vs-button>
            <!-- <vs-button>Next</vs-button> -->
            <vs-button @click="handlePreview">Preview</vs-button>
            <!-- <preview-modal /> -->
          </div>
        </div>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import PreviewModal from './PreviewModal.vue'

export default {
  props: {
    activePrompt: Boolean
  },
  data() {
    return {
      showDescription: false,
      val: '',
      valMultipe: {
        value1: '',
        value2: ''
      },
      textarea: '',
      classes: [
        { id: 1, label: 'Class 1' },
        { id: 2, label: 'Class 2' },
        { id: 3, label: 'Class 3' },
      ],
      classes_list: { id: 1, label: 'Class 1' },
      stuff: [
        { id: 1, label: 'Stuff_Name 1' },
        { id: 2, label: 'Stuff_Name 2' },
        { id: 3, label: 'Stuff_Name 3' },
      ],
      stuff_list: { id: 1, label: 'Stuff_Name 1' },
      selectBox: false,
      checkBox1: false,
      checkBox2: false,
      checkBox3: false,
      checkBox4: false,
    }
  },
  components: {
    'v-select': vSelect, PreviewModal
  },
  computed: {
    validName() {
      return (this.valMultipe.value1.length > 0 && this.valMultipe.value2.length > 0)
    }
  },
  methods: {
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
    },
    clearValMultiple() {
      this.valMultipe.value1 = ""
      this.valMultipe.value2 = ""
    },
    handlePreview() {
      this.$emit('preview')
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

.dialog-title {
  color: black !important;
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

.rounded-circle {
  border-radius: 50%;
  width: 40px;
  height: 37px;
}
</style>
