import { API } from 'aws-amplify';
import req from 'utils/req';
import router from 'router';

import {
  Type, Habitat, Ability, Pokemon, Card,
} from 'models';

const localAPI = {
  getPokemon: req((fetch) => async (pokemonID, params) => fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`, params)),
  getPokemons: req((fetch) => async () => fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')),
  getTypes: req((fetch) => async () => fetch('https://pokeapi.co/api/v2/type')),
  getHabitats: req((fetch) => async () => fetch('https://pokeapi.co/api/v2/pokemon-habitat')),
  getAbilities: req((fetch) => async () => fetch('https://pokeapi.co/api/v2/ability?limit=500.')),
  getAbility: req((fetch) => async (abilityID, params) => fetch(`https://pokeapi.co/api/v2/ability/${abilityID}`, params)),
};

const defaultState = {
  creationMode: false,
  cards: [],
};

const queryBuilder = (payload) => {
  const queryString = Object.keys(payload.next || {}).map((key) => {
    if (typeof payload.next[key] === 'number') return `${encodeURIComponent(`from-${key}-n`)}=${encodeURIComponent(payload.next[key])}`;
    return `${encodeURIComponent(`from-${key}`)}=${encodeURIComponent(payload.next[key])}`;
  }).join('&');
  return `${payload.lim ? `lim=${payload.lim}` : ''}${queryString ? `&${queryString}` : ''}`;
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
  getPokemons: async (context) => {
    const p = new Payload('getPokemons');
    context.commit('loading', p.merge({}));
    localAPI.getPokemons().then((response) => {
      context.commit('getPokemonsFulfilled', p.merge({ pokemons: response.results }));
    }).catch((e) => {
      context.commit('error', p.merge(e));
      context.commit('removeLoadingEntry', p.merge({}));
    });
  },
  getPokemon: async (context, payload) => {
    const p = new Payload('getPokemon');
    context.commit('loading', p.merge({}));
    localAPI.getPokemon(payload.id, { cancelOnReentry: false }).then((response) => {
      context.commit('getPokemonFulfilled', p.merge({ pokemon: response, payload }));
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
  getCards: (context, payload) => {
    const p = new Payload('getCards');
    context.commit('loading', p.merge({}));
    API.get('cards', `/cards?${queryBuilder(payload)}`)
      .then((response) => {
        context.commit('getCardsFulfilled', p.merge({ cards: response.cards, ...payload, newNext: response.next }));
      })
      .catch((e) => {
        context.commit('error', p.merge(e));
        context.commit('removeLoadingEntry', p.merge({}));
      });
  },
  createCard: async (context, payload) => {
    const p = new Payload('createCard');
    context.commit('loading', p.merge({}));
    try {
      await API.post('cards', '/cards', {
        body: { ...payload },
      });
      router.push('/cards');
    } catch (e) {
      context.commit('error', p.merge(e));
    }
    context.commit('removeLoadingEntry', p.merge({}));
  },
  deleteCard: async (context, payload) => {
    const p = new Payload('deleteCard');
    context.commit('loading', p.merge({}));
    try {
      await API.del('cards', `/cards/${payload.cardId}`);
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
    Ability.deleteAll();
    Ability.insert({ data: payload.abilities });
  },
  getPokemonsFulfilled: (state, payload) => {
    Pokemon.deleteAll();
    Pokemon.insert({ data: payload.pokemons });
  },
  getAbilityFulfilled: (state, payload) => {
    Ability.update({
      where: payload.payload.url,
      data: { effect: payload.ability.effect_entries[0].short_effect },
    });
  },
  getPokemonFulfilled: (state, payload) => {
    Pokemon.update({
      where: payload.payload.url,
      data: {
        pokemonId: payload.pokemon.id,
        image: payload.pokemon.sprites.front_default,
        types: payload.pokemon.types.map((type) => type.type),
        abilities: payload.pokemon.abilities.map((ability) => (
          { ...ability.ability, cardId: payload.payload.url }
        )),
      },
    });
  },
  getCardsFulfilled: (state, payload) => {
    if (!Object.keys(payload.next).length) {
      Card.deleteAll();
    }
    Card.insert({ data: payload.cards });
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
