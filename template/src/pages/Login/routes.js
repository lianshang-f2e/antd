const lazy = (path) => () => import(`@/pages/Login/${path}`)

export default [{
  path: '/login',
  component: lazy('login')
},
{
  path: '/wxlogin',
  component: lazy('wxlogin')
}]
