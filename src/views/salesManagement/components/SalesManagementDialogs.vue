<template>
  <div class="salesManagement-wrapper">
    <el-dialog
      :title="{1: '修改启动状态',2: '修改启动状态',3:'编辑销售人员',4:'添加销售人员'}[operateType]"
      :visible.sync="dialogVisible"
      :before-close="handleClose">
      <div v-if="operateType == 1">确定将销售状态改为启用状态？</div>
      <div v-else-if="operateType == 2">确定将销售状态改为停用状态？</div>
      <div v-else-if="operateType == 3">
        <el-form ref="form" label-width="100px">
          <el-form-item label="所属部门">
            <el-select
              v-model="departmentIds"
              :multiple-limit="3"
              multiple
              placeholder="请选择部门">
              <el-option
                v-for="item in departments"
                :key="item.id"
                :label="item.departmentName"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="角色">
            <el-select
              v-model="roleIds"
              :multiple-limit="3"
              multiple
              placeholder="请选择角色">
              <el-option
                v-for="item in roles"
                :key="item.id"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="销售类型">
            <el-checkbox v-model="netSales" data-userType="1">网销</el-checkbox>
            <el-checkbox v-model="telSales" data-userType="2">电销</el-checkbox>
          </el-form-item>
          <el-form-item v-if="telSales" label="座席号">
            <el-input v-model="userMessage.omniNumber"/>
          </el-form-item>
          <el-form-item v-if="telSales" label="坐席密码">
            <el-input v-model="userMessage.omniPwd"/>
          </el-form-item>
          <el-form-item v-if="netSales" label="微信号">
            <el-input v-model="userMessage.weiChat"/>
          </el-form-item>
          <el-form-item v-if="netSales" label="微信密码">
            <el-input v-model="userMessage.weiPwd"/>
          </el-form-item>
        </el-form>
      </div>
      <div v-else>
        <add-salers @getSalersMessage="getSalersMessage"/>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOperation">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import addSalers from './AddSaler'
export default {
  name: 'SalesManagementDialog',
  components: { addSalers },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    operateType: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    },
    userMessage: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      departments: [],
      roles: [],
      departmentIds: [],
      roleIds: [],
      saleTypes: [],
      dialogVisible: false,
      checkList: ['网销', '电销'],
      telSales: false,
      netSales: false,
      salersMessage: []
    }
  },
  watch: {
    showDialog() {
      this.departmentIds = []
      this.roleIds = []
      // 编辑用户操作
      if (this.operateType === 3) {
        // 判断是否展示座席号或微信号
        if (!this.userMessage.omniNumber) {
          this.telSales = false
        } else {
          this.telSales = true
        }
        if (!this.userMessage.weiChat) {
          this.netSales = false
        } else {
          this.netSales = true
        }
        // 将部门和角色的对象数组的id遍历出来直接放在数组里展示下拉框
        if (this.userMessage.departments.length) {
          this.userMessage.departments.forEach((item, index) => {
            this.departmentIds.push(item.departmentId)
          })
        } else {
          this.departmentIds = []
        }
        if (this.userMessage.roles.length) {
          this.userMessage.roles.forEach((item, index) => {
            this.roleIds.push(item.roleId)
          })
        } else {
          this.roleIds = []
        }
      }
      this.dialogVisible = this.showDialog
    },
    dialogVisible() {
      if (!this.dialogVisible) {
        this.$emit('changeDialogFlag', { dialogVisible: this.dialogVisible, success: false, operateType: this.operateType })
      }
    }
  },
  created() {
    // 获取所有部门和角色
    this.$axios.systemManagement.getDepartments().then(response => {
      this.forEach(response.data[0])
    })
    this.$axios.systemManagement.getRoles().then(response => {
      this.roles = response.data.list
    })
  },
  methods: {
    handleClose(done) {
      this.dialogVisible = false
    },
    saveOperation() {
      if (this.operateType === 1 || this.operateType === 2) {
        // 启用停用
        const params = {}
        const user = { currStatus: this.operateType }
        params.user = user
        this.$axios.salers.changeStatus(this.userMessage.id, params).then(response => {
          if (response.status === 200) {
            this.$message({
              message: '修改状态成功!',
              type: 'success'
            })
            this.$emit('changeDialogFlag', { dialogVisible: this.dialogVisible, success: true, operateType: this.operateType })
          }
        })
      } else if (this.operateType === 3) {
        // 编辑用户
        const obj = {}
        const user = {}
        if (this.departmentIds.length) {
          obj.departmentIds = this.departmentIds
        } else {
          this.$message({
            message: '请选择所属部门!',
            type: 'warning'
          })
          return
        }
        if (this.roleIds.length) {
          obj.roleIds = this.roleIds
        } else {
          this.$message({
            message: '请选择角色!',
            type: 'warning'
          })
          return
        }
        user.id = this.userMessage.id
        if (this.netSales && this.telSales) {
          user.userType = 3
        } else if (this.netSales && !this.telSales) {
          user.userType = 1
        } else if (!this.netSales && this.telSales) {
          user.userType = 2
        } else {
          this.$message({
            message: '请选择销售类型!',
            type: 'warning'
          })
          return
        }
        if (this.userMessage.omniNumber.trim()) {
          user.omniNumber = this.userMessage.omniNumber
        } else {
          if (user.userType !== 1) {
            this.$message({
              message: '请输入座席号!',
              type: 'warning'
            })
            return
          }
        }
        if (this.userMessage.omniPwd.trim()) {
          user.omniPwd = this.userMessage.omniPwd
        } else {
          if (user.userType !== 1) {
            this.$message({
              message: '请输入座席密码!',
              type: 'warning'
            })
            return
          }
        }
        if (this.userMessage.weiChat.trim()) {
          user.weiChat = this.userMessage.weiChat
        } else {
          if (user.userType !== 2) {
            this.$message({
              message: '请输入微信号!',
              type: 'warning'
            })
            return
          }
        }
        if (this.userMessage.weiPwd.trim()) {
          user.weiPwd = this.userMessage.weiPwd
        } else {
          if (user.userType !== 2) {
            this.$message({
              message: '请输入微信密码!',
              type: 'warning'
            })
            return
          }
        }
        obj.user = user
        this.$axios.salers.editSalers(obj).then(response => {
          if (response.status === 200) {
            this.$message({
              message: '编辑用户成功!',
              type: 'success'
            })
            // 修改列表数据
            const copyDeparts = []
            const copyRoles = []
            const roles = response.data[this.index].listRoles
            const departments = response.data[this.index].listDepartments
            this.departments.forEach((item, index) => {
              if (obj.departmentIds.indexOf(item.id) > -1) {
                copyDeparts.push(item.departmentName)
              }
            })
            this.roles.forEach((item, index) => {
              if (obj.roleIds.indexOf(item.id) > -1) {
                copyRoles.push(item.name)
              }
            })
            this.$emit('changeDialogFlag', { dialogVisible: this.dialogVisible, success: true, operateType: 3, copyRoles, copyDeparts, roles, departments })
          }
        })
      } else if (this.operateType === 4) {
        // 添加用户，批量添加功能待开发
        if (this.salersMessage[0]) {
          const obj = {}
          obj.langlibUserId = this.salersMessage[0].langlibUserId
          obj.langlibUserName = this.salersMessage[0].langlibUserName
          this.$axios.salers.addSalers(obj).then(response => {
            if (response.status === 200) {
              this.$message({
                message: '添加成功!',
                type: 'success'
              })
              this.$emit('changeDialogFlag', { dialogVisible: this.dialogVisible, success: true, operateType: 4 })
            }
          })
        } else {
          this.$message({
            message: '请先选择销售人员!',
            type: 'warning'
          })
          return
        }
      }
      this.dialogVisible = false
    },
    // 添加用户信息
    getSalersMessage(data) {
      this.salersMessage = data
    },
    forEach(data) {
      this.departments.push({
        departmentName: data.departmentName,
        id: data.id
      })
      if (data.children && data.children.length) {
        for (let i = 0; i < data.children.length; i++) {
          this.forEach(data.children[i])
        }
      }
    }
  }
}
</script>
<style lang="scss">
  .salesManagement-wrapper {
    .el-select {
      width: 100%;
    }
  }
</style>
