import apiCall from "@/utils/api";
import Vue from "vue";
import { USER_REQUEST_URL } from "@/api/endPoints";
//import { defineAbilitiesFor, abilities } from "@/services/user-management";

const state = { status: "", profile: {} };

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

const actions = {
  USER_REQUEST: ({ commit, dispatch }) => {
    commit("USER_REQUEST");

    apiCall({ url: USER_REQUEST_URL() })
      .then((resp) => {
        //abilities.update(defineAbilitiesFor(resp));
        // if (resp) {
        //   localStorage.setItem("vue-casl/user", JSON.stringify(resp));
        // } else {
        //   localStorage.removeItem("vue-casl/user");
        // }
        commit("USER_SUCCESS", resp);
      })
      .catch(() => {
        commit("USER_ERROR");
        dispatch("Auth/AUTH_LOGOUT", null, { root: true });
      });
  },
};

const getters = {
  getProfile: (state) => state.profile,
  isProfileLoaded: (state) => !!state.profile.name,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
