<template>
  <div>
    <vs-button class="menu-button" color="primary" type="border" icon-pack="feather" icon="icon-plus-circle"
      v-if="template.length !== 0">
      Static Texts
    </vs-button>
    <div v-else>
      <div class="flex text-button" @click="handleDropDown">
        Static Texts
        <i class="material-icons ml-auto" v-if="dropdown"> expand_less </i>
        <i class="material-icons ml-auto" v-else> expand_more </i>
      </div>
      <ul class="dropdown-menu" v-if="dropdown">
        <li
          class="dropdown-item relative"
          v-for="(text, index) in staticTextList"
          :key="index"
        >
          <vs-button type="border" class="demo-text-dark text-button" text-color="rgb(30,30,30)">
            <p class="truncate pr-5">
              {{ text }}
            </p>
          </vs-button>

          <a class="absolute li-button">
            <i class="material-icons ml-auto text-red" @click="removeStaticText(text)">
              delete
            </i>
          </a>
        </li>

        <static-text-modal @createStaticText="createStaticText" />
      </ul>
    </div>
    <div class="flex menu-button">
      <span><strong>Dynamic Texts</strong></span>
      <vs-switch v-model="dynamicTextSwitch" class="ml-auto" />
    </div>
    <div v-if="dynamicTextSwitch">
      <vs-button
        v-for="text in dynamicTextList"
        :key="text.field_id"
        @click="setDynamicText(text.field_id)"
        class="menu-button"
        :style="
          activeDynamicTexts.includes(text.field_id) && `
            background-color: rgba(var(--vs-primary),1)!important;
            color: white;
          `
        "
        color="primary"
        type="border"
        icon-pack="feather"
        icon="icon-plus-circle"
      >
        {{ text.field_name }}
      </vs-button>
    </div>
  </div>
</template>

<script>
import { Drag, Drop } from "vue-easy-dnd"

import StaticTextModal from "../Modal/StaticTextModal.vue"

export default {
  components: {
    Drag,
    Drop,
    StaticTextModal,
  },
  props: {
    activeDynamicTexts: {
      type: Array
    },
    dynamicTextList: {
      required: true
    },
    staticTextList: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleDropDown() {
      this.dropdown = !this.dropdown
    },
    setDynamicText(id) {
      this.$emit("setDynamicText", id);
    },
    createStaticText(text) {
      this.$emit("createStaticText", text)
    },
    removeStaticText(text) {
      this.$emit("removeStaticText", text)
    }
  },
  data() {
    return {
      template: [],
      dynamicTextSwitch: true,
      dropdown: false,
    }
  }
}
</script>

<style>
.menu-button {
  width: 308px;
  justify-content: left;
  padding: 8px 16px 8px 16px !important;
  font-size: 16px !important;
  margin-top: 16px;
}

.add-button {
  width: 308px;
  justify-content: center;
  padding: 8px 16px 8px 16px !important;
  font-size: 16px !important;
  margin-top: 16px;
}

li.dropdown-item {
  margin-top: 16px;
}

.li-button {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
}

.text-button {
  width: 308px;
  text-align: left;
  padding: 8px 16px 8px 16px !important;
  font-size: 16px !important;
  border: 2px, solid, #FFFFFF;
}

.vs-button-text.vs-button--text {
  width: 100%;
}

.text-red {
  color: #F15D5F;
}
</style>
