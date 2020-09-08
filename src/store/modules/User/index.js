import apiCall from "@/tests/mocksApi";
import Vue from "vue";
import { USER_REQUEST_URL } from "@/api/endPoints";
import { ability, defineAbilityFor } from "@/services/userAbilities";

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
  USER_REQUEST: ({ commit, dispatch }, user) => {
    commit("USER_REQUEST");

    apiCall({ url: USER_REQUEST_URL(), data: user })
      .then((resp) => {
        // TODO: Удалить после связки с бекендом
        localStorage.setItem("profile", JSON.stringify(resp));
        // -
        const role = defineAbilityFor(resp);
        ability.update(role);

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
