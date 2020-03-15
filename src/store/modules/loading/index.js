const defaultState = {
};

const actions = {
};

const mutations = {
  removeLoadingEntry: (state, payload) => {
    delete state[`${payload.uuid}`];
    console.error('removing loading entry', payload);
  },
  loading: (state, payload) => {
    state[payload.uuid] = payload,
    console.error('loading somethig', payload);
  },
};

const getters = {
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
