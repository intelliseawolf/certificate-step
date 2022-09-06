<template>
  <div>
    <vs-button class="menu-button" color="primary" type="border" icon-pack="feather" icon="icon-plus-circle"
      v-if="template.length !== 0">
      Static Texts
    </vs-button>
    <div v-else>
      <div class="flex text-button" @click="handleDropDown">
        Static Texts
        <i class="material-icons ml-auto" v-if="dropdown"> expand_more </i>
        <i class="material-icons ml-auto" v-else> expand_less </i>
      </div>
      <ul class="dropdown-menu" v-if="dropdown">
        <li class="dropdown-item relative">
          <vs-button type="border" class="demo-text-dark text-button" text-color="rgb(30,30,30)">
            <p class="truncate pr-5">
              This is text number 1 selected
            </p>
          </vs-button>

          <a class="absolute li-button">
            <i class="material-icons ml-auto text-red"> delete </i>
          </a>
        </li>
        <li class="dropdown-item relative">
          <vs-button type="border" class="demo-text-dark text-button pr-16" text-color="rgb(30,30,30)">
            <p class="truncate pr-5">
              This is a very very long text This is a very very long text This is a very very long text
            </p>
          </vs-button>

          <a class="absolute li-button">
            <i class="material-icons ml-auto text-red"> delete </i>
          </a>
        </li>
        <li class="dropdown-item relative">
          <vs-button type="border" class="demo-text-dark text-button" text-color="rgb(30,30,30)">
            This is text number 3
          </vs-button>

          <a class="absolute li-button">
            <i class="material-icons ml-auto text-red"> delete </i>
          </a>
        </li>
        <vs-button class="add-button" color="primary" type="border" icon-pack="feather" icon="icon-plus-circle">
          Add Text
        </vs-button>
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

export default {
  components: {
    Drag,
    Drop
  },
  props: {
    activeDynamicTexts: {
      type: Array
    },
    dynamicTextList: {
      required: true
    }
  },
  methods: {
    handleDropDown() {
      this.dropdown = !this.dropdown
    },
    setDynamicText(id) {
      this.$emit("setDynamicText", id);
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
