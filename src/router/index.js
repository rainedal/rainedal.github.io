import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Work from '@/components/Work'
import About from '@/components/About'

import Grasshopper from '@/components/Grasshopper'
import UCAT from '@/components/UCAT'
import Champs from '@/components/Champs'
import Pepsi from '@/components/Pepsi'
import Vidgeo from '@/components/Vidgeo'

import NotFound from '@/components/NotFound'

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
      path: '/work/grasshopper',
      name: 'grasshopper',
      component: Grasshopper
    },
    {
      path: '/work/ucat',
      name: 'ucat',
      component: UCAT
    },
    {
      path: '/work/champs',
      name: 'champs',
      component: Champs
    },
    {
      path: '/work/pepsi',
      name: 'pepsi',
      component: Pepsi
    },
    {
      path: '/work/vidgeo',
      name: 'vidgeo',
      component: Vidgeo
    },
    {
      path: '*',
      name: 'notfound',
      component: NotFound
    }
  ]
})
