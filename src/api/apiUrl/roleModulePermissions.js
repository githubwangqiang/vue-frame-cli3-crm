const roleModulePermissions = {
  // 给制定用户添加或删除角色
  usersRoles: params => {
    return '/users/' + params.userId + '/roles/' + params.roleId
  },
  // 查询添加角色
  roles: '/roles/',
  // 查询角色名称、修改删除角色
  operateRoles: params => {
    return '/roles/' + params.id
  },
  // 修改角色模块权限
  changeRoleModulePermission: '/roleModulePermissions/batchRoles',
  // 查询角色模块权限
  showRoleModulePermissions: params => {
    return '/roleModulePermissions/' + params.userId
  },
  // 查询所有的模块权限
  modulePermissions: '/modulePermissions/'
}

export default roleModulePermissions
