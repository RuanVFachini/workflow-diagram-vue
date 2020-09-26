import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
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
    saveDiagram(state, payload) {
      const i = state.diagrams.findIndex((i) => i.id == payload.id);
      state.diagrams.splice(i, 1);
      state.diagrams.push(payload);
    },
  },
  actions: {
  },
  modules: {
  }
})
