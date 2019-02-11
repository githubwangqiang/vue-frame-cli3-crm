import request from '@/utils/request'
import { api as apiUrl } from './apiUrl/index.js'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

// 获取部门
export function getDepartments() {
  return request({
    url: apiUrl.departments,
    method: 'get'
  })
}

// 添加部门
export function addDepartments(params) {
  return request({
    url: apiUrl.departments,
    method: 'post',
    data: params
  })
}

// 修改部门名称
export function putDepartments(params) {
  const id = {
    id: params.id
  }
  return request({
    url: apiUrl.operateDepartments(id),
    method: 'put',
    data: params
  })
}

// 删除部门
export function deleteDepartments(params) {
  return request({
    url: apiUrl.operateDepartments(params),
    method: 'delete'
  })
}

// 查询所有角色信息
export function getRoles() {
  return request({
    url: apiUrl.roles,
    method: 'get'
  })
}

// 添加角色信息
export function addRoles(params) {
  return request({
    url: apiUrl.roles,
    method: 'post',
    data: params
  })
}

// 修改角色信息
export function changeRoles(params) {
  return request({
    url: apiUrl.roles,
    method: 'put',
    data: params
  })
}

// 修改角色信息
export function deleteRoles(params) {
  return request({
    url: apiUrl.roles + params.id,
    method: 'delete'
  })
}

// 获取当前角色的权限
export function getRoleModulePermissions(params) {
  return request({
    url: apiUrl.showRoleModulePermissions(params),
    method: 'get'
  })
}

// 获取所有模块
export function getModulePermissions(params) {
  return request({
    url: apiUrl.modulePermissions,
    method: 'get'
  })
}

// 给角色添加权限
export function addRoleModulePermissions(params) {
  console.log(apiUrl.changeRoleModulePermission)
  return request({
    url: apiUrl.changeRoleModulePermission,
    method: params.method,
    data: {
      moduleIds: params.moduleIds,
      roleId: params.roleId
    }
  })
}

// 给角色删除权限
export function deleteRoleModulePermissions(params) {
  return request({
    url: apiUrl.changeRoleModulePermission,
    method: 'post',
    data: {
      roleId: params.roleId
    }
  })
}
