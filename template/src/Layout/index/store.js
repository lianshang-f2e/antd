import store from '@/store/index'
import axios from '@/components/axios'
const moduleName = 'LayoutVuex'

store.registerModule(moduleName, {
  namespaced: true,
  state: {
    indexRightSider: {
      pendingInquiryCount: 0,
      pendingPackingSlipCount: 0,
      pendingTradeOrderCount: 0,
      businessPendingCount: 0
    }
  },
  getters: {
  },
  mutations: {
    setIndexRightSiderPendingData (state, data) {
      state.indexRightSider.pendingInquiryCount = data.data.pendingInquiryCount || 0
      state.indexRightSider.pendingPackingSlipCount = data.data.pendingPackingSlipCount || 0
      state.indexRightSider.pendingTradeOrderCount = data.data.pendingTradeOrderCount || 0
    },
    setIndexRightSiderBusinessData (state, data) {
      state.indexRightSider.businessPendingCount = data.data.total || 0
    }
  },
  actions: {
    loadPermissions () {
      axios.post('/web/user/myPermission').then(data => {
        if (data.data === null) {
          store.commit('setPermissions', [])
        } else {
          store.commit('setPermissions', data.data)
        }
      })
    },
    loadUserInfo () {
      axios.get('/web/user/current-user-info').then(data => {
        if (data.data === null) {
          store.commit('setUserInfo', {})
        } else {
          store.commit('setUserInfo', data.data.userInfo)
        }
      })
    },
    initIndexRightSider (context) {
      axios.post('/home/pendingStatistics').then(data => {
        context.commit('setIndexRightSiderPendingData', data)
      })
      axios.post('/business-pending-mgmt/list', {start: 1, limit: 1}).then(data => {
        context.commit('setIndexRightSiderBusinessData', data)
      })
    },
    deleteIndexRightSider (context, param) {
      return axios.get('/business-pending-mgmt/delete?' + 'businessId=' + param.businessId + '&businessType=' + param.businessType)
    }
  }
})

export {
  store
}

export default moduleName
