import Vue from 'vue';

export default {
  state: {
    selectors: {},
  },
  getters: {
    next: (state) => (selector) => {
      let result = {};
      Object.keys(state.selectors).forEach((key) => {
        if (selector === key) result = state.selectors[key];
      });
      return result;
    },
  },
  mutations: {
    infinite: (state, payload) => {
      Vue.set(state, 'selectors', {
        ...state.selectors,
        [payload.selector]: payload.newNext,
      });
    },
    clearInfiniteSelector: (state, payload) => {
      const newSelectors = { ...state.selectors };
      delete newSelectors[payload.selector];
      Vue.set(state, 'selectors', newSelectors);
    },
  },
  actions: {
    clearInfinite: (context, payload) => {
      context.commit('clearInfiniteSelector', payload);
    },
  },
};
