import { API } from 'aws-amplify';
import req from 'utils/req';

import { Type, Habitat } from 'models';

const localAPI = {
  getTypes: req((fetch) => async () => fetch('https://pokeapi.co/api/v2/type')),
  getHabitats: req((fetch) => async () => fetch('https://pokeapi.co/api/v2/pokemon-habitat')),
  getAbilities: req((fetch) => async () => fetch('https://pokeapi.co/api/v2/ability?limit=500.')),
};

const defaultState = {
  creationMode: false,
  cards: [],
};

const actions = {
  setCreationMode: (context, creationMode) => {
    context.commit('setCreationMode', creationMode);
  },
  getTypes: async (context) => {
    const p = new Payload('getTypes');
    localAPI.getTypes().then((response) => {
      context.commit('getTypesFulfilled', p.merge({ types: response.results }));
    }).catch((e) => {
      context.commit('error', p.merge(e));
      context.commit('removeLoadingEntry', p.merge({}));
    });
  },
  getHabitats: async (context) => {
    const p = new Payload('getHabitats');
    localAPI.getHabitats().then((response) => {
      context.commit('getHabitatsFulfilled', p.merge({ types: response.results }));
    }).catch((e) => {
      context.commit('error', p.merge(e));
      context.commit('removeLoadingEntry', p.merge({}));
    });
  },
  getAbilities: async (context) => {
    const p = new Payload('getAbilities');
    localAPI.getAbilities().then((response) => {
      context.commit('getAbilitiesFulfilled', p.merge({ types: response.results }));
    }).catch((e) => {
      context.commit('error', p.merge(e));
      context.commit('removeLoadingEntry', p.merge({}));
    });
  },
  getCards: (context) => {
    const p = new Payload('getCards');
    API.get('cards', '/cards')
      .then((response) => {
        context.commit('getCardsFulfilled', p.merge(response));
      })
      .catch((e) => {
        context.commit('error', p.merge(e));
        context.commit('removeLoadingEntry', p.merge({}));
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
  getTypesFulfilled: (state, payload) => {
    Type.deleteAll();
    Type.insert({ data: payload.types });
  },
  getHabitatsFulfilled: (state, payload) => {
    Habitat.deleteAll();
    Habitat.insert({ data: payload.types });
  },
  getAbilitiesFulfilled: (state, payload) => {
    // Habitat.deleteAll();
    // Habitat.insert({ data: payload.types });
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
