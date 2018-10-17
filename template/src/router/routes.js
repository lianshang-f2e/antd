import HomeRoutes from '@/pages/Home/routes'
import Login from '@/pages/Login/routes'
import Demo from '@/pages/Demo/routes'

const LayoutIndex = () => import('@/Layout/index/index')

let childrenIndex = [
  ...HomeRoutes,
  ...Demo
]

let routes = [
  {
    path: '/',
    redirect: '/index/home'
  },
  {
    path: '/index',
    redirect: '/index/home'
  },
  {
    path: '/index',
    component: LayoutIndex,
    meta: {
      name: '工作台'
    },
    children: childrenIndex
  },
  ...Login
]

export default routes
