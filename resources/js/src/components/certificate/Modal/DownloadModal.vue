<template>
  <div>
    <vs-prompt
      @close="close"
      @accept="acceptAlert"
      buttonAccept="false"
      buttonCancel="false"
      :active="activePrompt"
      title="Download Certificates"
      class="flex"
    >
      <div class="con-exemple-prompt">
        <span class="mb-5">Search Student</span>
        <vs-input
          icon-pack="feather"
          icon="icon-search"
          v-model="search"
          class="w-full mt-5 mb-10"
        />
        <!-- Students -->
        <div>
          <ul class="centerx">
            <li class="mb-4">
              <vs-checkbox v-model="allStudent" @change="selectAllStudent"
                >Select All</vs-checkbox
              >
            </li>
            <li
              v-for="item in filterStudentList"
              :key="item.id"
              class="flex mb-4"
            >
              <vs-checkbox :vs-value="item.id" v-model="student"></vs-checkbox>
              <img
                class="rounded-circle"
                :src="item.picture ? item.picture : '/images/man-avatar.png'"
                alt="student avatar"
              />
              <span class="ml-2 my-auto">
                {{ item.first_name + " " + item.last_name }}
              </span>
            </li>
          </ul>
        </div>
        <!-- Footer -->
        <div class="flex mt-10 justify-between">
          <vs-button
            color="dark"
            class="mr-2 primary"
            type="flat"
            @click="close"
            >Cancel</vs-button
          >
          <div>
            <vs-button @click="handlePreview" class="mr-2 primary" type="flat"
              >Preview</vs-button
            >
            <vs-button>Download Certificates</vs-button>
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
  },
  data() {
    return {
      search: "",
      full_name: "",
      valMultipe: {
        value1: "",
        value2: "",
      },
      student: [],
      allStudent: false,
    };
  },
  computed: {
    validName() {
      return (
        this.valMultipe.value1.length > 0 && this.valMultipe.value2.length > 0
      );
    },
    studentList: function () {
      return this.$store.getters["getStudentList"];
    },
    filterStudentList() {
      if (this.selectedStudent && this.selectedStudent.length) {
        return this.selectedStudent.filter((student) => {
          this.full_name = student.first_name + student.last_name;
          return this.full_name
            .toLowerCase()
            .includes(this.search.toLowerCase().replace(/\s/g, ""));
        });
      }
    },
  },
  mounted() {
    this.$store.dispatch("getStudents");
  },
  methods: {
    selectAllStudent() {
      this.student = [];
      if (this.allStudent) {
        this.selectedStudent.map((item) => {
          this.student.push(item.id);
        });
      }
    },
    close() {
      this.$vs.notify({
        color: "danger",
        title: "Closed",
        text: "You close a dialog!",
      });
      this.$emit("cancel");
    },
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
    handlePreview() {
      this.$emit("preview");
    },
    downloadPDF() {
      this.$refs.DownloadComp.generatePdf();
    },
    singlePdfDownload(id) {
      this.params.colDef.cellRendererParams.singlePdfDownload(id);
    },
  },
};
</script>

<style>
.vs-dialog {
  max-width: 540px !important;
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
