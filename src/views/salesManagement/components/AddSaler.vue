<template>
  <div class="addSaler-wrapper">
    <el-form ref="form" label-width="80px" @submit.native.prevent>
      <el-form-item label="查询销售:">
        <el-input
          v-model="searchContent"
          label="所属部门"
          placeholder="请输入内容"
          clearable
          @keyup.enter.native="search"/>
        <el-button id="search" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="userList"
      max-height="250"
      border
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column
        prop="langlibUserName"
        label="销售名称"
        width="120"/>
      <el-table-column
        prop="mainEmail"
        label="邮箱"
        show-overflow-tooltip/>
    </el-table>
  </div>
</template>

<script>
export default{
  name: 'AddSalers',
  props: {},
  data() {
    return {
      searchContent: '',
      userList: [],
      multipleSelection: []
    }
  },
  created() {
  },
  methods: {
    // 批量添加用户多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('getSalersMessage', val)
    },
    search() {
      this.getMainUserList()
    },
    // 获取主站用户
    getMainUserList() {
      if (this.searchContent.trim()) {
        const params = { queryMainValue: this.searchContent }
        this.$axios.salers.getMainUserList(params).then(response => {
          this.userList = response.data
        })
      } else {
        this.$message({
          message: '请输入内容!',
          type: 'warning'
        })
        return
      }
    }
  }
}
</script>
<style lang="scss">
  .addSaler-wrapper {
    #search {
      margin-bottom: 10px;
    }
    .el-input {
      width: 72%;
      margin-right: 2%;
    }
  }
</style>
