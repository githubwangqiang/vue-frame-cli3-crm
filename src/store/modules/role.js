import { getModulePermissions } from '@/api/systemManagement.js'

const role = {
  state: {
    oldModulePermissions: []
  },

  mutations: {
    SET_MODULEPERMISSIONS: (state, modulePermissions) => {
      state.modulePermissions = modulePermissions
    }
  },

  actions: {
    setModulePermissions({ commit }) {
      return new Promise((resolve, reject) => {
        getModulePermissions().then(rs => {
          commit('SET_MODULEPERMISSIONS', rs.data)
          resolve()
        }).catch(err => reject(err))
      })
    }
  }
}

export default role
