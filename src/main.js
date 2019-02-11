import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

import '@/styles/index.scss' // global css

import App from './App'
import router from '@/router/index'
import store from '@/store/index'
import Api from '@/api'

import '@/permission' // permission control

Vue.use(ElementUI, { zhLocale })
Vue.config.productionTip = false
Vue.$axios = Api
Vue.prototype.$axios = Api

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})