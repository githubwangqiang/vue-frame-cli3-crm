<template>
  <div class="app-container">
    <div class="addRole-wrapper">
      <el-button size="small" type="primary" class="addRole" @click="operate(0, {}, 4)">添加销售人员</el-button>
    </div>
    <el-table
      :data="userList"
      border
      max-height="400">
      <el-table-column
        :show-overflow-tooltip="true"
        fixed
        prop="langlibUserName"
        align="center"
        width="120"
        label="销售名称"/>
      <el-table-column
        prop="currStatus"
        align="center"
        label="当前状态">
        <template slot-scope="scope">
          <span v-if="scope.row.currStatus==1">启用</span>
          <span v-else>禁用</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="copyDeparts"
        align="center"
        label="所属部门"/>
      <el-table-column
        prop="copyRoles"
        align="center"
        label="角色"/>
      <el-table-column
        fixed="right"
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.currStatus==1"
            type="text"
            size="small"
            @click="operate(scope.$index, scope.row,2)">停用
          </el-button>
          <el-button
            v-else
            type="text"
            size="small"
            @click="operate(scope.$index, scope.row,1)">启用
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="operate(scope.$index, scope.row,3)">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <sales-management-dialog
      :operate-type="operateType"
      :index="index"
      :user-message="userMessage"
      :show-dialog="dialogVisible"
      @changeDialogFlag="changeDialogFlag"/>
  </div>
</template>
<script>
import salesManagementDialog from './components/SalesManagementDialogs'
export default {
  name: 'SalesManagement',
  components: {
    salesManagementDialog
  },
  data() {
    return {
      index: 0,
      dialogVisible: false,
      operateType: 0,
      userMessage: {},
      userList: []
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 设置操作类型，展示弹窗，传递索引
    operate(index, data, type) {
      this.index = index
      this.operateType = type
      this.dialogVisible = true
      console.log(data)
      this.userMessage = data
    },
    // 接收$emit
    changeDialogFlag(params) {
      this.dialogVisible = params.dialogVisible
      // 判断success，为true表示做了操作，false表示无操作
      if (params.success) {
        if (this.operateType === 1 || this.operateType === 2) {
          if (this.userList[this.index].currStatus === 1) {
            this.userList[this.index].currStatus = 2
          } else {
            this.userList[this.index].currStatus = 1
          }
        } else if (this.operateType === 3) {
          this.userList[this.index].copyDeparts = params.copyDeparts.toString()
          this.userList[this.index].copyRoles = params.copyRoles.toString()
          this.userList[this.index].departments = params.departments
          this.userList[this.index].roles = params.roles
        } else if (this.operateType === 4) {
          this.getUserList()
        }
      }
    },
    // 获取用户数据
    getUserList() {
      this.$axios.salers.getUserList().then(response => {
        this.changeData(response.data)
      })
    },
    changeData(list) {
      // 返回数据为user，roles，departments，修改数据格式，统一放入userList
      const dataList = []
      for (let i = 0; i < list.length; i++) {
        const obj = list[i].user
        if (list[i].listDepartments.length) {
          const copyDeparts = []
          list[i].listDepartments.forEach((item, index) => {
            copyDeparts.push(item.departmentName)
          })
          obj.copyDeparts = copyDeparts.toString()
        } else {
          obj.copyDeparts = '—'
        }
        if (list[i].listRoles.length) {
          const copyRoles = []
          list[i].listRoles.forEach((item, index) => {
            copyRoles.push(item.roleName)
          })
          obj.copyRoles = copyRoles.toString()
        } else {
          obj.copyRoles = '—'
        }
        obj.departments = list[i].listDepartments
        obj.roles = list[i].listRoles
        obj.langlibUserName = list[i].langlibUserName
        dataList.push(obj)
      }
      this.userList = dataList
    }
  }
}
</script>

<style lang="scss">
  .app-container {
    .el-table, .addRole-wrapper {
      width: 80%;
      margin:20px auto 0
    }
  }
</style>

