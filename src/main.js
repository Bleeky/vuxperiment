import Vue from 'vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, confirmed } from 'vee-validate/dist/rules';
import Loading from 'components/Loading';
import Errors from 'components/Errors';
import App from './App';
import router from './router';
import store from './store';
import './styles/app.scss';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('Loading', Loading);
Vue.component('Errors', Errors);
extend('required', {
  ...required,
  message: 'This field is required',
});
extend('confirmed', confirmed);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
