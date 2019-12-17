import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
import Amplify from 'aws-amplify';

import Card from 'models/Card';
import config from '../config/aws.config';

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
        name: 'notes',
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
});

const database = new VuexORM.Database();
database.register(Card);

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  strict: process.env.NODE_ENV !== 'production',
  // mutations: {
  //   increment(state) {
  //     state.count++;
  //   },
  // },
  plugins: [VuexORM.install(database)],
});

export default store;
