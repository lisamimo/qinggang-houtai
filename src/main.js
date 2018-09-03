import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import $ from 'jquery';
import common from './assets/common.js';
import 'swiper/dist/css/swiper.css';
import './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';

fontawesome.library.add(solid)
fontawesome.library.add(regular)
fontawesome.library.add(brands)

window.$ = window.jQuery = $;
Vue.config.productionTip = false;
Vue.prototype.common = common;
Vue.use(VueAwesomeSwiper);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
