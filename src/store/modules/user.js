import { login, logout } from '@/api/login'
import * as Auth from '@/utils/auth'

const user = {
  state: {
    token: Auth.getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      userInfo.langlibUserName = userInfo.langlibUserName.replace(/\s+/g, '')
      userInfo.langlibPwd = userInfo.langlibPwd
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const data = response.data
          Auth.setLanglibUserName(userInfo.langlibUserName)
          Auth.setToken(data.loginToken)
          commit('SET_TOKEN', data.loginToken)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          Auth.removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        Auth.removeToken()
        resolve()
      })
    }
  }
}

export default user
