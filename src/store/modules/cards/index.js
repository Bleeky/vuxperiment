import { API } from 'aws-amplify';

const defaultState = {
  creationMode: false,
  cards: [],
};

const actions = {
  setCreationMode: (context, creationMode) => {
    context.commit('setCreationMode', creationMode);
  },
  getCards: (context) => {
    const p = new Payload('getCards');
    API.get('cards', '/cards')
      .then((response) => {
        console.error('get Cards success', response);
        context.commit('getCardsFulfilled', p.merge(response));
      })
      .catch((error) => {
        console.error(error);
      });
  },
  addCard: async (context, payload) => {
    const p = new Payload('addCard');
    context.commit('loading', p.merge({}));
    try {
      await API.post('cards', '/cards', {
        body: { ...payload },
      });
    } catch (e) {
      context.commit('error', p.merge(e));
    }
    context.commit('removeLoadingEntry', p.merge({}));
  },
};

const mutations = {
  setCreationMode: (state, creationMode) => {
    state.creationMode = creationMode;
  },
  getCardsFulfilled: (state, cards) => {
    state.cards = cards;
  },
};

const getters = {
  cards: (state) => state.cards,
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
