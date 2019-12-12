import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
import Card from 'models/Card';

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
