import store from "@/store";
export default (to, from, next) => {
  let auth = store.getters["Auth/isAuthenticated"];
  if (!auth) {
    next("/login");
    return;
  }
};
