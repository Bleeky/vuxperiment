import Vue from 'vue';
import Router from 'vue-router';
import Hello from 'components/Hello';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/cards-list',
      name: 'CardsList',
      component: () => import(/* webpackChunkName: "cards-list" */ 'modules/Cards/CardsList'),
    },
    {
      path: '/cards-list/:id',
      name: 'CardView',
      component: () => import(/* webpackChunkName: "cards-list" */ 'modules/Cards/CardView'),
    },
  ],
});
