<template>
	<div>
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
							<texts-and-dynamic-fields :template="template" @changeTab="changeTab" />
						</div>
					</vs-tab>
					<vs-tab label="3. Preview">
						<div class="tab-text">
							<Preview @changeTab="changeTab" />
						</div>
					</vs-tab>
				</vs-tabs>
			</div>
		</vx-card>
	</div>
</template>

<script>
// Store Module

import VxCardVue from '../../components/vx-card/VxCard.vue'
import CustomizeCertificateCompo from '../../components/certificate/CustomizeCertificateCompo.vue'
import TextsAndDynamicFields from '../../components/certificate/TextsAndDynamicFields.vue'
import Preview from '../../components/certificate/Preview.vue'

export default {
	components: {
		VxCardVue,
		CustomizeCertificateCompo,
		TextsAndDynamicFields,
		Preview
	},
	data() {
		return {
			activeTab: 0,
			template: -1,
		}
	},
	methods: {
		changeTemplate(index) {
			this.template = index
		},
		changeTab(tab) {
			this.activeTab = tab
		}
	}
}
</script>
