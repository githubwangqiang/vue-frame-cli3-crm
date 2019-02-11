<template>
  <div class="table-wrap">
    <el-button
      type="primary"
      class="table-add"
      size="small"
      @click="change(null, null, 4)">
      添加角色
    </el-button>
    <el-table
      :data="tableData"
      border
      width="80%">
      <el-table-column
        type="index"
        align="center"
        label="编号"
        width="100"/>
      <el-table-column
        prop="name"
        label="角色"
        align="center"/>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="change(scope.$index, tableData, 1)">
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="change(scope.$index, tableData, 2)">
            授权
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="change(scope.$index, tableData, 3)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <system-management-authorization
      :show-dialog="showDialog"
      :options="options"
      @changeDialogFlag="changeDialogFlag"
      @sendData="getData"/>
  </div>
</template>

<script>
import systemManagementAuthorization from './SystemManagementAuthorization'
import { Message } from 'element-ui'
export default {
  name: 'SystemManagementTable',
  components: {
    systemManagementAuthorization
  },
  data() {
    return {
      tableData: [],
      showDialog: false,
      type: 1,
      options: {}
    }
  },
  created() {
    // 获取所有角色信息
    this.getRoles()
    this.$store.dispatch('setModulePermissions')
  },
  methods: {
    change(index, rows, n) {
      this.showDialog = true
      this.options.type = n
      this.options.index = index
      if (n !== 4) this.options.id = rows[index].id
      if (n === 1) this.options.name = rows[index].name
    },
    changeDialogFlag(bool) {
      this.showDialog = bool
    },
    getData(data) {
      switch (true) {
        case this.options.type === 1:
          this.changeRoles({ name: data.name })
          break
        case this.options.type === 2:
          break
        case this.options.type === 3:
          this.deleteRoles()
          break
        default:
          this.addRoles(data)
      }
    },
    // 获取角色信息
    getRoles() {
      this.$axios.systemManagement.getRoles().then(res => {
        this.tableData = res.data.list
      })
    },
    // 添加角色
    addRoles(name) {
      this.$axios.systemManagement.addRoles({ roleName: name }).then(() => {
        this.messageAndUpdata('添加成功')
        this.getRoles()
      })
    },
    // 修改名称
    changeRoles(params) {
      const result = this.$axios.systemManagement.changeRoles({ roleId: this.options.id, roleName: params.name })
      result.then(rs => {
        this.messageAndUpdata('修改成功')
        this.tableData[this.options.index].name = params.name
      })
    },
    deleteRoles() {
      const result = this.$axios.systemManagement.deleteRoles({ id: this.options.id })
      result.then(rs => {
        this.messageAndUpdata('删除成功')
        this.tableData.splice(this.options.index, 1)
      })
    },
    messageAndUpdata(text, type) {
      Message({
        message: text,
        type: 'success'
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang='scss'>
  .table-wrap {
    width: 80%;
    margin: 0 auto;
    .el-table {
     margin: 0 auto;
    }
    .table-add {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
</style>
