const lazy = (path) => () => import(`@/pages/RequestInquiry/${path}`)

export default [
  {
    path: 'RequestInquiry/list',
    name: 'RequestInquiry-list',
    component: lazy('list/index'),
    meta: {
      name: '询价单列表',
      Breadcrumb: [
        {
          name: '询价单列表'
        }
      ]
    }
  },
  {
    path: 'RequestInquiry/detail/:id',
    name: 'RequestInquiry-detail',
    component: lazy('detail'),
    meta: {
      name: '询价单详情',
      Breadcrumb: [
        {
          name: '询价单列表',
          url: '/index/requestInquiry/list'
        },
        {
          name: '询价单详情'
        }
      ]
    }
  // },
  // {
  //   path: 'RequestInquiry/detail/rating',
  //   name: 'RequestInquiry-detail-rating',
  //   component: lazy('detail/components/rating/rating'),
  //   meta: {
  //     name: '询价单详情评价',
  //     Breadcrumb: [
  //       {
  //         name: '询价单详情评价',
  //         url: '/index/requestInquiry/detail'
  //       },
  //       {
  //         name: '询价单详情'
  //       }
  //     ]
  //   }
  }
]
