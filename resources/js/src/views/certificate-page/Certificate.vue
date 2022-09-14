<template>
	<!-- <div>
		<h4>Home / Certificate</h4>
		<vx-card class="my-5">
			<div class="tabs-container pt-6">
				<vs-tabs alignment="fixed" v-model="activeTab" class="tab-action-btn-fill-conatiner">
					<vs-tab label="1. Customize Certificate">
						<div class="tab-text">
							<customize-certificate-compo :selectedTemplate="template" @changeTemplate="changeTemplate"
								@changeTab="changeTab" />
						</div>
					</vs-tab>
					<vs-tab label="2. Texts & Dynamic Fields">
						<div class="tab-text">
							<texts-and-dynamic-fields
								:template="template"
								@changeTab="changeTab"
								@changeContent="changeContent"
							/>
						</div>
					</vs-tab>
					<vs-tab label="3. Preview">
						<div class="tab-text">
							<Preview
								:template="template"
								:content="content"
								@changeTab="changeTab"
							/>
						</div>
					</vs-tab>
				</vs-tabs>
			</div>
		</vx-card>
	</div> -->
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
					<tab-content title="1. Customize Certificate" icon="feather icon-home">
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
					<tab-content title="2. Texts & Dynamic Fields" icon="feather icon-briefcase">
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
					<tab-content title="3. Preview" icon="feather icon-image">
						<Preview
							:template="template"
							:image="image"
							:width="width"
							:height="height"
							:content="content"
							@prevTab="prevTab"
						/>
					</tab-content>
				</form-wizard>
			</div>
		</vx-card>
	</div>
</template>

<script>
// Store Module
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import VxCardVue from '../../components/vx-card/VxCard.vue'
import CustomizeCertificateCompo from '../../components/certificate/CustomizeCertificateCompo.vue'
import TextsAndDynamicFields from '../../components/certificate/TextsAndDynamicFields.vue'
import Preview from '../../components/certificate/Preview.vue'

export default {
	components: {
		FormWizard,
		TabContent,
		VxCardVue,
		CustomizeCertificateCompo,
		TextsAndDynamicFields,
		Preview
	},
	data() {
		return {
			image: {},
			template: -1,
			content: [],
      width: 877,
      height: 620,
		}
	},
	methods: {
		formSubmitted() {
			alert("Form submitted!")
		},
		changeTemplate(index) {
			this.template = index
		},
		changeImage(image) {
			this.image = image
		},
		nextTab() {
			this.$refs.formWizard.nextTab()
		},
		prevTab() {
			this.$refs.formWizard.prevTab()
		},
		handleChanageTab(prevIndex, nextIndex) {
			if (prevIndex == 1 && nextIndex == 2) {
				this.content = this.$refs.textField.getEditorContent()
			}
		},
		changeImageSize({width, height}) {
			this.width = width;
			this.height = height;
		},
		setInitialContent(content) {
			this.$refs.textField.setEditorContent(content)
		}
	}
}
</script>

<style>
.wizard-card-footer {
	display: none;
}
</style>
