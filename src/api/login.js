import request from '@/utils/request'
import { api as apiUrl } from './apiUrl'

export function login(params) {
  return request({
    url: apiUrl.login,
    method: 'post',
    data: params
  })
}

export function logout() {
  return request({
    url: apiUrl.logout,
    method: 'get'
  })
}
