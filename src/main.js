import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './permission'
import api from './api'

Vue.use(ElementUI)

console.log('环境变量---process.env', process.env)
console.log('process.env.NODE_ENV', process.env.NODE_ENV)
Vue.config.productionTip = false
Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
