import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import { handleBrowerCache } from '@/utils/util'
import { handleQianKunApps } from '@/utils/qiankun'

if (process.env.NODE_ENV === 'development') {
  // setBrowserCache('sign_frame_token', 'eyJhbGciOiJIUzUxMiJ9.eyJ1aWQiOiI1MDY2NTQ0MjMyMzEyNzA5MTIiLCJzdWIiOiJhY2VzaGkxIiwiY2ZnIjoiTEVHQUxfU0VSVklDRSIsInV0eXBlIjoiMyIsIm5pZCI6IjMxNjQwNDYwMTI0MDg2NjgxNiIsImFpZCI6IjYyMTI3MzgxMjQ4MTY4MzQ1NiIsImp0aSI6ImY0YTAyZTQ3NmVlOTQ1OWE5MTQzNTk2NDEzZjE0NDYwIiwiY2lkIjoiMzg0ODc3MDUxMzU0MjEwMzA0In0.Y4XnOHPAG2B_oWFAoWiH_Mu0bAqJz3g_pRc_YM5IGR4bYVmPEC3gsNXl2dRxxPfbAKTdu6xpBp_OaZXzUGHEtQ')
  // setBrowserCacheSync('sign_frame_token', 'eyJhbGciOiJIUzUxMiJ9.eyJ1aWQiOiI2Mzc1NTQzNTMyNTQ4MDU1MDQiLCJzdWIiOiJsdW93aiIsImNmZyI6IkxFR0FMX1NFUlZJQ0UiLCJ1dHlwZSI6IjMiLCJuaWQiOiIzMTY0MDQ2MDEyNDA4NjY4MTYiLCJwaWQiOiIzNDgwMjUyMDE1MTAyMTk3NzYiLCJhaWQiOiI2MjEyNzM4MTI0ODE2ODM0NTYiLCJqdGkiOiJmOTczZDhkMDMxMWU0ZGYzYmVmYWE3YTkyZTY5OGU4YyIsImNpZCI6IjM4NDg3NzA1MTM1NDIxMDMwNCJ9.nPqOz70eRbYLr_InIlVJfunMku6Rwm7IH8_fel99uH1jGL-mtWFtZm7XY2slvWrdN-Mn_UZ1MpqekU87ZV9pdw')
}

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

handleBrowerCache()
handleQianKunApps(router)
