const demoApi = require('./api/demo.api.js')

let mockApi = {
  ...demoApi,
  'error': {
    'code': -1,
    'message': 'no such api name'
  }
}

module.exports = mockApi
