import apiCall from "@/tests/mocksApi";
import Vue from "vue";
import {
  COPY_INFRASTUCTURE_URL,
  REMOVE_INFRASTUCTURE_URL,
  GET_INFRASTUCTURE_URL,
  GET_BY_ID_INFRASTUCTURE_URL,
  ADD_INFRASTUCTURE_URL,
} from "@/api/endPoints";

const state = {
  infrastructureNames: [
    "ID",
    "Тип",
    "Наименование",
    "Среда",
    "Роль",
    "ОC",
    "СУБД",
    "vCPU, шт",
    "Частота vCPU, GHz",
    "ОЗУ (RAM), Гб",
    "Объем СХД под ОС, Гб",
    "Объем диска без учета ОС, Гб",
    "Общий размер диска, Гб",
    "Требования к СХД",
    "СХД, IOPS",
    "СХД, Blocksize (Kb)",
    "СХД, Latency (Ms)",
    "Резервное копирование",
    "Класс резервного копирования",
    "Частота резервного копирования",
    "Глубина хранения",
    "Распределение дискового пространства на серверах БД",
    "Примечание",
  ],
  infrastructureList: [],
  currentInfrastructure: "",
  status: "",
};

const actions = {
  GET_INFRASTUCTURE: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      commit("GET_INFRASTUCTURE");

      apiCall({ url: GET_INFRASTUCTURE_URL(), method: "GET" })
        .then((resp) => {
          commit("GET_INFRASTUCTURE_SUCCESS", resp);
          resolve(resp);
        })
        .catch((err) => {
          commit("INFRASTUCTURE_ERROR", err);
          reject(err);
        });
    });
  },
  GET_BY_ID_INFRASTUCTURE: ({ commit, dispatch }, id) => {
    return new Promise((resolve, reject) => {
      apiCall({ url: GET_BY_ID_INFRASTUCTURE_URL(id), method: "GET" })
        .then((resp) => {
          commit("GET_BY_ID_INFRASTUCTURE_SUCCESS", resp);
          resolve(resp);
        })
        .catch((err) => {
          commit("INFRASTUCTURE_ERROR", err);
          reject(err);
        });
    });
  },
  ADD_INFRASTUCTURE: ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
      commit("ADD_INFRASTUCTURE");
      apiCall({ url: ADD_INFRASTUCTURE_URL(), data: data, method: "POST" })
        .then((resp) => {
          commit("ADD_INFRASTUCTURE_SUCCESS", resp);
          dispatch("GET_INFRASTUCTURE");
          resolve(resp);
        })
        .catch((err) => {
          commit("INFRASTUCTURE_ERROR", err);
          reject(err);
        });
    });
  },
  COPY_INFRASTUCTURE: ({ commit, dispatch }, id) => {
    return new Promise((resolve, reject) => {
      apiCall({ url: COPY_INFRASTUCTURE_URL(), data: id, method: "POST" })
        .then(() => {
          dispatch("GET_INFRASTUCTURE");
          resolve();
        })
        .catch((err) => {
          commit("INFRASTUCTURE_ERROR", err);
          reject(err);
        });
    });
  },
  REMOVE_INFRASTUCTURE: ({ commit, dispatch }, id) => {
    return new Promise((resolve, reject) => {
      apiCall({ url: REMOVE_INFRASTUCTURE_URL(), data: id, method: "DELETE" })
        .then(() => {
          dispatch("GET_INFRASTUCTURE");
          resolve();
        })
        .catch((err) => {
          commit("INFRASTUCTURE_ERROR", err);
          reject(err);
        });
    });
  },
};
const mutations = {
  GET_INFRASTUCTURE: (state) => {
    state.status = "loading";
  },
  GET_INFRASTUCTURE_SUCCESS: (state, resp) => {
    state.status = "success";
    state.infrastructureList = resp;
  },

  GET_BY_ID_INFRASTUCTURE_SUCCESS: (state, resp) => {
    state.status = "success";
    state.currentInfrastructure = resp;
  },
  ADD_INFRASTUCTURE: (state) => {
    state.status = "loading";
  },
  ADD_INFRASTUCTURE_SUCCESS: (state, resp) => {
    state.status = "success";
    state.infrastructureList.push(resp);
  },
  INFRASTUCTURE_ERROR: (state) => {
    state.status = "error";
  },
};
const getters = {
  getInfrastructureNames: (state) => state.infrastructureNames,
  getInfrastructureList: (state) => state.infrastructureList,
  infrastructureStatus: (state) => state.status,
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
