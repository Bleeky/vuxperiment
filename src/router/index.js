import Vue from 'vue';
import Router from 'vue-router';
import store from 'store';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "auth" */ 'modules/Auth/LoginView'),
    },
    {
      path: '/create-card',
      name: 'CreateCard',
      component: () => import(/* webpackChunkName: "cards-list" */ 'modules/Cards/CardForm'),
      meta: {
        requiresAuth: true,
        registerStoreModule: async () => {
          if (!store._modules.root._children.cards) {
            const module = await import(/* webpackChunkName: "cards-list" */ 'store/modules/cards');
            console.error('registering cards module', module.default);
            store.registerModule('cards', module.default);
          }
        },
      },
    },
    {
      path: '/cards-list',
      name: 'CardsList',
      meta: {
        requiresAuth: true,
        registerStoreModule: async () => {
          if (!store._modules.root._children.cards) {
            const module = await import(/* webpackChunkName: "cards-list" */ 'store/modules/cards');
            console.error('registering cards module', module.default);
            store.registerModule('cards', module.default);
          }
        },
      },
      component: () => import(/* webpackChunkName: "cards-list" */ 'modules/Cards/CardsList'),
      children: [
        {
          path: ':id',
          name: 'CardView',
          component: () => import(/* webpackChunkName: "cards-list" */ 'modules/Cards/CardView'),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const registerStoreModuleRoute = to.matched.find((record) => record.meta.registerStoreModule);
  if (registerStoreModuleRoute) {
    try {
      registerStoreModuleRoute.meta.registerStoreModule();
    } catch (e) {
      console.error(e);
    }
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
    next();
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
