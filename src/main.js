// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../lib/mui/dist/css/mui.css'
import $ from 'jquery'
import '../lib/mui/dist/css/iconfont.css'
import VueResource from 'vue-resource'
import moment from 'moment'
import VuePreview from 'vue-preview'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
// defalut install
//Vue.use(VuePreview)

// with parameters install
Vue.use(VuePreview, {
  mainClass: 'pswp--minimal--dark',
  barsSize: {top: 0, bottom: 0},
  captionEl: false,
  fullscreenEl: false,
  shareEl: false,
  bgOpacity: 0.85,
  tapToClose: true,
  tapToToggleControls: false
})

//import axios from 'axios'
//Vue.prototype.$http = axios





import { Tabbar, TabItem,Swipe, SwipeItem,button,Lazyload,Loadmore,InfiniteScroll,
  Navbar,TabContainer,TabContainerItem,Switch,Toast,Header,Cell,Search   } from 'mint-ui'
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;
Vue.use(Lazyload);

Vue.use(InfiniteScroll);
Vue.component(Search.name, Search);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(button.name, button);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Tabbar.name, Tabbar);
Vue.component(Cell.name, Cell);
Vue.component(TabContainer.name, TabContainer);
Vue.component(Switch.name, Switch);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Header.name, Header);
Vue.filter('dataFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattern)
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
