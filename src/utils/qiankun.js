import { registerMicroApps } from 'qiankun'
import { getLoginJumpBackLink } from '@/utils/util'
/**
 * @param {*} router
 */
export function handleQianKunApps(router) {
  const locationUrl = getLoginJumpBackLink()
  const microApps = [
    {
      name: 'test-sub-app',
      entry: process.env.VUE_APP_SUBAPP_ENTRY,
      container: '#appContainer',
      activeRule: '/layout/webpack-app',
      props: {
        // 此处将父应用的 url 传入子应用
        parAppUrl: locationUrl,
        // 此处将父应用的 VueRouter 实例 传入子应用
        parRouter: router
      }
    }
  ]
  registerMicroApps(microApps)
}
