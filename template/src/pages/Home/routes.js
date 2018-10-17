const lazy = (path) => () => import(`@/pages/Home/${path}`)

export default [{
  path: 'Home',
  name: 'Home',
  component: lazy('home/index'),
  meta: {
    name: '测试home'
  }
}]
