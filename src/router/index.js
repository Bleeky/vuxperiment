import Vue from 'vue';
import Router from 'vue-router';
import store from 'store';

import { Spinner } from 'components/Loading';
import { ErrorLazy } from 'components/Errors';

Vue.use(Router);

async function lazyLoadView(AsyncView, AsyncModule, moduleName) {
  const AsyncHandler = () => ({
    component: new Promise(((resolve, reject) => {
      const promiseComponent = AsyncView;
      let promiseModule;
      if (AsyncModule && moduleName && !store._modules.root._children[moduleName]) {
        promiseModule = AsyncModule;
      }
      Promise.all([promiseComponent, promiseModule || null]).then((r) => {
        if (r[1]) store.registerModule('cards', r[1].default);
        resolve(r[0]);
      }).catch((e) => reject(e));
    })),
    loading: Spinner,
    error: ErrorLazy,
    delay: 200,
    timeout: 10000,
  });

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      return h(AsyncHandler, data, children);
    },
  });
}

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
      component: () => lazyLoadView(
        import(/* webpackChunkName: "cards-list" */ 'modules/Cards/CardsList'),
        import(/* webpackChunkName: "cards-module" */ 'store/modules/cards'),
        'cards',
      ),
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
      component: () => lazyLoadView(
        import(/* webpackChunkName: "cards-add" */ 'modules/Cards/AddCard'),
        import(/* webpackChunkName: "cards-module" */ 'store/modules/cards'),
        'cards',
      ),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/create-card',
      name: 'CreateCard',
      component: () => lazyLoadView(
        import(/* webpackChunkName: "cards-create" */ 'modules/Cards/CreateCard'),
        import(/* webpackChunkName: "cards-module" */ 'store/modules/cards'),
        'cards',
      ),
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
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
