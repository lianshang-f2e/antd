import store from '@/store/index'

var moduleName = 'global'

store.registerModule(moduleName, {
  state: {
    isLoading: 0,
    toRoute: {},
    permissions: [],
    userInfo: {}
  },
  getters: {
    hasPermission: (state) => (payload) => {
      if (payload === null) {
        return false
      }
      if (state.permissions.indexOf(payload) > 0) {
        return true
      }
      return false
    }
  },
  mutations: {
    addLoadingStatus (state) {
      state.isLoading = state.isLoading + 1
    },
    reduceLoadingStatus (state) {
      state.isLoading = state.isLoading - 1
    },
    updateToRoute (state, payload) {
      state.toRoute = payload.toRoute
    },
    setPermissions (state, payload) {
      state.permissions = payload
    },
    setUserInfo (state, payload) {
      state.userInfo = payload
    }
  }
})

export {
  store
}

export default moduleName
