const departments = {
  // 查询所有部门，添加部门
  departments: '/departments/',
  // 根据id查询部门，修改删除部门信息
  operateDepartments: params => {
    return '/departments/' + params.id
  },
  // 添加或删除部门用户信息
  departmentUsers: params => {
    return '/departments/' + params.departmentId + '/users/' + params.userId
  },
  // 批量添加或删除部门用户
  batchUsers: params => {
    return '/departments/' + params.departmentId + '/batchUsers'
  }
}

export default departments
