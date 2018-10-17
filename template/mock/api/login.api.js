
let loginApi = {
  '/web/user/admin-do-login.do': {
    "code":200,
    "message":"操作成功",
    "data": {
      "token":"1244566",
      // "client_identify":"12344" //需要用户使用企微登录
    },
    "success": true
  },
  '/web/user/wxlogin': {
    "code":200,
    "message":"操作成功",
    "data": {
      "token":"1244566",
      // "client_identify":"12344" //需要用户使用企微登录
    },
    "success": true
  }
}

module.exports = loginApi
