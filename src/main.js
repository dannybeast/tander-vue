import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import Vuelidate from "vuelidate";
import Notifications from "vue-notification";
import VueMeta from "vue-meta";
import { abilitiesPlugin } from "@casl/vue";
import { ability } from "@/services/userAbilities";
import { Can } from "@casl/vue";
import VModal from "vue-js-modal";
import vSelect from "vue-select";
import "@/filters";

// Global components
Vue.component("Can", Can);
Vue.component("v-select", vSelect);

// Use
Vue.use(abilitiesPlugin, ability);
Vue.use(Notifications);
Vue.use(Vuelidate);
Vue.use(VueMeta, { refreshOnceOnNavigation: false });
Vue.use(VModal, { dynamicDefault: { draggable: true, resizable: true } });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
