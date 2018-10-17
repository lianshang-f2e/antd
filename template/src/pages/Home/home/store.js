import store from '@/store/index'
import axios from '@/components/axios'

var moduleName = 'index.home'

store.registerModule(moduleName, {
  namespaced: true,
  state: {
    homeStatistics: {}
  },
  getters: {
  },
  mutations: {
    setHomeStatistics (state, payload) {
      state.homeStatistics = payload
    }
  },
  actions: {
    getHomeStatistics (context) {
      axios.post('/home/homeStatistics').then(resp => {
        context.commit('setHomeStatistics', resp.data)
      })
    }
  }
})

export {
  store
}

export default moduleName
