import Vue from "vue";
import VueRouter from "vue-router";
import { ifAuthenticated, ifNotAuthenticated } from "@/middleware/isAuthRouter";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    beforeEnter: ifAuthenticated,
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/account",
    name: "Account",
    beforeEnter: ifAuthenticated,
    component: () => import("../views/Account.vue"),
  },
  {
    path: "/login",
    name: "Login",
    beforeEnter: ifNotAuthenticated,
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/404.vue"),
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
