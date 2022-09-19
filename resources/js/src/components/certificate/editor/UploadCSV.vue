<template>
  <div class="upload-csv">
    <vx-card class="my-5">
      <div class="tabs-container">
        <h3>Upload CSV</h3>
        <input type="file" accept=".csv" @change="handleFileUpload($event)" />
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
          <tr v-for="(field, index) in columns" :key="index">
            <td>{{ field }}</td>
            <td>{{ infos[field] }}</td>
            <td class="td-select">
              <v-select
                :options="dynamicTexts"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                :value="dynamicTextSelect[field]"
                @input="
                  (dynamicText) =>
                    changeDynamicText(dynamicText, infos[field], field)
                "
              /><br />
            </td>
            <td>
              <vs-button color="success" type="filled">Active</vs-button>
            </td>
          </tr>
        </table>
        <!-- Footer -->
        <div class="flex mt-3 justify-between">
          <vs-button
            color="dark"
            class="mr-2 primary"
            type="flat"
            @click="handleBackButton"
            >Back</vs-button
          >

          <vs-button
            class="mr-2 primary ml-auto"
            type="flat"
            @click="handleNextButton"
            >Next</vs-button
          >
        </div>
      </div>
    </vx-card>
  </div>
</template>

<script>
import Papa from "papaparse";
import vSelect from "vue-select";

export default {
  name: "UploadCSV",
  components: {
    "v-select": vSelect,
  },
  data() {
    return {
      file: "",
      csvData: [],
      parsed: false,
      columns: [],
      infos: {},
      dynamicTexts: [],
      dynamicTextSelect: {},
    };
  },
  mounted() {
    this.initDynamicTexts();
  },
  props: {
    content: {
      type: Array,
      required: false,
    },
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
      this.parseFile();
    },
    parseFile() {
      Papa.parse(this.file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          this.csvData = results;
          this.parsed = true;
        }.bind(this),
      });
    },
    handleNextButton() {
      const mappingData = [];

      Object.values(this.dynamicTextSelect).map((value) => {
        if (value && value.id)
          mappingData.push({
            id: value.id,
            name: value.content,
            content: value.label,
          });
      });
      this.$emit("addCsvMapping", mappingData);
      this.$emit("toggleCsvUploading");
    },
    handleBackButton() {
      this.$emit("toggleCsvUploading");
    },
    initDynamicTexts() {
      this.dynamicTexts = [{ id: -1, label: "None" }];
      this.content.map((item) => {
        if (
          (!item.content.includes("staff_name") ||
            !item.content.includes("student_name") ||
            !item.content.includes("course_name") ||
            !item.content.includes("class_name")) &&
          item.type == "dynamic-text"
        )
          this.dynamicTexts.push({
            id: item.id,
            label: item.content,
          });
      });
    },
    changeDynamicText(dynamicText, data, field) {
      for (let key of Object.keys(this.dynamicTextSelect)) {
        const value = this.dynamicTextSelect[key];
        if (value.id == dynamicText.id && value.label == dynamicText.label) {
          this.dynamicTextSelect = {
            ...this.dynamicTextSelect,
            [key]: {},
          };
        }
      }
      this.dynamicTextSelect = {
        ...this.dynamicTextSelect,
        [field]: { ...dynamicText, content: data },
      };
    },
  },
  watch: {
    csvData(newVal) {
      if (newVal && newVal.meta && newVal.meta.fields) {
        newVal.meta.fields.map((field) => {
          this.columns.push(field);
        });
      }

      if (newVal && newVal.data) {
        for (let item of newVal.data) {
          this.columns.map((field) => {
            this.infos = {
              ...this.infos,
              [field]: this.infos[field]
                ? [...this.infos[field], item[field]]
                : [item[field]],
            };
          });
        }
      }
      this.columns.map((field) => {
        this.infos[field] = this.infos[field].toString();
      });
    },
    content(newVal) {
      this.initDynamicTexts();
    },
  },
};
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
