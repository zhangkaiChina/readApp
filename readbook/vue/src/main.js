import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import axios from 'axios'


// import Vuex from 'vuex'


// Vue.use(Vuex)

Vue.prototype.$http = axios
Vue.config.productionTip = false
new Vue({
  store,
  router,
  
  render: h => h(App)
}).$mount("#app")


