import axiosLib from 'axios'
import vue from 'vue'
import { baseUrl, mockBaseUrl, jumpToLogin } from '@/config/env'
import router from '../router/index'
import { notification } from 'ant-design-vue'
import store from '@/store/index'
// import { catchError } from '@/util'

var headers = {
  'Content-Type': 'application/json;charset=utf-8'
}

const axios = axiosLib.create({
  baseURL: baseUrl,
  headers: headers
})

axios.defaults.headers.post.Accept = '*/*'

// http发送前的操作 全局loading添加 ==
axios.interceptors.request.use((config) => {
  store.commit('addLoadingStatus')
  var reg = new RegExp('(^| )' + 'token' + '=([^;]*)(;|$)')
  var arr = document.cookie.match(reg)
  if (arr) {
    var token = arr[2]
    config.headers.token = token
  } else {
    router.push('/login')
  }
  if (config.url.indexOf('mockapi') > -1) {
    config.baseURL = mockBaseUrl
  }
  return config
})

axios.interceptors.response.use((res) => {
  store.commit('reduceLoadingStatus')
  if (res.data.code !== 200) {
    notification.error({
      message: '出错啦！！！',
      description: res.data.message
    })
  }
  if (res.data.code === -100) {
    router.push(jumpToLogin)
  }
  return Promise.resolve(res.data)
}, (rej) => {
  store.commit('reduceLoadingStatus')
  if (rej.response.status === 599) {
    router.push(jumpToLogin)
  } else {
    notification.error({
      message: '出错啦！！！',
      description: rej.response.data.message
    })
  }
  return rej
})
vue.prototype.$axios = axios
export default axios
