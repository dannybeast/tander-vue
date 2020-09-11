import apiCall from "@/tests/mocksApi";
import Vue from "vue";
import {
  GET_INFRASTUCTURE_URL,
  GET_BY_ID_INFRASTUCTURE_URL,
  UPDATE_INFRASTUCTURE_URL,
  ADD_INFRASTUCTURE_URL,
  COPY_INFRASTUCTURE_URL,
  REMOVE_INFRASTUCTURE_URL,
  APPROVE_INFRASTUCTURE_URL,
  GET_INFO_INFRASTUCTURE_URL,
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
  typeOptions: [
    { value: 1, name: "Виртуальная машина" },
    { value: 2, name: "Физический сервер" },
    { value: 3, name: "Контейнер" },
  ],
  environmentOptions: [
    { value: 1, name: "Продуктивная" },
    { value: 2, name: "Стэндбай" },
    { value: 3, name: "Тестовая" },
    { value: 4, name: "Разработки" },
  ],
  roleOptions: [
    { value: 1, name: "Сервер приложений" },
    {
      value: 2,
      name: "Сервер БД",
      diskDistribution: "C: [0 Gb], S: [150 Gb], E: [0 Gb]",
    },
    { value: 3, name: "Файловый сервер", diskDistribution: "0" },
    { value: 4, name: "GitLab runner" },
  ],
  osOptions: [
    { value: 1, name: "Windows_Server", shdVolume: "120" },
    { value: 2, name: "RHEL", shdVolume: "22" },
    { value: 3, name: "OEL", shdVolume: "267" },
    { value: 7, name: "Debian", shdVolume: "22" },
    { value: 5, name: "CentOS", shdVolume: "22" },
    { value: 6, name: "CentOS_GitLab_runner", shdVolume: "80" },
  ],
  backupClassOptions: [
    { value: 1, name: "IV", backupFrequency: "Раз в сутки" },
    { value: 2, name: "V", backupFrequency: "Раз в неделю" },
    { value: 3, name: "Выше IV", backupFrequency: "Арх. анализ" },
  ],
  infrastructureList: [],
  currentInfrastructure: "",
  status: "",
  info: "",
};

const actions = {
  getInfrastructure: ({ commit }) => {
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
  getInfrastructureById: ({ commit }, id) => {
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
  getInfrastructureInfo: ({ commit, dispatch }, id) => {
    return new Promise((resolve, reject) => {
      apiCall({ url: GET_INFO_INFRASTUCTURE_URL(id), id, method: "GET" })
        .then((resp) => {
          commit("getInfrastructureInfoSuccess", resp);
          resolve(resp);
        })
        .catch((err) => {
          commit("infrastructureError", err);
          reject(err);
        });
    });
  },
  approveInfrastructure: ({ commit, dispatch }, id) => {
    return new Promise((resolve, reject) => {
      apiCall({ url: APPROVE_INFRASTUCTURE_URL(id), id, method: "POST" })
        .then(() => {
          dispatch("getInfrastructureInfo").then(() => {
            commit("approveInfrastructureSuccess");
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
  approveInfrastructureSuccess: (state) => {
    state.status = "success";
  },
  getInfrastructureInfoSuccess: (state, resp) => {
    state.status = "success";
    state.info = resp;
  },
  infrastructureError: (state) => {
    state.status = "error";
  },
};

const getters = {
  getNames: (state) => state.infrastructureNames,
  getStatus: (state) => state.status,
  getApproveStatus: (state) => state.info.approveStatus,
  getApprovedDate: (state) => Vue.filter("formatDate")(state.info.approveDate),
  getUpdateDate: (state) => Vue.filter("formatDate")(state.info.updateDate),
  getList: (state) => state.infrastructureList,
  getListFiltered: (state) => {
    return state.infrastructureList.map((obj) => {
      let newObject = Object.assign({}, obj);
      let keys = Object.keys(newObject);
      Object.values(newObject).forEach((value, index) => {
        newObject[keys[index]] = Vue.filter("formatNameInfrastructure")(
          value,
          keys[index]
        );
      });
      return newObject;
    });
  },
  getCurrent: (state) => state.currentInfrastructure,
  getCurrentFiltered: (state) => {
    let newObject = Object.assign({}, state.currentInfrastructure);
    let keys = Object.keys(newObject);
    Object.values(newObject).forEach((value, index) => {
      newObject[keys[index]] = Vue.filter("formatNameInfrastructure")(
        value,
        keys[index]
      );
    });
    return newObject;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
