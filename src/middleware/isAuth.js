import store from "@/store";
export default (to, from, next) => {
  let isAuth = store.getters["Auth/isAuthenticated"];

  if (!isAuth) {
    next({ name: "Login" });
    return false;
  }
};
