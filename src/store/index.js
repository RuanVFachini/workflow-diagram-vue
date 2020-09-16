import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    diagrams: []
  },
  getters: {
    getDiagrams(state) {
      return state.diagrams;
    }
  },
  mutations: {
    setDiagrams(state, payload) {
      state.diagrams = payload;
    },
    addDiagram(state, payload) {
      payload.id = state.diagrams.length;
      state.diagrams.push(payload);
    },
    changeStatus(state, payload) {
      const rec = state.diagrams.find((i) => i.id == payload.item.id);
      rec.is_active = !rec.is_active;
    },
    deleteDiagram(state, payload) {
      const i = state.diagrams.findIndex((i) => i.id == payload.item.id);
      state.diagrams.splice(i, 1);
    },
  },
  actions: {
  },
  modules: {
  }
})
