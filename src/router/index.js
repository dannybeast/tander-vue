import Vue from "vue";
import VueRouter from "vue-router";
import VueRouteMiddleware from "vue-route-middleware";
import isAuth from "@/middleware/isAuth";
import isAbility from "@/middleware/isAbility";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      middleware: ["isAuth", "isAbility"],
      resource: "Home",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      resource: "Login",
    },
  },
  {
    path: "/secret",
    name: "Secret",
    component: () => import("../views/Secret.vue"),
    meta: {
      middleware: ["isAuth", "isAbility"],
      resource: "Secret",
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/404.vue"),
    meta: {
      resource: "404",
    },
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

router.beforeEach(VueRouteMiddleware({ isAuth, isAbility }));

export default router;
