<template>
  <div>
    <h4>Home / Certificate</h4>
    <vx-card class="my-5">
      <div class="tabs-container">
        <h3>Generate Certificate</h3>
        <input type="file" accept=".csv" @change="handleFileUpload( $event )" />
        <!-- Table -->
        <!-- <vs-table :data="users" class="my-5">
          <template slot="thead">
            <vs-th>COLUMNS</vs-th>
            <vs-th>CONTENT</vs-th>
            <vs-th>INPUT TO:</vs-th>
            <vs-th>STATUS</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in field">
              <vs-td :data="field[indextr].columns">
                {{ field[indextr] }}
              </vs-td>
              <vs-td :data="data[indextr].content">
                {{ info[indextr].field[indextr] }}
              </vs-td>
              <vs-td :data="data[indextr].input_to">
                {{ data[indextr].input_to }}
              </vs-td>
              <vs-td :data="data[indextr].status">
                {{ data[indextr].status }}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table> -->
        <table class="table">
          <tr class="table-header">
            <th>COLUMNS</th>
            <th>CONTENT</th>
            <th>INPUT TO:</th>
            <th>STATUS</th>
          </tr>
          <tr :key="index" v-for="(column, index) in content.data">
            <td>{{ field[index] }}</td>
            <td>
              <p :key="indexInfo" v-for="(item, indexInfo) in content.data">
                {{ item[field[index]] }},
              </p>
            </td>
            <td class="td-select">
              <v-select v-model="selected" :options="options" :dir="$vs.rtl ? 'rtl' : 'ltr'" /><br>
            </td>
            <td>
              <vs-button color="success" type="filled">Active</vs-button>
            </td>
          </tr>
        </table>
        <!-- Footer -->
        <div class="flex mt-3 justify-between">
          <vs-button color="dark" class="mr-2 primary" type="flat">Back</vs-button>
          <div class="flex">
            <vs-button class="mr-2 primary" type="flat">Cancel</vs-button>
          </div>
        </div>
      </div>
    </vx-card>
  </div>
</template>

<script>
import Papa from 'papaparse'
import vSelect from 'vue-select'

export default {
  components: {
    'v-select': vSelect,
  },
  data() {
    return {
      file: '',
      content: [],
      parsed: false,
      field: [],
      info: [],
      options: [
        { id: 1, label: '[Student_1]' },
        { id: 2, label: '[StaffName_1]' },
        { id: 3, label: 'Inactive' },
      ],
      selected: { id: 2, label: '' },
    }
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0]
      this.parseFile()
    },
    parseFile() {
      Papa.parse(this.file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          this.content = results
          this.parsed = true
        }.bind(this)
      })
    },
  },
  watch: {
    content(newVal) {
      console.log("newVal", newVal)
      this.info = []
      this.field = []
      if (newVal && newVal.data) {
        newVal.data.map((item) => {
          this.info.push(item)
        })
      }

      if (newVal && newVal.meta && newVal.meta.fields) {
        newVal.meta.fields.map((item) => {
          this.field.push(item)
        })
      }
    }
  }
}
</script>

<style scoped>
table {
  margin-top: 2em;
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

tr {
  border-bottom: 1px solid black;
}

td,
th {
  text-align: left;
  align-items: center;
  padding: 8px;
}

.table {
  border: 1px solid black;
  height: 524px !important;
}

.table-header {
  background-color: #dddddd;
  height: 48px !important;
}

.td-select {
  width: 200px !important;
}

.vs--searchable .vs__dropdown-toggle {
  max-width: 200px !important;
  min-width: 180px !important;
}
</style>
