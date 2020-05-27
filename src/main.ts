import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

const vuetify = new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
  },
});
Vue.use(Vuetify);

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import VueFlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/themes/airbnb.css';
Vue.use(VueFlatPickr);

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app');
