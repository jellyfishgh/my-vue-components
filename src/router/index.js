import Vue from 'vue'
import Router from 'vue-router'

import routes from '@/router/routes'
import { base } from '@/config'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base,
  routes
})
