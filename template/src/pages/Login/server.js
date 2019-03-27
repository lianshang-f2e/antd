import axios from '@/components/axios'
import { ssoHost } from '@/config/env'
// import { util } from '@/util/index'

const server = {
  // 判定登录方式
  getLoginWay: function () {
    return axios.post('/login/way')
  },
  loginByTicket: function (params) {
    return axios.post('/login/ticket', {data: params})
  },
  loginByCode: function (params) {
    return axios.post('/login/wx', {data: params})
  },
  loginForAccount: function (params) {
    return axios.post(ssoHost + '/home/login', params)
  }
}
export default server
