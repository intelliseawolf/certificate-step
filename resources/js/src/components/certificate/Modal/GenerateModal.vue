<template>
  <div class="generate-modal">
    <vs-prompt @accept="acceptAlert" @close="close" buttonAccept="false" buttonCancel="false" :active="activePrompt"
      title="Genrate Certificate">
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
          <vs-switch v-model="isClass" style="width: 60px;" class="ml-auto mr-4">
            <span slot="on">Class</span>
            <span slot="off">Course</span>
          </vs-switch>
          <a href="/certificate/generate">Upload CSV</a>
        </div>
        <v-select v-model="selectedClass" class="mt-3" :options="classes" :dir="$vs.rtl ? 'rtl' : 'ltr'"
          @input="changeClassOrCourse" />
        <br>
        <!-- Student & Staff Tabs -->
        <div class="mt-1">
          <vs-tabs alignment="fixed">
            <vs-tab label="Student">
              <div>
                <ul class="centerx">
                  <li class="mb-4">
                    <vs-checkbox v-model="allStudent" @change="selectAllStudent">Select All</vs-checkbox>
                  </li>
                  <li v-for="item in studentList" :key="item.id" class="flex mb-4">
                    <vs-checkbox :vs-value="item.id" v-model="student"></vs-checkbox>
                    <img class="rounded-circle"
                      :src="item.client_users.picture ? item.client_users.picture : '/images/man-avatar.png'"
                      alt="student avatar">
                    <span class="ml-2 my-auto">
                      {{ item.first_name + " " + item.last_name }}
                    </span>
                  </li>
                </ul>
              </div>
            </vs-tab>
            <vs-tab label="Staff">
              <div>
                <ul class="centerx">
                  <li class="mb-4">
                    <vs-checkbox v-model="allStuff" @change="selectAllStuff">Select All</vs-checkbox>
                  </li>
                  <li v-for="item in teacherList" :key="item.id" class="flex mb-4" style="align-items: center;">
                    <vs-checkbox :vs-value="item.id" v-model="stuff"></vs-checkbox>
                    <img class="rounded-circle" :src="item.picture ? item.picture : '/images/man-avatar.png'"
                      alt="teacher image">
                    <span class="ml-2 my-auto">{{ item.first_name + " " + item.last_name }}</span>
                    <v-select class="ml-auto" :options="staffList" dir="rtl'" @input="(e) => setStaff(e, item)" />
                    <!-- <img class="ml-auto" src="/images/stuff_icon.png" width="27" height="24" alt="stuff_icon"> -->
                  </li>
                </ul>
              </div>
            </vs-tab>
          </vs-tabs>
        </div>
        <!-- Footer -->
        <div class="flex mt-3 justify-between">
          <vs-button color="dark" class="mr-2 primary" type="flat" @click="close">Cancel</vs-button>
          <div class="flex">
            <vs-button class="mr-2 primary" type="flat">Save</vs-button>
            <!-- <vs-button>Next</vs-button> -->
            <vs-button @click="handlePreview">Preview</vs-button>
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
    activePrompt: Boolean,
    content: {
      type: Array,
      require: true
    }
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
      classes: [],
      selectedClass: {},
      selectBox: false,
      staffList: [{ id: -1, label: "None" }],
      student: [],
      allStudent: false,
      stuff: [],
      allStuff: false,
      studentList: [],
      teacherList: [],
      isClass: true,
      selectedStudent: []
    }
  },
  mounted() {
    // this.$store.dispatch("getStudents")
    // this.$store.dispatch("getTeachers")
    this.getClassOrCourseList()
  },
  components: {
    'v-select': vSelect,
    PreviewModal
  },
  computed: {
    validName() {
      return (this.valMultipe.value1.length > 0 && this.valMultipe.value2.length > 0)
    },
    // studentList() {
    //   return this.$store.getters['getStudentList']
    // },
    // teacherList() {
    //   return this.$store.getters['getTeacherList']
    // },
    classList() {
      return this.$store.getters['getClassList']
    },
    classDetail() {
      return this.$store.getters['getClassDetail']
    },
    courseList() {
      return this.$store.getters['getCourseList']
    },
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
      this.$emit('cancel')
      this.showDescription = false
      this.textarea = ''
    },
    clearValMultiple() {
      this.valMultipe.value1 = ""
        .valMultipe.value2 = ""
    },
    handlePreview() {
      this.selectedStudent = this.student.map((studentId) => {
        const studentIndex = this.studentList.findIndex((student) => student.client_users.id === studentId)
        return this.studentList[studentIndex]
      })
      this.$emit('preview')
      this.$emit('selectedStudent', this.selectedStudent)
    },
    setStaff(e, item) {
      console.log('hhhhhhe', e, item)
      this.$emit("setStaff")
    },
    selectAllStudent() {
      this.student = []
      if (this.allStudent) {
        this.studentList.map((item) => {
          this.student.push(item.id)
        })
      }
    },
    selectAllStuff() {
      this.stuff = []
      if (this.allStuff) {
        this.teacherList.map((item) => {
          this.stuff.push(item.id)
        })
      }
    },
    getClassDetail(classId) {
      return this.$store.dispatch("getClassDetail", classId)
    },
    changeClassOrCourse() {
      if (this.isClass) {
        this.getClassDetail(this.selectedClass.id)
      } else {
        const index = this.courseList.findIndex((item) => item.id == this.selectedClass.id)
        console.log(this.courseList[index])
        this.studentList = this.courseList[index].students
        this.teacherList = this.courseList[index].tutors
      }
    },
    getClassOrCourseList() {
      if (this.isClass) {
        this.$store.dispatch("getClasses", {
          page: 1,
          limit: 1000
        })
          .then(({ data }) => {
            this.classes = data.classes.map((item) => {
              return {
                id: item.class_id,
                label: item.name
              }
            })
            this.getClassDetail(data.classes[0].class_id)
            this.selectedClass = this.classes[0]
          })
      } else {
        this.$store.dispatch("getCourseList", {
          page: 1,
          limit: 1000
        })
          .then(({ data }) => {
            this.studentList = data.course[0].students
            this.teacherList = data.course[0].tutors
            this.classes = data.course.map((item) => {
              return {
                id: item.id,
                label: item.name
              }
            })
            this.selectedClass = this.classes[0]
          })
      }
    }
  },
  watch: {
    classDetail(newVal) {
      if (newVal) {
        this.studentList = newVal.student.student_details
        this.teacherList = newVal.teacher.teacher_details
      }
    },
    isClass() {
      this.getClassOrCourseList()
    },
    content(newVal) {
      console.log(newVal)
      newVal.map((item) => {
        this.staffList.push({
          id: item.id,
          label: item.content
        })
      })
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

.centerx {
  max-height: 230px;
  overflow-y: auto;
}

.v-select .vs__dropdown-toggle {
  margin-top: 1em;
  width: 100% !important;
}

.vs__dropdown-toggle {
  margin: 0 !important;
}

.vs-dialog .vs-switch {
  position: relative !important;
  top: unset !important;
}
</style>
