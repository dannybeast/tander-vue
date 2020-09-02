import apiCall from "@/utils/api";

const state = {
  token: localStorage.getItem("user-token") || "",
  status: "",
  hasLoadedOnce: false,
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
const actions = {
  AUTH_REQUEST: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit("AUTH_REQUEST");
      apiCall({ url: "auth", data: user, method: "POST" })
        .then((resp) => {
          localStorage.setItem("user-token", resp.token);
          // Here set the header of your ajax library to the token value.
          // example with axios
          // axios.defaults.headers.common['Authorization'] = resp.token
          commit("AUTH_SUCCESS", resp);
          dispatch("User/USER_REQUEST", null, { root: true });
          resolve(resp);
        })
        .catch((err) => {
          commit("AUTH_ERROR", err);
          localStorage.removeItem("user-token");
          reject(err);
        });
    });
  },
  AUTH_LOGOUT: ({ commit }) => {
    return new Promise((resolve) => {
      commit("AUTH_LOGOUT");
      localStorage.removeItem("user-token");
      resolve();
    });
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
