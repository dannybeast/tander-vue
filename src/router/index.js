import Vue from "vue";
import VueRouter from "vue-router";
import VueRouteMiddleware from "vue-route-middleware";
import isAuth from "@/middleware/isAuth";
import { abilities } from "@/services/user-management";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      middleware: [isAuth],
      requiresAuth: "homeVIEW",
    },
  },
  {
    path: "/account",
    name: "Account",
    meta: {
      middleware: [isAuth],
      requiresAuth: "accountVIEW",
    },
    component: () => import("../views/Account.vue"),
  },
  {
    path: "/login",
    name: "Login",
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

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const subject = {
      type: to.meta.requiresAuth,
      ...to.params,
    };

    const authenticated = abilities.can("read", subject);

    if (!authenticated) {
      //login, 404, whatever
      return next("/404");
    }
  }
  next();
});

router.beforeEach(VueRouteMiddleware());

export default router;
