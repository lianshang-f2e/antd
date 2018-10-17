import axios from '@/components/axios'
import util from '@/util/index'
const server = {
  // 保存草稿
  saveDraft: function (params) {
    return axios.post('/web/draft/save', params)
  },
  // 加载草稿
  loadDraft: function (params) {
    return axios.get(util.buildUrl('/web/draft/load', params))
  },
  // 获取询价单详情
  inquiryDetail: function (params) {
    return axios.get(util.buildUrl('/web/request-inquiry/detail', params))
  },
  // 反馈询价单
  inquiryFeedBack: function (params) {
    return axios.post('/web/request-inquiry/inquiryFeedBack', {data: params})
  },
  // 开始联系供应商
  startContactSupplier: function (params) {
    return axios.get(util.buildUrl('/web/request-inquiry/contact-supplier', params))
  },
  // 处理下一个
  nextRequestInquiry: function (params) {
    return axios.get(util.buildUrl('/web/request-inquiry/getNextBusinessId', params))
  },
  // 申请失效
  cancelRQ: function (params) {
    return axios.post('/web/request-inquiry/cancel', params)
  },
  // 加入记事本
  addPending: function (params) {
    return axios.post('/business-pending-mgmt/add', params)
  }
}
export default server
