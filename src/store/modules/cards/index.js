import { API } from 'aws-amplify';

const defaultState = {
  cards: [],
};

const actions = {
  test: () => {
    console.error('test 2');
  },
  getCards: (context) => {
    console.error('get cards', context);
    API.get('cards', '/cards')
      .then((response) => {
        console.error('get Cards success', response);
        context.commit('CARDS_UPDATED', response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
};

const mutations = {
  CARDS_UPDATED: (state, cards) => {
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
