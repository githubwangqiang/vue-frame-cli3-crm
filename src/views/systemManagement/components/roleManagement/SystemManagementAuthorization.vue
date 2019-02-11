<template>
  <el-dialog
    :visible.sync="dialogFormVisible"
    :class="{2: 'authorization-wrap-700'}[options.type]"
    :title="{1: '修改角色', 2: '授权角色', 3: '删除角色', 4: '添加角色'}[options.type]"
    class="authorization-wrap">
    <div v-if="options.type == 1">
      <el-input v-model="options.name" placeholder="请输入内容"/>
    </div>
    <div v-else-if="options.type === 2" class="authorization-table-wrap">
      <el-tabs type="border-card" class="authorization-table">
        <el-tab-pane
          v-for="(item, n1) in list"
          :key="n1"
          :label="item.text">
          <div class="check-box-all">
            <label>
              <input
                :data-type="'checkBoxWrap-' + n1 + '-checkAll'"
                :checked="item.checked"
                type="checkbox"
                @change="changeCheckedAll"> 全选
            </label>
          </div>
          <div
            v-for="obj1 in item.children"
            :key="obj1.id"
            class="check-box-group">
            <p>
              <label>
                <input
                  v-if="!obj1.children"
                  :checked="obj1.checked"
                  :data-type="'checkBoxWrap-' + n1"
                  :data-id="obj1.id"
                  type="checkbox"
                  @change="changeCheckBox">
                {{ obj1.text }}
              </label>
            </p>
            <div v-if="obj1.children">
              <label v-for="obj2 in obj1.children" :key="obj2.id">
                <input
                  :checked="obj2.checked"
                  :data-type="'checkBoxWrap-' + n1"
                  :data-id="obj2.id"
                  type="checkbox"
                  @change="changeCheckBox"> {{ obj2.text }}
              </label>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div v-else-if="options.type === 3">
      <p>是否要删除该角色？</p>
    </div>
    <div v-else>
      <el-input v-model="roleName" placeholder="请输入角色名称"/>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button :type="options.type === 3 ? 'info' : 'primary'" @click="saveCheckBox">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
/*
  options.type:
    0 -> 修改角色名称
    1 -> 授权
    3 -> 删除
    3 -> 添加
*/
import { Message } from 'element-ui'
import { mapGetters } from 'vuex'
export default {
  name: 'Authorization',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      roleName: '',
      chooseRoleModulePermissions: {},
      list: [],
      prevChooseArr: []
    }
  },
  computed: {
    ...mapGetters(['modulePermissions'])
  },
  watch: {
    showDialog() {
      if (!this.showDialog) return false
      this.dialogFormVisible = this.showDialog
      if (this.roleName && this.options.type === 4) this.roleName = ''
      if (this.showDialog && this.options.type === 1) this.roleName = this.options.name
      if (this.options.type === 2) {
        new Promise(resolve => {
          this.getRoleModulePermissions(resolve)
        }).then(() => {
          const nodeArr = document.querySelectorAll('input')
          const keys = {}
          nodeArr.forEach(item => {
            const key = item.getAttribute('data-type').split('-checkAll')
            if (!Object.keys(keys).includes(key[0])) keys[key[0]] = {}
          })
          Object.keys(keys).forEach(key => {
            this.checkAllCheckBox(document.querySelectorAll(`input[data-type=${key}]`), key)
          })
        })
      }
    },
    dialogFormVisible() {
      if (!this.dialogFormVisible) this.$emit('changeDialogFlag', this.dialogFormVisible)
    }
  },
  methods: {
    saveCheckBox() {
      if (this.options.type === 4 && !this.roleName || this.options.type === 1 && !this.options.name) {
        this.$message({
          message: '请输入角色名称',
          type: 'error'
        })
        return false
      }
      switch (true) {
        case this.options.type === 1 || this.options.type === 3:
          this.$emit('sendData', this.options)
          break
        case this.options.type === 2:
          this.addRoleModulePermissions()
          break
        default:
          this.$emit('sendData', this.roleName)
      }
      this.dialogFormVisible = false
    },
    cancel() {
      this.dialogFormVisible = false
    },
    addRoleModulePermissions() {
      let moduleIds = []
      for (const key in this.chooseRoleModulePermissions) {
        moduleIds = [...this.chooseRoleModulePermissions[key]]
      }
      const params = {
        roleId: this.options.id,
        // moduleIds: moduleIds.join(),
        moduleIds: moduleIds,
        method: this.prevChooseArr.length ? 'put' : 'post'
      }
      const result = this.$axios.systemManagement.addRoleModulePermissions(params)
      result.then(rs => {
        Message({
          message: '授权成功',
          type: 'success'
        })
      })
    },
    forEach(data, arr) {
      data.checked = arr.includes(data.id)
      if (data.children && data.children.length) {
        for (let i = 0; i < data.children.length; i++) {
          this.forEach(data.children[i], arr)
        }
      }
    },
    // 全选 / 全不选
    changeCheckedAll($event) {
      const bool = $event.target.checked
      const key = $event.target.getAttribute('data-type').split('-checked')
      const nodeArr = document.querySelectorAll(`input[data-type=${key[0]}]`)
      nodeArr.forEach(element => {
        element.checked = bool
      })
      this.chooseCheckBoxId(key[0])
    },
    // 复选按钮
    changeCheckBox(e) {
      const key = e.target.getAttribute('data-type')
      const nodeArr = document.querySelectorAll(`input[data-type=${key}]`)
      this.checkAllCheckBox(nodeArr, key)
      this.chooseCheckBoxId(key)
    },
    checkAllCheckBox(nodeArr, key) {
      let count = 0
      nodeArr.forEach(element => {
        if (element.checked) count++
      })
      document.querySelector('input[data-type=' + key + '-checkAll]').checked = count === nodeArr.length || false
    },
    // 获取选择的id
    chooseCheckBoxId(key) {
      const nodeArr = document.querySelectorAll(`input:checked`)
      const chooseCheckBoxId = []
      if (!nodeArr.length) return false
      nodeArr.forEach(item => {
        if (item.getAttribute('data-id')) {
          chooseCheckBoxId.push(item.getAttribute('data-id'))
        }
      })
      this.chooseRoleModulePermissions[this.options.id] = chooseCheckBoxId
    },
    // 获取角色的权限
    getRoleModulePermissions(resolve) {
      const result = this.$axios.systemManagement.getRoleModulePermissions({ userId: this.options.id })
      result.then(rs => {
        this.prevChooseArr = rs.data
        const arr = []
        const data = [...this.modulePermissions]
        this.prevChooseArr.forEach(item => {
          arr.push(item.id)
        })
        data.forEach(item => {
          this.forEach(item, arr)
        })
        this.list = data
        resolve()
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang='scss'>
  .authorization-wrap {
    .el-dialog {
      width: 400px;
    }
    .el-checkbox-group {
      font-size: 16px;
    }
    .authorization-table {
      width: 600px;
      margin: 0 auto;
    }
  }
  .authorization-wrap-700 {
    .el-dialog {
      width: 700px;
    }
  }
</style>
