const lazy = (path) => () => import(`@/pages/Demo/${path}`)

export default [
  {
    // url传值
    path: 'demo/page1/:id',
    name: 'Demo页面',
    component: lazy('page1/index'),
    meta: {
      Breadcrumb: [
        {
          name: 'Demo',
          url: '/index/demo/page1/12312'
        },
        {
          name: 'Demo详情'
        }
      ]
    }
  }
]
