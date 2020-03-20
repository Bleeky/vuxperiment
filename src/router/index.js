import Vue from 'vue';
import Router from 'vue-router';
import store from 'store';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '*',
      name: 'NotFound',
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "auth" */ 'modules/Auth/LoginView'),
      props: { status: 'login' },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import(/* webpackChunkName: "auth" */ 'modules/Auth/LoginView'),
      props: { status: 'signup' },
    },
    {
      path: '/verify',
      name: 'Verify',
      component: () => import(/* webpackChunkName: "auth" */ 'modules/Auth/LoginView'),
      props: { status: 'verify' },
    },
    {
      path: '/cards',
      name: 'CardsList',
      meta: {
        requiresAuth: true,
      },
      component: async () => {
        if (!store._modules.root._children.cards) {
          const module = await import(/* webpackChunkName: "cards-module" */ 'store/modules/cards');
          store.registerModule('cards', module.default);
        }
        return import(/* webpackChunkName: "cards-list" */ 'modules/Cards/CardsList');
      },
      children: [
        {
          path: ':id',
          name: 'CardView',
          component: () => import(/* webpackChunkName: "cards-list" */ 'modules/Cards/CardView'),
        },
      ],
    },
    {
      path: '/add-card',
      name: 'AddCard',
      component: async () => {
        if (!store._modules.root._children.cards) {
          const module = await import(/* webpackChunkName: "cards-module" */ 'store/modules/cards');
          store.registerModule('cards', module.default);
        }
        return import(/* webpackChunkName: "cards-add" */ 'modules/Cards/AddCard');
      },
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/create-card',
      name: 'CreateCard',
      component: async () => {
        if (!store._modules.root._children.cards) {
          const module = await import(/* webpackChunkName: "cards-module" */ 'store/modules/cards');
          store.registerModule('cards', module.default);
        }
        return import(/* webpackChunkName: "cards-create" */ 'modules/Cards/CreateCard');
      },
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.error('beforeEach route', to, from);
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      console.error('not connected, redirecting to login...');
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      console.error('route need authentification, but user is connected...', to.fullPath);
      next();
    }
  } else {
    console.error('route doesn\'t need authentification, continuing redirection ...', to.fullPath);
    next();
  }
});

export default router;
