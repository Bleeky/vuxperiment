import { Auth } from 'aws-amplify';

const defaultState = {
  token: localStorage.getItem('token') || '',
};

const actions = {
  login: (context, payload) => {
    console.error('lol you want to log-in', context, payload);
    // return context.dispatch('LOGIN_REQUEST', payload);
    return context.commit('LOGIN_FULFILLED', payload);
  },
};

const mutations = {
  LOGIN_FULFILLED: (state, token) => {
    console.error('login has fullfiled', state, token);
    state.token = token;
  },
};

const getters = {
  isLoggedIn: (state) => !!state.token,
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
