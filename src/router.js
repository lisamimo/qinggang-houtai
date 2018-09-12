import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/home/Home.vue';
import Content from './components/content/Content.vue';
import SingleOrder from './components/content/center/order/SingleOrder.vue';
import TeamOrder from './components/content/center/order/TeamOrder.vue';
import OrderStat from './components/content/center/order/OrderStat.vue';
import FeedBack from './components/content/center/feedback/FeedBack.vue';
import HouseSearch from './components/content/center/housesearch/HouseSearch.vue';
import HouseDetail from './components/content/center/housesearch/HouseDetail.vue';
import AddOrder from './components/content/center/housesearch/AddOrder.vue';

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/content',
      name: 'Content',
      component: Content,
      children: [
        { path: '/singleorder', component: SingleOrder, name: 'SingleOrder' },
        { path: '/teamorder', component: TeamOrder, name: 'TeamOrder' },
        { path: '/orderstat', component: OrderStat, name: 'OrderStat' },
        { path: '/feedback', component: FeedBack, name: 'FeedBack' },
        { path: '/housesearch', component: HouseSearch, name: 'HouseSearch' },
        { path: '/housedetail', component: HouseDetail, name: 'HouseDetail' },
        { path: '/addorder', component: AddOrder, name: 'AddOrder' }
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
