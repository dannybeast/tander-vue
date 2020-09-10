import apiCall from "@/tests/mocksApi";
import { AUTH_REQUEST_URL } from "@/api/endPoints";
import router from "@/router";
import { ability } from "@/services/userAbilities";

const state = {
  token: localStorage.getItem("access-token") || "",
  status: "",
  hasLoadedOnce: false,
};

const actions = {
  authRequest: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit("authRequest");

      apiCall({ url: AUTH_REQUEST_URL(), data: user, method: "POST" })
        .then((resp) => {
          localStorage.setItem("access-token", resp.token);
          // Получаем данные пользователя
          dispatch("User/userRequest", user, { root: true });
          commit("authSuccess", resp);
          router.push("/");
          resolve(resp);
        })
        .catch((err) => {
          commit("authError", err);
          localStorage.removeItem("access-token");
          reject(err);
        });
    });
  },
  authLogout: ({ commit }) => {
    return new Promise((resolve) => {
      commit("authLogout");
      commit("User/authLogout", null, { root: true });
      localStorage.removeItem("access-token");
      // TODO: Удалить после связки с бекендом
      // TODO: Сейчас пользователь хранится в localstorage
      localStorage.removeItem("profile");
      // Сбрасываем права
      ability.update({});
      //-
      router.push("/login");
      resolve();
    });
  },
};
const mutations = {
  authRequest: (state) => {
    state.status = "loading";
  },
  authSuccess: (state, resp) => {
    state.status = "success";
    state.token = resp.token;
    state.hasLoadedOnce = true;
  },
  authError: (state) => {
    state.status = "error";
    state.hasLoadedOnce = true;
  },
  authLogout: (state) => {
    state.token = "";
  },
};
const getters = {
  isAuthenticated: (state) => !!state.token,
  authStatus: (state) => state.status,
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
