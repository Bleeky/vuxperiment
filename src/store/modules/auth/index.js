import { Auth } from 'aws-amplify';

const defaultState = {
  token: localStorage.getItem('token') || '',
};

const actions = {
  login: async (context, payload) => {
    console.error('Login initiated', context, payload);
    const p = new Payload('login');
    context.commit('loading', p.merge(payload));
    await new Promise((r) => setTimeout(r, 2000));
    // await Auth.signIn(payload.username, payload.password);
    context.commit('loginFulfilled', p.merge(payload));
  },
};

const mutations = {
  loginFulfilled: (state, token) => {
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
