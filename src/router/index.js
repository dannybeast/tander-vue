import Vue from "vue";
import VueRouter from "vue-router";
import VueRouteMiddleware from "vue-route-middleware";
import isAuth from "@/middleware/isAuth";
import { ability } from "@/services/userAbilities";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      middleware: [isAuth],
    },
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

router.beforeEach(VueRouteMiddleware());

// router.beforeEach((to, from, next) => {
//   const canNavigate = to.matched.some(route => {
//     let rules = ability.rules;
//     return rules.can('read', route.meta.resource)
//   })
//   if (!canNavigate) {
//     alert("Нет доступа");
//     return next('/')
//   }
//   next()
// })

export default router;
