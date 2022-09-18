<template>
  <div class="input-group color-picker" ref="colorpicker">
    <vs-input
      class="form-control"
      type="text"
      v-model="colorValue"
      @focus="showPicker()"
      @input="updateFromInput"
    />
    <span class="input-group-addon color-picker-container">
      <span
        class="current-color"
        :style="'background-color: ' + colorValue"
        @click="togglePicker()"
      ></span>
      <chrome :value="colors" @input="updateFromPicker" v-if="displayPicker" />
    </span>
  </div>
</template>

<script>
import { Chrome } from "vue-color";

export default {
  name: "ColorPicker",
  props: ["value"],
  components: {
    Chrome,
  },
  data() {
    return {
      colors: {
        hex: "#000000",
      },
      colorValue: "",
      displayPicker: false,
    };
  },
  mounted() {
    this.setColor(this.value || "#000000");
  },
  methods: {
    setColor(color) {
      this.updateColors(color);
      this.colorValue = color;
    },
    updateColors(color) {
      if (color.slice(0, 1) == "#") {
        this.colors = {
          hex: color,
        };
      } else if (color.slice(0, 4) == "rgba") {
        var rgba = color.replace(/^rgba?\(|\s+|\)$/g, "").split(","),
          hex =
            "#" +
            (
              (1 << 24) +
              (parseInt(rgba[0]) << 16) +
              (parseInt(rgba[1]) << 8) +
              parseInt(rgba[2])
            )
              .toString(16)
              .slice(1);
        this.colors = {
          hex: hex,
          a: rgba[3],
        };
      }
    },
    showPicker() {
      document.addEventListener("click", this.documentClick);
      this.displayPicker = true;
    },
    hidePicker() {
      document.removeEventListener("click", this.documentClick);
      this.displayPicker = false;
    },
    togglePicker() {
      this.displayPicker ? this.hidePicker() : this.showPicker();
    },
    updateFromInput() {
      this.updateColors(this.colorValue);
    },
    updateFromPicker(color) {
      this.colors = color;
      if (color.rgba.a == 1) {
        this.colorValue = color.hex;
      } else {
        this.colorValue =
          "rgba(" +
          color.rgba.r +
          ", " +
          color.rgba.g +
          ", " +
          color.rgba.b +
          ", " +
          color.rgba.a +
          ")";
      }
    },
    documentClick(e) {
      var el = this.$refs.colorpicker,
        target = e.target;
      if (el !== target && !el.contains(target)) {
        this.hidePicker();
      }
    },
  },
  watch: {
    colorValue(val) {
      if (val) {
        this.updateColors(val);
        this.$emit("input", val);
      }
    },
  },
};
</script>

<style>
.vc-chrome {
  position: absolute;
  top: 35px;
  right: 0;
  z-index: 9;
}

.current-color {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-color: #000;
  cursor: pointer;
}

.color-picker {
  position: relative;
  display: table;
  border-collapse: separate;
}

.form-control {
  display: table-cell;
  position: relative;
  z-index: 2;
  float: left;
  width: 100%;
  margin-bottom: 0;
}

.color-picker-container {
  display: table-cell;
  padding: 9px 12px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  color: #555;
  text-align: center;
  background-color: #eee;
  border: 1px solid #ccc;
  border-radius: 4px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  width: 1%;
  white-space: nowrap;
  vertical-align: middle;
}

.color-picker .vs-con-input input {
  width: 90px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
</style>
