<template>
  <div>
    <h4>Home / Certificate</h4>
    <vx-card class="my-5">
      <div class="tabs-container pt-6">
        <form-wizard
          ref="formWizard"
          class="steps-transparent"
          color="rgba(var(--vs-primary), 1)"
          :title="null"
          :subtitle="null"
          finishButtonText="Submit"
          @on-complete="formSubmitted"
          @on-change="handleChanageTab"
        >
          <tab-content title="Customize Certificate">
            <customize-certificate-compo
              :selectedTemplate="template"
              :width="width"
              :height="height"
              @changeTemplate="changeTemplate"
              @nextTab="nextTab"
              @changeImageSize="changeImageSize"
              @setInitialContent="setInitialContent"
              @changeImage="changeImage"
            />
          </tab-content>

          <!-- tab 2 content -->
          <tab-content title="Texts & Dynamic Fields">
            <texts-and-dynamic-fields
              ref="textField"
              :template="template"
              :image="image"
              :width="width"
              :height="height"
              @nextTab="nextTab"
              @prevTab="prevTab"
            />
          </tab-content>

          <!-- tab 3 content -->
          <tab-content title="Preview">
            <Preview
              :template="template"
              :image="image"
              :width="width"
              :height="height"
              :content="content"
              @prevTab="prevTab"
              @mapDynamicContent="mapDynamicContent"
            />
          </tab-content>
        </form-wizard>
      </div>
    </vx-card>
  </div>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";

import VxCardVue from "../../components/vx-card/VxCard.vue";
import CustomizeCertificateCompo from "../../components/certificate/CustomizeCertificateCompo.vue";
import TextsAndDynamicFields from "../../components/certificate/TextsAndDynamicFields.vue";
import Preview from "../../components/certificate/Preview.vue";

import "vue-form-wizard/dist/vue-form-wizard.min.css";

export default {
  components: {
    FormWizard,
    TabContent,
    VxCardVue,
    CustomizeCertificateCompo,
    TextsAndDynamicFields,
    Preview,
  },
  data() {
    return {
      image: {},
      template: 0,
      content: [],
      width: 877,
      height: 620,
    };
  },
  methods: {
    formSubmitted() {
      alert("Form submitted!");
    },
    changeTemplate(index) {
      this.template = index;
    },
    changeImage(image) {
      this.image = image;
    },
    nextTab() {
      this.$refs.formWizard.nextTab();
    },
    prevTab() {
      this.$refs.formWizard.prevTab();
    },
    handleChanageTab(prevIndex, nextIndex) {
      if (prevIndex == 1 && nextIndex == 2) {
        this.content = [...this.$refs.textField.getEditorContent()];
      }
      if (prevIndex == 1 && nextIndex == 0) {
        this.$refs.textField.setEditorContent([]);
      }
    },
    changeImageSize({ width, height }) {
      this.width = width;
      this.height = height;
    },
    setInitialContent(content) {
      this.$refs.textField.setEditorContent(content);
    },
    mapDynamicContent({ id, name, content }) {
      const index = this.content.findIndex(
        (item) => item.id == id && item.content == content
      );
      this.content[index].content = name;
    },
  },
};
</script>

<style>
.wizard-nav {
  display: flex !important;
  justify-content: flex-start !important;
}

span.stepTitle {
  margin-left: 2em !important;
}

.wizard-nav li {
  font-size: medium !important;
  margin-right: 3em !important;
}

.wizard-icon-circle {
  width: 37px !important;
  height: 37px !important;
}

.vue-form-wizard .wizard-icon-circle .wizard-icon-container {
  border-radius: 6px !important;
  box-shadow: 0 3px 6px 0 rgb(105 108 255 / 40%) !important;
}

.wizard-card-footer {
  display: none;
}
</style>
