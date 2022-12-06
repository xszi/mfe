import axios from 'axios'
import { Message } from 'element-ui'
// import store from '@/store'
import { getBrowserCache } from '@/utils/util'

// create an axios instance
const service = axios.create({
  baseURL: '/', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  headers: { 'Content-Type': 'application/json; UTF-8' }, // Node服务在这里设置无效
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.headers['x-notary-token'] = getBrowserCache('sign_frame_token')
    // TODO 不知道为什么一定要这里设置请求头才生效（且里面不能加UTF-8），node服务才能收到数据
    config.headers['Content-Type'] = 'application/json'
    // config.headers['Content-Type'] = 'application/json; UTF-8'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    // for debug
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break
      case 401:
        error.message = '未授权，请重新登录'
        window.location.href = process.env.VUE_APP_REDIRECT_LOGIN_URL
        break
      case 403:
        error.message = '拒绝访问'
        break
      case 404:
        error.message = '请求错误,未找到该资源'
        break
      case 405:
        error.message = '请求方法未允许'
        break
      case 408:
        error.message = '请求超时'
        break
      case 500:
        error.message = '服务器端出错'
        break
      case 501:
        error.message = '网络未实现'
        break
      case 502:
        error.message = '网络错误'
        break
      case 503:
        error.message = '服务不可用'
        break
      case 504:
        error.message = '网络超时'
        break
      case 505:
        error.message = 'http版本不支持该请求'
        break
      default:
        error.message = `连接错误${error.response.status}`
        break
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
