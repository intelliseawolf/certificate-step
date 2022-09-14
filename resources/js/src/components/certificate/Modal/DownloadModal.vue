<template>
  <div>
    <vs-prompt @close="close" @accept="acceptAlert" buttonAccept="false" buttonCancel="false" :active="activePrompt"
      title="Download Certificates" class="flex">
      <div class="con-exemple-prompt">
        <span class="mb-5">Search Student</span>
        <vs-input icon-pack="feather" icon="icon-search" v-model="search" class="w-full mt-5 mb-10" />
        <!-- Students -->
        <div>
          <ul class="centerx">
            <li class="mb-4">
              <vs-checkbox v-model="allStudent" @change="selectAllStudent">Select All</vs-checkbox>
            </li>
            <li v-for="item in filterStudentList" :key="item.client_users.id" class="flex mb-4">
              <vs-checkbox :vs-value="item.client_users.id" v-model="student"></vs-checkbox>
              <img class="rounded-circle"
                :src="item.client_users.picture ? item.client_users.picture : '/images/man-avatar.png'"
                alt="student avatar">
              <span class="ml-2 my-auto">
                {{ item.client_users.first_name + " " + item.client_users.last_name }}
              </span>
            </li>
          </ul>
        </div>
        <!-- Footer -->
        <div class="flex mt-10 justify-between">
          <vs-button color="dark" class="mr-2 primary" type="flat" @click="close">Cancel</vs-button>
          <div>
            <vs-button @click="handlePreview" class="mr-2 primary" type="flat">Preview</vs-button>
            <vs-button @click="downloadPDF">Download Certificates</vs-button>
            <VueHtml2pdf :manual-pagination="true" :enable-download="true" ref="DownloadComp">
              <section slot="pdf-content">
                <Download />
              </section>
            </VueHtml2pdf>
          </div>
        </div>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'
import Download from './Download'

export default {
  props: {
    activePrompt: Boolean,
  },
  components: {
    VueHtml2pdf,
    Download
  },
  data() {
    return {
      search: '',
      full_name: '',
      valMultipe: {
        value1: '',
        value2: ''
      },
      student: [],
      allStudent: false,
    }
  },
  computed: {
    validName() {
      return (this.valMultipe.value1.length > 0 && this.valMultipe.value2.length > 0)
    },
    studentList: function () {
      return this.$store.getters['getStudentList']
    },
    filterStudentList() {
      return this.studentList.filter(student => {
        this.full_name = student.client_users.first_name + student.client_users.last_name
        return this.full_name.toLowerCase().includes(this.search.toLowerCase().replace(/\s/g, ''))
      })
    }
  },
  mounted() {
    this.$store.dispatch("getStudents")
  },
  methods: {
    selectAllStudent() {
      this.student = []
      if (this.allStudent) {
        this.studentList.map((item) => {
          this.student.push(item.client_users.id)
        })
      }
    },
    close() {
      this.$vs.notify({
        color: 'danger',
        title: 'Closed',
        text: 'You close a dialog!'
      })
      this.$emit('cancel')
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
    handlePreview() {
      this.$emit('preview')
    },
    downloadPDF() {
      this.$refs.DownloadComp.generatePdf()
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
