import Vue from 'vue';
import App from './App.vue';
import router from './routes';
import store from './Store/store.js';
import Vuelidate from 'vuelidate';
import wysiwyg from 'vue-wysiwyg';

import VueResource from 'vue-resource';

import { MdCard, MdButton, MdContent, MdDialog, MdTable, MdDialogConfirm } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'

import Button from './components/UI/Button.vue'

// Vue.config.productionTip = false
Vue.component('app-button', Button);

Vue.use(MdCard);
Vue.use(MdContent);
Vue.use(MdDialog);
Vue.use(MdButton);
Vue.use(MdTable);
Vue.use(MdDialogConfirm);
Vue.use(VueResource);
Vue.use(Vuelidate);
Vue.use(wysiwyg, {})

Vue.http.options.root = 'https://gamespot-ca950.firebaseio.com/';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
