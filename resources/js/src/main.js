/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import Vue from "vue";
import App from "./App.vue";

// Vuesax Component Framework
import Vuesax from "vuesax";
import VueFileAgent from 'vue-file-agent'
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css'

Vue.use(Vuesax);
Vue.use(VueFileAgent);

// axios
import axios from "./axios.js";
Vue.prototype.$http = axios;

// Filters
import "./filters/filters.js";

// Theme Configurations
import "../themeConfig.js";

// Globally Registered Components
import "./globalComponents.js";

// Vue Router
import router from "./router";

// Vuex Store
import store from "./store/store";

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from "vue2-hammer";
import VeeValidate from 'vee-validate'
import { Cropper } from 'vue-advanced-cropper'

Vue.use(Cropper)
Vue.use(VueHammer);
Vue.use(VeeValidate)

// PrismJS
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import 'vue-advanced-cropper/dist/style.css';
// import "./@core/assets/fonts/feather/iconfont.css";

// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
