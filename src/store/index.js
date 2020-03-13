import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
import Amplify from 'aws-amplify';
import { VuexObservable, ofType } from 'vuex-observable-plugin';
import {
  mergeMap, flatMap, take, catchError,
} from 'rxjs/operators';
import {
  of, race, empty, concat,
} from 'rxjs';


import Card from 'models/Card';
import auth from 'store/modules/auth';
import epicsRegistry from 'epics/index';

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

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
  },
  plugins: [VuexORM.install(database), VuexObservable(epicsRegistry.getEpics(), {
    dependencies: {
      ofType, mergeMap, flatMap, take, catchError, of, race, empty, concat,
    },
  })],
});

export default store;
