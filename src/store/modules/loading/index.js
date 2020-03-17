import Vue from 'vue';

export default {
  state: {
    entries: {},
  },
  actions: {},
  mutations: {
    removeLoadingEntry: (state, payload) => {
      const newEntries = { ...state.entries };
      delete newEntries[`${payload.uuid}`];
      Vue.set(state, 'entries', newEntries);
    },
    loading: (state, payload) => {
      Vue.set(state, 'entries', { ...state.entries, [payload.uuid]: payload });
    },
  },
  getters: {
    entries: (state) => (reqs) => Object.keys(state.entries).find((key) => reqs.find((req) => state.entries[key].req === req)),
  },
};
