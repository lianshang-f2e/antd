// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue'
// import store from './store/'
import { store } from './store/global'
import { sync } from 'vuex-router-sync'
// import { message, notification, Modal } from 'ant-design-vue'
import moment from 'moment'
// import '../node_modules/moment/locale/zh-cn'
moment.locale('zh-cn')
sync(store, router)

Vue.use(Antd)

router.beforeEach(function (to, from, next) {
  store.commit('updateToRoute', {'toRoute': to})
  store.commit('addLoadingStatus')
  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to, from, next) {
  store.commit('reduceLoadingStatus')
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
