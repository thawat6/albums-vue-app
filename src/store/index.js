import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userLogin: null,
  },
  getters: {},
  mutations: {
    setUserLonin(state, data) {
      state.userLogin = data;
      localStorage.setItem("userLogin", JSON.stringify(data));
    },
  },
  actions: {
    setUserLonin({ commit }, data) {
      commit("setUserLonin", data);
    },
  },
});

export default store;
