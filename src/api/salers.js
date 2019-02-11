
import request from '@/utils/request'
import { api } from './apiUrl'
export function getUserList() {
  return request({
    url: api.getUsers,
    method: 'get'
  })
}
export function getRoles() {
  return request({
    url: api.roles,
    method: 'get'
  })
}
export function getMainUserList(params) {
  return request({
    url: api.mainUsers,
    method: 'post',
    data: params
  })
}

export function addSalers(userData) {
  return request({
    url: api.users,
    method: 'post',
    data: userData
  })
}

export function changeStatus(userId, userData) {
  return request({
    url: api.changeStatus({ userId }),
    method: 'put',
    data: userData
  })
}

export function editSalers(userData) {
  // userData.user = JSON.stringify(userData.user)
  return request({
    url: api.editSalers,
    method: 'post',
    data: userData
  })
}

export function getDepartments() {
  return request({
    url: api.departments,
    method: 'get'
  })
}

