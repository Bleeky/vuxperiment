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
      path: '/create-card',
      name: 'CreateCard',
      component: async () => {
        if (!store._modules.root._children.cards) {
          const module = await import(/* webpackChunkName: "cards-module" */ 'store/modules/cards');
          store.registerModule('cards', module.default);
        }
        return import(/* webpackChunkName: "cards-create" */ 'modules/Cards/CardForm');
      },
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
      return;
    }
    next();
  } else {
    next();
  }
});

export default router;
