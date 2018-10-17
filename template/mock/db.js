const loginApi = require('./api/login.api.js')
const homeApi = require('./api/home.api.js')
const requestInquiryApi = require('./api/request-inquiry.api.js')
const packingSlipApi = require('./api/packing-slip.api.js')
const tradeApi = require('./api/trade.api.js')
const userApi = require('./api/user.api.js')
const IM = require('./api/IM.api.js')

let mockApi = {
  ...loginApi,
  ...homeApi,
  ...IM,
  ...requestInquiryApi,
  ...userApi,
  ...packingSlipApi,
  ...tradeApi,
  'error': {
    'code': -1,
    'message': 'no such api name'
  }
}

module.exports = mockApi
