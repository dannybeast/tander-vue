import apiCall from "@/utils/api";
import Vue from "vue";

const state = { status: "", profile: {} };

const getters = {
  getProfile: (state) => state.profile,
  isProfileLoaded: (state) => !!state.profile.name,
};

const actions = {
  // Получение пользователя
  USER_REQUEST: ({ commit, dispatch }) => {
    commit("USER_REQUEST");
    apiCall({ url: "user/me" })
      .then((resp) => {
        commit("USER_SUCCESS", resp);
      })
      .catch(() => {
        commit("USER_ERROR");
        dispatch("AUTH_LOGOUT");
      });
  },
};

const mutations = {
  USER_REQUEST: (state) => {
    state.status = "loading";
  },
  USER_SUCCESS: (state, resp) => {
    state.status = "success";
    Vue.set(state, "profile", resp);
  },
  USER_ERROR: (state) => {
    state.status = "error";
  },
  AUTH_LOGOUT: (state) => {
    state.profile = {};
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
