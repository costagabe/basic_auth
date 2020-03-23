import appImport from './app/app.js'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const app = appImport.map(rota => {
  return {
    ...rota,
    beforeEnter: veficarToken,
    component: rota.component ? rota.component : () => import('@/layouts/Crud')
  }
})

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    beforeEnter: veficarToken
  },
  ...app,
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/layouts/Login/Login'),
    beforeEnter: (_to, _from, next) => {
      if (localStorage.getItem('userToken')) {
        next('/home')
      }
      next()
    }
  }
]

async function veficarToken (_to, _from, next) {
  const token = localStorage.getItem('userToken')
  if (token) {
    next()
  } else {
    next('/login')
  }
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
