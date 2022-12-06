import { API } from '@/utils/api'

// 通过账号密码登录
export function serviceLogin(data) {
  return API.post('login', data)
}
