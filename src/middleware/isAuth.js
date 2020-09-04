import store from "@/store";
export default (to, from, next) => {
  let isAuth = store.getters["Auth/isAuthenticated"];

  console.log(isAuth);

  if (!isAuth) {
    next({ name: "Login" });
    return false;
  }
};
