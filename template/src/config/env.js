/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * axios: axios
 *
 */

let baseUrl = '/'
let routerMode = 'history'
let mockBaseUrl = 'http://localhost:7030'
let ssoHost = ''
let websocketUrl = '10.26.5.112:8080'
let jumpToLogin = '/login'
let ssoAppKey = ''

if (process.env.NODE_ENV === 'dev') {
  baseUrl = 'http://172.16.2.196:8080'
  ssoHost = 'http://172.16.2.189:8080'
  websocketUrl = 'ws://172.16.2.196:8080'
  jumpToLogin = '/login'
} else if (process.env.NODE_ENV === 'alpha') {
  baseUrl = 'http://172.16.1.145:8080'
  ssoHost = 'http://172.16.1.146:8080'
  websocketUrl = 'ws://172.16.1.145:8080'
  jumpToLogin = '/login'
} else if (process.env.NODE_ENV === 'prelease') {
  baseUrl = 'http://sunflower-server.lian-shang.cn'
  ssoHost = 'http://sso.lian-shang.cn'
  websocketUrl = 'ws://sunflower-server.lian-shang.cn'
  jumpToLogin = '/wxlogin'
  ssoAppKey = '100010'
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://sunflower-server.lianshang.com'
  ssoHost = 'http://sso.lianshang.com'
  websocketUrl = 'ws://sunflower-server.lianshang.com'
  jumpToLogin = '/wxlogin'
  ssoAppKey = '100010'
}

export {
  baseUrl,
  routerMode,
  mockBaseUrl,
  ssoHost,
  websocketUrl,
  jumpToLogin,
  ssoAppKey
}
