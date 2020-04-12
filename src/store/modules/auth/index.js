import { Auth } from 'aws-amplify';

const defaultState = {
  loggedIn: false,
};

const actions = {
  checkSession: async (context) => {
    const p = new Payload('checkSession');
    context.commit('loading', p.merge({}));
    try {
      await Auth.currentSession();
      await Auth.currentAuthenticatedUser({});
      context.commit('loginFulfilled', p.merge({}));
    } catch (e) {
      context.commit('removeLoadingEntry', p.merge({}));
    }
  },
  login: async (context, payload) => {
    const p = new Payload('login');
    context.commit('loading', p.merge(payload));
    try {
      await Auth.signIn(payload.username, payload.password);
      context.commit('loginFulfilled', p.merge({}));
    } catch (e) {
      context.commit('error', p.merge(e));
      context.commit('removeLoadingEntry', p.merge(payload));
    }
  },
  signup: async (context, payload) => {
    const p = new Payload('signup');
    context.commit('loading', p.merge(payload));
    try {
      await Auth.signUp({
        username: payload.username,
        password: payload.password,
      });
      context.commit('signup', p.merge(payload));
    } catch (e) {
      context.commit('error', p.merge(e));
      context.commit('removeLoadingEntry', p.merge(payload));
      throw e;
    }
    context.commit('removeLoadingEntry', p.merge(payload));
  },
  verify: async (context, payload) => {
    const p = new Payload('verify');
    context.commit('loading', p.merge(payload));
    try {
      await Auth.confirmSignUp(context.state.newUser.username, payload.code);
      await Auth.signIn(context.state.newUser.username, context.state.newUser.password);
      context.commit('loginFulfilled', p.merge({}));
      context.commit('removeLoadingEntry', p.merge(payload));
    } catch (e) {
      context.commit('error', p.merge(e));
      context.commit('removeLoadingEntry', p.merge(payload));
    }
  },
  signout: async (context) => {
    const p = new Payload('signout');
    context.commit('loading', p.merge({}));
    try {
      await Auth.signOut();
      context.commit('signoutFulfilled', p.merge({}));
    } catch (e) {
      context.commit('error', p.merge(e));
      context.commit('removeLoadingEntry', p.merge({}));
    }
  },
};

const mutations = {
  signup: (state, user) => {
    state.newUser = user;
  },
  signoutFulfilled: (state) => {
    state.loggedIn = false;
  },
  loginFulfilled: (state) => {
    state.newUser = null;
    state.loggedIn = true;
  },
};

const getters = {
  isLoggedIn: (state) => !!state.loggedIn,
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
