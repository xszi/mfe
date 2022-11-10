const routes = [
  {
    path: '/layout/webpack-app',
    meta: { title: '测试模块', icon: 'record' }
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
