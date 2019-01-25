import Vue from 'vue'
import Router from 'vue-router'
// import moduleName from './components/login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./components/login')
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: () => import('./views/Home.vue')
    // },
    {
      path: '/',
      name: 'headrt',
      component: () => import('./components/Home.vue'),
      children:[{
        path:'/',
        name:'plan',
        component: () => import('./views/Home.vue')
      }]
    }
  ]
})
