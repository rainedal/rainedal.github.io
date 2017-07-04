import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Work from '@/components/Work'
import About from '@/components/About'

import Grasshopper from '@/components/Grasshopper'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      component: Hello
    },
    {
      path: '/work',
      name: 'work',
      component: Work
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/grasshopper',
      name: 'grasshopper',
      component: Grasshopper
    }
  ]
})
