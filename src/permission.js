import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  // 登陆后跳转回来
  if (to.path === '/login') {
    next()
  } else {
    const hasToken = sessionStorage.getItem('sign_frame_token')
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
      next({
        path: '/login'
      })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
