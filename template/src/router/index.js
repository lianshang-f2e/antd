import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import { routerMode } from '@/config/env'

Vue.use(Router)

export default new Router({
  mode: routerMode,
  routes
})
