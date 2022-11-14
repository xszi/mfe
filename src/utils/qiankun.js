import { registerMicroApps } from 'qiankun'
import { getLoginJumpBackLink } from '@/utils/util'
/**
 * @param {*} router
 */
export function handleQianKunApps(router) {
  const locationUrl = getLoginJumpBackLink()
  const microApps = [
    {
      name: 'v2-sub-app',
      entry: process.env.VUE_APP_V2_SUBAPP_ENTRY,
      container: '#appContainer',
      activeRule: '/layout/v2-sub-app',
      props: {
        // 此处将父应用的 url 传入子应用
        parAppUrl: locationUrl,
        // 此处将父应用的 VueRouter 实例 传入子应用
        parRouter: router
      }
    },
    {
      name: 'v3-sub-app',
      entry: process.env.VUE_APP_V3_SUBAPP_ENTRY,
      container: '#appContainer',
      activeRule: '/layout/v3-sub-app',
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
