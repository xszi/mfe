import request from './request'
import { Message } from 'element-ui'
import { logout } from '@/utils/util'

const apiUrl = process.env.NODE_ENV !== 'development' ? process.env.VUE_APP_URL : process.env.VUE_APP_API_PROXY_PREFIX + '/'

// 签署流程工具后台管理api
export const API = {
  /**
   * @param {String} url 请求地址
   * @param {JSON} params 参数
   */
  get: async(url, params) => {
    const res = await get(apiUrl + url, params)
    if (res.code === 0) {
      return res
    } else if (res.code === 10003) {
      Message({
        type: 'error',
        message: res.message
      })
      setTimeout(() => {
        logout()
      }, 2000)
    } else {
      Message({
        type: 'error',
        message: res.message
      })
      return res
    }
  },
  /**
   * @param {String} url 请求地址
   * @param {JSON} params 参数
   */
  post: async(url, params) => {
    const res = await post(apiUrl + url, params)
    console.log(res, 'mmm')
    if (res.code === 0) {
      return res
    } else if (res.code === 10003) {
      Message({
        type: 'error',
        message: res.message
      })
      setTimeout(() => {
        logout()
      }, 2000)
    } else {
      Message({
        type: 'error',
        message: res.message
      })
      return res
    }
  },
  /**
   * @param {String} url 请求地址
   * @param {JSON} params 参数
   */
  upload: async(url, params) => {
    const res = await upload(apiUrl + url, params)
    if (res.code === 0) {
      return res
    } else if (res.code === 10003) {
      Message({
        type: 'error',
        message: res.message
      })
      setTimeout(() => {
        logout()
      }, 2000)
    } else {
      Message({
        type: 'error',
        message: res.message
      })
      return res
    }
  }
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get(url, params) {
  return new Promise((resolve, reject) => {
    request.get(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        Message({
          type: 'error',
          message: '网络异常'
        })
        reject(err)
      })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function post(url, params) {
  return new Promise((resolve, reject) => {
    request.post(url, params, {
      headers: { 'Content-Type': 'application/json; UTF-8' }
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        Message({
          type: 'error',
          message: '网络异常'
        })
        reject(err)
      })
  })
}

/**
 * upload方法，对应upload请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function upload(url, params) {
  return new Promise((resolve, reject) => {
    request.post(url, params, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        Message({
          type: 'error',
          message: '网络异常'
        })
        reject(err)
      })
  })
}
