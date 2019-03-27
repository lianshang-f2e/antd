/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * axios: axios
 *
 */
let ossDir = ''
let ossHost = '//img.lianshang.cn/'

if (process.env.LS_ENV === 'dev') {
  ossDir = 'f2e/client/{{ name }}/dev/'
} else if (process.env.LS_ENV === 'alpha') {
  ossDir = 'f2e/client/{{ name }}/alpha/'
} else if (process.env.LS_ENV === 'prelease') {
  ossDir = 'f2e/client/{{ name }}/prelease/'
} else if (process.env.LS_ENV === 'production') {
  ossDir = 'f2e/client/{{ name }}/production/'
}

module.exports = {
  ossHost,
  ossDir
}