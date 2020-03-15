import { Auth } from 'aws-amplify';

const defaultState = {
  token: localStorage.getItem('token') || '',
};

const actions = {
  login: async (context, payload) => {
    const p = new Payload('login');
    context.commit('loading', p.merge(payload));
    // await Auth.signIn(payload.username, payload.password);
    console.error('lol you want to log-in', context, payload);
    context.commit('loginFulfilled', p.merge(payload));
  },
};

const mutations = {
  loginFulfilled: (state, token) => {
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
