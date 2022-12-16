import Vue from 'vue'
import Router from 'vue-router'
import { loadMicroApp } from 'qiankun'
import { microApps } from '@/utils/qiankun'
import store from '@/store'
Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    meta: { title: '登陆', icon: '' },
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: JSON.parse(sessionStorage.getItem('menus')) ? JSON.parse(sessionStorage.getItem('menus'))[0].children[0].path : '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: '' },
      hidden: true
    }]
  },

  {
    path: '/layout/*',
    component: Layout
  },
  {
    path: '/iframe',
    component: Layout,
    hidden: true,
    children: [{
      path: 'iframe-page',
      name: 'IframePage',
      meta: { title: 'Iframe', icon: '', noCache: 'true' },
      component: () => import('@/views/iframePage/index')
    }]
  }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

router.beforeEach((to, from, next) => {
  // console.log(to, 'toto')
  const hasApp = to.fullPath.includes('layout')
  if (hasApp) {
    const curSubAppName = to.fullPath.split('/')[2]
    const storedSubApps = store.state.app.subApps
    if (!storedSubApps.has(curSubAppName)) {
      console.log(storedSubApps.has('v2-sub-app'), 111)
      loadMicroApp(microApps.find(app => app.name === curSubAppName))
      store.commit('app/addSubApps', curSubAppName)
    }
    store.commit('app/displayCurHiddenOtherApps', curSubAppName)
  } else {
    store.commit('app/displayCurHiddenOtherApps')
  }
  next()
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
