import Vue from 'vue';
import App from './App.vue';
import router from './routes';
import store from './Store/store.js';
import Vuelidate from 'vuelidate';

import VueResource from 'vue-resource';

import { MdCard } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'

import Button from './components/UI/Button.vue'

// Vue.config.productionTip = false
Vue.component('app-button', Button);

Vue.use(MdCard);
Vue.use(VueResource);
Vue.use(Vuelidate);

Vue.http.options.root = '';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
