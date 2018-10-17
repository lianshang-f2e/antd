import store from '@/store/index'
import axios from '@/components/axios'
import router from '@/router/index'
import { message } from 'ant-design-vue'

var moduleName = 'login'

store.registerModule(moduleName, {
  namespaced: true,
  state: {
    isLogin: false,
    loginFrom: {
      mobile: '',
      password: '',
      ip: '12334',
      userAgent: '1234'
    }
  },
  getters: {
  },
  mutations: {
    setIsLogin (state, payload) {
      state.isLogin = payload
    }
  },
  actions: {
    goLogin (context) {
      context.commit('setIsLogin', true)
      axios.post('/web/user/admin-do-login.do', context.state.loginFrom).then(data => {
        context.commit('setIsLogin', false)
        if (data.code === 200) {
          if (data.data.client_identify) {
            message.warning('微信登录失败，请用帐号登录')
            router.push('/wxlogin')
          } else {
            document.cookie = 'token=' + data.data.token
            message.success('登录成功')
            // router.push('/index/home')
            location.href = '/index/home'
          }
        }
      })
    }
  }
})

export {
  store
}

export default moduleName
