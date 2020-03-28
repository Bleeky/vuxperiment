import { API } from 'aws-amplify';
import req from 'utils/req';

import { Type, Habitat, Ability } from 'models';

const localAPI = {
  getTypes: req((fetch) => async () => fetch('https://pokeapi.co/api/v2/type')),
  getHabitats: req((fetch) => async () => fetch('https://pokeapi.co/api/v2/pokemon-habitat')),
  getAbilities: req((fetch) => async () => fetch('https://pokeapi.co/api/v2/ability?limit=500.')),
  getAbility: req((fetch) => async (abilityID, params) => fetch(`https://pokeapi.co/api/v2/ability/${abilityID}`, params)),
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
    context.commit('loading', p.merge({}));
    localAPI.getTypes().then((response) => {
      context.commit('getTypesFulfilled', p.merge({ types: response.results }));
    }).catch((e) => {
      context.commit('error', p.merge(e));
      context.commit('removeLoadingEntry', p.merge({}));
    });
  },
  getHabitats: async (context) => {
    const p = new Payload('getHabitats');
    context.commit('loading', p.merge({}));
    localAPI.getHabitats().then((response) => {
      context.commit('getHabitatsFulfilled', p.merge({ habitats: response.results }));
    }).catch((e) => {
      context.commit('error', p.merge(e));
      context.commit('removeLoadingEntry', p.merge({}));
    });
  },
  getAbilities: async (context) => {
    const p = new Payload('getAbilities');
    context.commit('loading', p.merge({}));
    localAPI.getAbilities().then((response) => {
      context.commit('getAbilitiesFulfilled', p.merge({ abilities: response.results }));
    }).catch((e) => {
      context.commit('error', p.merge(e));
      context.commit('removeLoadingEntry', p.merge({}));
    });
  },
  getAbility: async (context, payload) => {
    const p = new Payload('getAbility');
    context.commit('loading', p.merge({}));
    localAPI.getAbility(payload.id, { cancelOnReentry: false }).then((response) => {
      context.commit('getAbilityFulfilled', p.merge({ ability: response, payload }));
    }).catch((e) => {
      context.commit('error', p.merge(e));
      context.commit('removeLoadingEntry', p.merge({}));
    });
  },
  getCards: (context) => {
    const p = new Payload('getCards');
    context.commit('loading', p.merge({}));
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
    Habitat.insert({ data: payload.habitats });
  },
  getAbilitiesFulfilled: (state, payload) => {
    Ability.insertOrUpdate({ data: payload.abilities });
  },
  getAbilityFulfilled: (state, payload) => {
    Ability.update({
      where: payload.payload.url,
      data: { effect: payload.ability.effect_entries[0].short_effect },
    });
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
