import axios from '@/components/axios'
import {util} from '@/util/index'
const server = {
  // 获取询价单详情
  inquiryDetail: function (params) {
    return axios.get(util.buildUrl('/web/request-inquiry/detail', params))
  },
  // 反馈询价单
  inquiryFeedBack: function (params) {
    return axios.post('/web/request-inquiry/inquiryFeedBack', {data: params})
  }
}
export default server
