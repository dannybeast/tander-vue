import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Notifications from "vue-notification";

// Ability
import { abilitiesPlugin } from "@casl/vue";
import { abilities } from "@/services/user-management";
Vue.use(abilitiesPlugin, abilities);
//
Vue.use(Notifications);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
