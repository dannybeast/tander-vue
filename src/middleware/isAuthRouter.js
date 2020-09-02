import store from "@/store";
export const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters["Auth/isAuthenticated"]) {
    next();
    return;
  }
  next("/");
};
export const ifAuthenticated = (to, from, next) => {
  if (store.getters["Auth/isAuthenticated"]) {
    next();
    return;
  }
  next("/login");
};
