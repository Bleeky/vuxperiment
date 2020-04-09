import Vue from 'vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, confirmed } from 'vee-validate/dist/rules';
import Multiselect from 'vue-multiselect';

import Modal from 'components/Modal';
import Loading from 'components/Loading';
import Errors from 'components/Errors';
import Icon from 'components/Icon';
import Image from 'components/Image';
import App from './App';
import router from './router';
import store from './store';
import './styles/app.scss';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('Multiselect', Multiselect);
Vue.component('Loading', Loading);
Vue.component('Modal', Modal);
Vue.component('Errors', Errors);
Vue.component('Icon', Icon);
Vue.component('S3Image', Image);
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
