import Vue from 'vue';

const defaultState = {
  entries: {},
};

const actions = {
};

const mutations = {
  removeLoadingEntry: (state, payload) => {
    const newEntries = { ...state.entries };
    delete newEntries[`${payload.uuid}`];
    Vue.set(state, 'entries', newEntries);
  },
  loading: (state, payload) => {
    Vue.set(state, 'entries', { ...state.entries, [payload.uuid]: payload });
  },
};

const getters = {
  entries: (state) => (req) => Object.keys(state.entries).find((key) => state.entries[key].req === req),
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
