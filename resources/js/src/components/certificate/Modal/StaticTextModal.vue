<template>
  <div>
    <vs-button
      class="add-button"
      color="primary"
      icon-pack="feather"
      icon="icon-plus-circle"
      type="border"
      @click="activePrompt = true"
    >
      Add Text
    </vs-button>

    <vs-prompt
      @cancel="val = ''"
      @accept="acceptAlert"
      buttonAccept="false"
      buttonCancel="false"
      :active.sync="activePrompt"
      title=""
      @close="close"
    >
      <h3 class="text-center mb-4">Add Static Text</h3>
      <div class="con-exemple-prompt">
        <vs-input
          vs-placeholder="static text"
          v-model="text"
          class="w-full mb-3"
        />

        <div class="flex mt-3">
          <vs-button class="ml-auto" @click="saveStaticText">Save</vs-button>
        </div>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
export default {
  name: "StaticTextModal",
  data() {
    return {
      modal: null,
      activePrompt: false,
      text: "",
    };
  },
  methods: {
    changeModal(name) {
      this.modal = name;
    },
    acceptAlert() {
      this.$vs.notify({
        color: "success",
        title: "Accept Selected",
        text: "Lorem ipsum dolor sit amet, consectetur",
      });
    },
    close() {
      this.showDescription = false;
      this.textarea = "";
    },
    saveStaticText() {
      this.$emit("createStaticText", this.text);
      this.text = "";
      this.activePrompt = false;
    },
  },
};
</script>

<style>
.vs-dialog {
  max-width: 570px !important;
}

.vs-dialog footer {
  display: none !important;
}

.con-vs-dialog .vs-dialog header {
  background: none;
  height: 48px;
}

.vs-dialog-cancel {
  color: #6e6b7b;
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
</style>
