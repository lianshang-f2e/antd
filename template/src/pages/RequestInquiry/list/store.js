import store from '@/store/index'
import axios from '@/components/axios'
import util from '@/util/index'
import { message } from 'ant-design-vue'
var moduleName = 'requestInquiry.list'

store.registerModule(moduleName, {
  namespaced: true,
  state: {
    pagination: {
      pageSize: 10,
      current: 1,
      total: 0,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} 行`
    },
    list: [],
    operatorData: [],
    userSalesAreas: []
  },
  getters: {
  },
  mutations: {
    setRequestInquiryList (state, payload) {
      state.pagination.total = payload.recordsFiltered
      state.list = payload.data
    },
    setRequestInquiryOperatorList (state, payload) {
      state.operatorData = payload.operatorList
    },
    setListUserSalesArea (state, payload) {
      state.userSalesAreas = payload.salesAreaList
    }
  },
  actions: {
    query (context, queryForms) {
      const whereObject = util.queryBuilder(queryForms)
      const limit = context.state.pagination.pageSize
      const start = (context.state.pagination.current - 1) * limit
      axios.post('/web/request-inquiry/query', {
        draw: start + 1,
        sortColumn: 'create_time',
        sortDir: 'desc',
        start: start,
        limit: limit,
        where: JSON.stringify(whereObject)
      }).then(data => {
        context.commit('setRequestInquiryList', data.data)
      })
    },
    listOperator (context) {
      axios.get('/public/getOperatorList').then(data => {
        context.commit('setRequestInquiryOperatorList', data.data)
      })
    },
    listUserSalesArea (context) {
      axios.get('/web/user/listUserSalesArea').then(data => {
        context.commit('setListUserSalesArea', data.data)
      })
    },
    cancelRequestInquiry (context, params) {
      return axios.post(util.buildUrl('/web/request-inquiry/changeStatus', params))
    },
    allocationRequestInquiry (contxt, params) {
      return axios.get(util.buildUrl('/web/request-inquiry/allocate', params)).then(data => {
        message.success(data.message)
      })
    }
  }
})

export {
  store
}

export default moduleName
