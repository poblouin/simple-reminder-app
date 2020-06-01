import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import Toasted from 'vue-toasted';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

const vuetify = new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
  },
});
Vue.use(Vuetify);

Vue.use(Toasted, { duration: 5000 });

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app');
