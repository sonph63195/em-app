import Vue from 'vue'
import App from './App.vue'
import { router } from './_helper';
import { store } from './_store';
import Bootstrap from 'bootstrap-vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import moment from "moment";


library.add(fas, fab, far);

Vue.config.productionTip = false
Vue.use(Bootstrap);
Vue.component('font-awesome-icon', FontAwesomeIcon);

// Global Variable
Vue.mixin({
  methods: {
    formatDate(date, patern) {
      return moment(new Date(date)).format(patern);
    }
  }
})


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
