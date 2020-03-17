import { API } from 'aws-amplify';

const defaultState = {
  cards: [],
};

const actions = {
  getCards: (context) => {
    const p = new Payload('checkSession');
    API.get('cards', '/cards')
      .then((response) => {
        console.error('get Cards success', response);
        context.commit('getCardsFulfilled', p.merge(response));
      })
      .catch((error) => {
        console.error(error);
      });
  },
};

const mutations = {
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
