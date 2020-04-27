import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
import Amplify from 'aws-amplify';


import {
  Card, Type, Habitat, Ability, Pokemon, CardAbility,
} from 'models';

import auth from 'store/modules/auth';
import loading from 'store/modules/loading';
import errors from 'store/modules/errors';
import modal from 'store/modules/modal';
import infinite from 'store/modules/infinite';
import config from '../../config/aws.config';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: 'cards',
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
});

const database = new VuexORM.Database();
database.register(Card);
database.register(Type);
database.register(Habitat);
database.register(Ability);
database.register(Pokemon);
database.register(CardAbility);

Vue.use(Vuex);

function loadingPlugin() {
  return (store) => {
    store.subscribe((mutation) => {
      if (mutation.type.includes('Fulfilled') || mutation.type.includes('Failure')) {
        store.commit('removeLoadingEntry', mutation.payload);
        if (typeof (mutation.payload.selector) !== 'undefined') {
          store.commit('infinite', mutation.payload);
        }
      }
    });
  };
}

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    errors,
    modal,
    infinite,
    loading,
    auth,
  },
  plugins: [
    VuexORM.install(database),
    loadingPlugin(),
  ],
});

export default store;
