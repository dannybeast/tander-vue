import apiCall from "@/tests/mocksApi";

import {
  GET_INFRASTUCTURE_URL,
  GET_BY_ID_INFRASTUCTURE_URL,
  UPDATE_INFRASTUCTURE_URL,
  ADD_INFRASTUCTURE_URL,
  COPY_INFRASTUCTURE_URL,
  REMOVE_INFRASTUCTURE_URL,
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
  getInfrastructure: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      commit("getInfrastructure");

      apiCall({ url: GET_INFRASTUCTURE_URL(), method: "GET" })
        .then((resp) => {
          commit("getInfrastructureSuccess", resp);
          resolve(resp);
        })
        .catch((err) => {
          commit("infrastructureError", err);
          reject(err);
        });
    });
  },
  getInfrastructureById: ({ commit, dispatch }, id) => {
    return new Promise((resolve, reject) => {
      apiCall({
        url: GET_BY_ID_INFRASTUCTURE_URL(id),
        id,
        method: "GET",
      })
        .then((resp) => {
          commit("getInfrastructureByIdSuccess", resp);
          resolve(resp);
        })
        .catch((err) => {
          commit("infrastructureError", err);
          reject(err);
        });
    });
  },
  updateInfrastructure: ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
      apiCall({
        url: UPDATE_INFRASTUCTURE_URL(data.id),
        id: data.id,
        data: data,
        method: "PUT",
      })
        .then((resp) => {
          commit("updateInfrastructureSuccess");
          dispatch("getInfrastructure").then(() => {
            resolve(resp);
          });
        })
        .catch((err) => {
          commit("infrastructureError", err);
          reject(err);
        });
    });
  },
  addInfrastructure: ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
      apiCall({ url: ADD_INFRASTUCTURE_URL(), data: data, method: "POST" })
        .then((resp) => {
          commit("addInfrastructureSuccess", resp);
          dispatch("getInfrastructure").then(() => {
            resolve(resp);
          });
        })
        .catch((err) => {
          commit("infrastructureError", err);
          reject(err);
        });
    });
  },
  copyInfrastructure: ({ commit, dispatch }, id) => {
    return new Promise((resolve, reject) => {
      apiCall({ url: COPY_INFRASTUCTURE_URL(id), id, method: "POST" })
        .then(() => {
          commit("copyInfrastructureSuccess");
          dispatch("getInfrastructure").then(() => {
            resolve();
          });
        })
        .catch((err) => {
          commit("infrastructureError", err);
          reject(err);
        });
    });
  },
  deleteInfrastructure: ({ commit, dispatch }, id) => {
    return new Promise((resolve, reject) => {
      apiCall({ url: REMOVE_INFRASTUCTURE_URL(id), id, method: "DELETE" })
        .then(() => {
          dispatch("getInfrastructure").then(() => {
            commit("deleteInfrastructureSuccess");
            resolve();
          });
        })
        .catch((err) => {
          commit("infrastructureError", err);
          reject(err);
        });
    });
  },
};
const mutations = {
  getInfrastructure: (state) => {
    state.status = "loading";
  },
  getInfrastructureSuccess: (state, resp) => {
    state.status = "success";
    state.infrastructureList = resp;
  },
  getInfrastructureByIdSuccess: (state, resp) => {
    state.status = "success";
    state.currentInfrastructure = resp;
  },
  copyInfrastructureSuccess: (state) => {
    state.status = "success";
  },
  updateInfrastructureSuccess: (state) => {
    state.status = "success";
  },
  deleteInfrastructureSuccess: (state) => {
    state.status = "success";
  },
  addInfrastructureSuccess: (state, resp) => {
    state.status = "success";
    state.infrastructureList.push(resp);
  },
  infrastructureError: (state) => {
    state.status = "error";
  },
};
const getters = {
  getKeys: (state) => state.infrastructureNames,
  getList: (state) => state.infrastructureList,
  getStatus: (state) => state.status,
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
