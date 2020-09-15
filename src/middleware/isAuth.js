import store from "@/store";
export default function(to, from, next) {
  let isAuth = store.getters["Auth/isAuthenticated"];

  if (!isAuth) {
    next({ name: "Login" });
    return false;
  }
}
