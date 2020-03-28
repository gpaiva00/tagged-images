import Vue from 'vue';
import router from './plugins/Router';
import App from './App.vue';
import store from './store';
import toggleNotification from './plugins/toggleNotification';
import validateFields from './plugins/validateFields';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.use(toggleNotification);
Vue.use(validateFields);

new Vue({
  store,
  router,
  vuetify,
  components: { App },
  render: h => h(App),
}).$mount('#app');
