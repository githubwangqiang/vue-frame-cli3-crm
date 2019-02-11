const salers = {
  // 获取主站用户
  mainUsers: '/users/findMainUsers/',
  // 添加用户
  users: '/users/',
  // 获取用户集合
  getUsers: '/users/userAllInfo/',
  // 更改用户状态
  changeStatus: params => {
    return '/users/' + params.userId
  },
  // 编辑用户信息
  editSalers: '/users/userAllInfo/'
}

export default salers
