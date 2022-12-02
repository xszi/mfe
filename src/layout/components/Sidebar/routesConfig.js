const routes = [
  {
    path: '/layout/v2-sub-app',
    meta: { title: 'vu2子应用', icon: 'record' }
  },
  {
    path: '/layout/v3-sub-app',
    meta: { title: 'vu3子应用', icon: 'record', childApp: 'v3-sub-app' },
    children: [
      {
        path: '/layout/v3-sub-app/#/dashboard',
        meta: { title: '子应用', icon: '', childApp: 'v3-sub-app' }
      },
      {
        path: '/layout/v3-sub-app/#/test',
        meta: { title: '权限管理', icon: '', childApp: 'v3-sub-app' }
      },
      {
        path: '/layout/v3-sub-app/#/monitor',
        meta: { title: '监控', icon: '', childApp: 'v3-sub-app' }
      }
    ]
  },
  {
    path: 'iframe',
    meta: { title: 'iframePage', icon: 'record' },
    children: [
      {
        path: '/iframe/iframe-page',
        meta: { title: 'iframePage', icon: '' }
      }
    ]
  }
]

export default routes
