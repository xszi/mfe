const routes = [
  {
    path: '/layout/v2-sub-app',
    meta: { title: 'vu2子应用', icon: 'record' }
  },
  {
    path: '/layout/v3-sub-app',
    meta: { title: 'vu3子应用', icon: 'record' },
    children: [
      {
        path: '/layout/v3-sub-app/#/monitor',
        meta: { title: 'monitor', icon: '' }
      },
      {
        path: '/layout/v3-sub-app/#/login',
        meta: { title: 'login', icon: '' }
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
