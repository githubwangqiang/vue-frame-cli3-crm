<template>
  <el-dialog :visible.sync="flag" :title="dialogOpt.title" class="edit-wrap" >
    <ul v-if="dialogOpt.type">
      <li>
        <p>上级部门</p>
        <el-input v-model="dialogOpt.superiorDepartment" :disabled="true"/>
      </li>
      <li>
        <p> {{ dialogOpt.type === 1 ? "新建名称" : "部门名称" }}</p>
        <el-input v-model="dialogOpt.departmentName" placeholder="请输入部门名称"/>
      </li>
    </ul>
    <p v-else>{{ deleteText }}</p>
    <div v-if="dialogOpt.type" slot="footer" class="el-dialog__footer">
      <el-button type="primary" @click="saveDepartment">保存</el-button>
    </div>
    <div v-else slot="footer" class="el-dialog__footer">
      <el-button type="primary" @click="chooseDelete">取消</el-button>
      <el-button type="info" @click="chooseDelete(1)">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'SystemManagementDialog',
  props: {
    editFlag: {
      type: Boolean,
      default: false
    },
    dialogOpt: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      flag: false,
      deleteText: '是否要删除该部门？'
    }
  },
  watch: {
    editFlag() {
      if (!this.editFlag) this.flag = this.editFlag
    },
    flag() {
      if (!this.flag) this.$emit('changeEditFlag', false)
    }
  },
  methods: {
    saveDepartment() {
      if (!this.dialogOpt.departmentName) {
        this.$message({
          message: '请输入部门名称',
          type: 'error'
        })
        return false
      }
      this.$emit('sendData', this.dialogOpt)
      this.$emit('changeEditFlag', false)
    },
    chooseDelete(n) {
      this.$emit('changeEditFlag', false)
      if (n) this.$emit('sendData', this.dialogOpt)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang='scss'>
  .edit-wrap {
    .el-dialog {
      width: 400px;
    }
    .el-dialog__header {
      text-align: center;
    }
    .el-dialog__body p {
      line-height: 40px;
    }
  }
</style>
