import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Notifications from "vue-notification";
import { abilitiesPlugin } from '@casl/vue';
import {ability} from '@/services/userAbilities';
import { Can } from '@casl/vue';

// Global components
Vue.component('Can', Can);

// Use
Vue.use(abilitiesPlugin, ability);
Vue.use(Notifications);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
