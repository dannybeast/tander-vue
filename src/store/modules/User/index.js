import apiCall from "@/tests/mocksApi";
import Vue from "vue";
import { USER_REQUEST_URL } from "@/api/endPoints";
import { ability, defineAbilityFor } from "@/services/userAbilities";

const state = { status: "", profile: {} };

const mutations = {
  userRequest: (state) => {
    state.status = "loading";
  },
  userSuccess: (state, resp) => {
    state.status = "success";
    Vue.set(state, "profile", resp);
  },
  userError: (state) => {
    state.status = "error";
  },
  authLogout: (state) => {
    state.profile = {};
  },
};

const actions = {
  userRequest: ({ commit, dispatch }, user) => {
    commit("userRequest");

    apiCall({ url: USER_REQUEST_URL(), data: user, method: "GET" })
      .then((resp) => {
        // TODO: Удалить после связки с бекендом
        localStorage.setItem("profile", JSON.stringify(resp));
        // -
        const role = defineAbilityFor(resp);
        ability.update(role);

        commit("userSuccess", resp);
      })
      .catch(() => {
        commit("userError");
        dispatch("Auth/authLogout", null, { root: true });
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
