import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getBrowserCache, setBrowserCache, getLoginPage, setBrowserCacheSync } from '@/utils/util'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  // 登陆后跳转回来
  if (to.query && to.query.code && to.query.type) {
    try {
      store.dispatch('app/setGlobalLoading', true)
      const res = await store.dispatch('user/getUserInfo', { code: to.query.code, type: to.query.type })
      if (res.code === 0) {
        document.title = 'MFE'
        setBrowserCacheSync('sign_frame_token', res.data.accessToken)
        setBrowserCacheSync('userInfo', JSON.stringify(res.data.userInfo))
        setBrowserCache('haveDefault', res.data.haveDefault)
        const userId = res.data.userInfo.userId
        store.commit('user/setFrameToken', res.data.accessToken)
        const result = await store.dispatch('user/getFrameMenu', { type: to.query.type, userId })
        const urlRes = await store.dispatch('user/getFrameUrl')
        if (urlRes.code === 0) {
          setBrowserCache('iframeUrl', JSON.stringify(urlRes.data))
        }
        if (result.code === 0) {
          setBrowserCacheSync('menus', JSON.stringify(result.data.menus))
          // 定位到第一个路由
          const firstRoute = result.data.menus && result.data.menus[0].children[0]
          setBrowserCacheSync('userMenuId', firstRoute.id)
          next({ path: firstRoute.path })
        }
      } else {
        const url = await getLoginPage()
        window.location.replace(url)
      }
      return
    } finally {
      store.dispatch('app/setGlobalLoading', false)
    }
  } else {
    const hasToken = getBrowserCache('sign_frame_token')
    const { token, noAuth } = to.query
    if (hasToken && !noAuth) {
      if (token) {
        const firstRoute = {
          path: '/home'
        }
        next({
          path: firstRoute.path
        })
      } else {
        next()
      }
      NProgress.done()
    } else {
      // const url = await getLoginPage()
      // window.location.replace(url)
      next()
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
