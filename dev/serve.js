import Vue from 'vue';
import Dev from './serve.vue';
import vuetify from '@/plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import TlcFrontComponents from '@/entry.esm';
Vue.use(TlcFrontComponents);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(Dev),
}).$mount('#app');
