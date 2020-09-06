import apiCall from "@/tests/mocksApi";
import { AUTH_REQUEST_URL } from "@/api/endPoints";
import router from "@/router";
import {ability} from '@/services/userAbilities';

const state = {
  token: localStorage.getItem("access-token") || "",
  status: "",
  hasLoadedOnce: false,
};

const actions = {
  AUTH_REQUEST: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit("AUTH_REQUEST");

      apiCall({ url: AUTH_REQUEST_URL(), data: user, method: "POST" })
        .then((resp) => {
          localStorage.setItem("access-token", resp.token);

          // Get user data
          dispatch("User/USER_REQUEST", user, { root: true });
          commit("AUTH_SUCCESS", resp);
          router.push("/");
          resolve(resp);
        })
        .catch((err) => {
          commit("AUTH_ERROR", err);
          localStorage.removeItem("access-token");
          reject(err);
        });
    });
  },
  AUTH_LOGOUT: ({ commit }) => {
    return new Promise((resolve) => {
      commit("AUTH_LOGOUT");
      commit("User/AUTH_LOGOUT", null, { root: true });
      localStorage.removeItem("access-token");
       // TODO: Удалить после связки с бекендом
       localStorage.removeItem('profile')
       ability.update({});
       // 
      router.push("/login");
      resolve();
    });
  },
};
const mutations = {
  AUTH_REQUEST: (state) => {
    state.status = "loading";
  },
  AUTH_SUCCESS: (state, resp) => {
    state.status = "success";
    state.token = resp.token;
    state.hasLoadedOnce = true;
  },
  AUTH_ERROR: (state) => {
    state.status = "error";
    state.hasLoadedOnce = true;
  },
  AUTH_LOGOUT: (state) => {
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
