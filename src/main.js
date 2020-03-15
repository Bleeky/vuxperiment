// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import Loading from 'components/Loading';
import App from './App';
import router from './router';
import store from './store';
import './styles/app.scss';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('Loading', Loading);
extend('required', {
  ...required,
  message: 'This field is required',
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
