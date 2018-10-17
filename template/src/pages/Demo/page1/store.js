import store from '@/store/index'
import axios from '@/components/axios'
import { message } from 'ant-design-vue'

var moduleName = 'Demo'

store.registerModule(moduleName, {
  namespaced: true,
  state: {
    status: 0,
    userId: 0
  },
  getters: {
  },
  mutations: {
    changeStatus (state, payload) {
      state.status += 1
    },
    setUserId (state, payload) {
      state.userId = payload.id
    }
  },
  actions: {
    getUserInfo (context) {
      axios.get('/mockapi/login').then((res) => {
        message.info('This is a normal message')
        context.commit('setUserId', res)
      })
    }
  }
})

export {
  store
}

export default moduleName
