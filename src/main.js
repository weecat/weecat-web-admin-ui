import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import './errorLog' // error log
import './permission' // permission control
import 'babel-polyfill'

import * as filters from './filters' // global filters

Vue.use(Element, {
  size: Cookies.get('size') || 'medium'
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 注册一个全局自定义指令 `v-focus`
// Vue.directive('permission', () => import('@/directive/permission/index'))

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
