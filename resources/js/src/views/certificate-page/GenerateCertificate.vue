<template>
  <div>
    <h4>Home / Certificate</h4>
    <vx-card class="my-5">
      <div class="tabs-container">
        <h3>Generate Certificate</h3>
        <a href="#">UploadedFile.CSV</a>
        <!-- Table -->
        <vs-table :data="users" class="my-5">
          <template slot="thead">
            <vs-th>COLUMNS</vs-th>
            <vs-th>CONTENT</vs-th>
            <vs-th>INPUT TO:</vs-th>
            <vs-th>STATUS</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="data[indextr].email">
                {{ data[indextr].column }}
              </vs-td>
              <vs-td :data="data[indextr].username">
                {{ data[indextr].content }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].input_to }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].status }}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
        <!-- Footer -->
        <div class="flex mt-3 justify-between">
          <vs-button color="dark" class="mr-2 primary" type="flat">Back</vs-button>
          <div class="flex">
            <vs-button class="mr-2 primary" type="flat">Cancel</vs-button>
            <preview-modal />
          </div>
        </div>
      </div>
    </vx-card>
  </div>
</template>

<script>
import PreviewModal from '../../components/certificate/Modal/PreviewModal.vue'

export default {
  components: {
    PreviewModal
  },
  data() {
    return {
      users: [
        {
          "id": 1,
          "column": "Student Name",
          "content": "Antonio Emanuel, Angela Monday, Timothy Roxas, First Name Last Name...",
          "input_to": "Student_1",
          "status": "active",
        },
        {
          "id": 2,
          "column": "Email",
          "content": "Antonio@gmail.com, Angela@email.com, Timothy@yahoo.com, Studentemail.com",
          "input_to": "Inactive",
          "status": "Inactive",
        },
        {
          "id": 3,
          "column": "Teacher",
          "content": "Paul Lawrence Doe",
          "input_to": "StuffName_1",
          "status": "active",
        }
      ]
    }
  },
  methods: {
  }
}
</script>
