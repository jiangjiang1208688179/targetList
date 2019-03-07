import Vue from 'vue'
import Router from 'vue-router'
// import moduleName from './components/login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/login',
      name: 'login',
      component: () => import('./components/login')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      children: [{
          path: '/',
          name: 'plan',
          component: () => import('./views/Target.vue')
        },
        {
          path: '/echart',
          name: 'echart',
          component: () => import('./views/Echart.vue')
        },
        {
          path: '/echart/line',
          name: 'echart-line',
          component: () => import('./views/Echart-line.vue')
        },
        {
          path: '/table',
          name: 'table',
          component: () => import('./views/Table.vue')
        },
        {
          path: '/table-2',
          name: 'table-2',
          component: () => import('./views/Table-2.vue')
        }
      ]
    }
  ]
})