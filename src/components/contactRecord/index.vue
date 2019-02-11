<template>
  <el-dialog
    :class="{1: 'contactRecord-container-800', 2: 'contactRecord-container-800', 3: 'contactRecord-container-500'}[type]"
    :title="{1: '添加待确认客户联系记录', 2: '添加已确认客户联系记录', 3: '添加联系记录'}[type]"
    :visible.sync="dialogFormVisible"
    class="contactRecord-container">
    <el-form :model="form" class="contactRecord-form">
      <el-form-item label="下次联系时间" label-width="110px" class="contactRecord-form-item">
        <el-date-picker
          v-model="form.date"
          :picker-options="pickerOptions"
          type="date"
          placeholder="选择日期"/>
      </el-form-item>
      <el-form-item label="优先级" label-width="110px" class="contactRecord-form-item">
        <el-select v-model="form.priority" placeholder="请选择优先级">
          <el-option
            v-for="item in priorityList"
            :key="item"
            :label="item"
            :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item
        label-width="110px"
        label="联系记录"
        class="contactRecord-form-item">
        <el-input
          v-model="form.textarea"
          type="textarea"
          auto-complete="off"
          class="contactRecord-textarea"
          placeholder="长度不得超过500字"/>
      </el-form-item>
    </el-form>
    <el-table
      v-if="type !== 3"
      :data="gridData"
      max-height="250"
      border
      style="width: 100%">
      <el-table-column
        v-for="(item, idx) in tableTop"
        :key="idx"
        :prop="item.prop"
        :label="item.label"
        align="center"/>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleClick">添加</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'ContactRecord',
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    type: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      gridData: [{
        time: '2016-05-02',
        user: '王小虎',
        jilu: '上海市普陀区金沙江路 1518 弄'
      }, {
        time: '2016-05-04',
        user: '王小虎',
        jilu: '上海市普陀区金沙江路 1518 弄'
      }, {
        time: '2016-05-01',
        user: '王小虎',
        jilu: '上海市普陀区金沙江路 1518 弄'
      }, {
        time: '2016-05-03',
        user: '王小虎',
        jilu: '上海市普陀区金沙江路 1518 弄'
      }, {
        time: '2016-05-03',
        user: '王小虎',
        jilu: '上海市普陀区金沙江路 1518 弄'
      }, {
        time: '2016-05-03',
        user: '王小虎',
        jilu: '上海市普陀区金沙江路 1518 弄'
      }],
      dialogFormVisible: false,
      form: {
        date: new Date(),
        priority: 2,
        textarea: ''
      },
      priorityList: ['4', '3', '2', '1'],
      tableTop: [
        {
          prop: 'time',
          label: '联系时间'
        },
        {
          prop: 'jilu',
          label: '联系记录'
        },
        {
          prop: 'user',
          label: '联系人'
        }
      ],
      tableData: [],
      pickerOptions: {
        disabledDate(value) {
          const today = new Date()
          if (new Date(today.getFullYear(), today.getMonth(), today.getDate()) > value) return true
          return false
        }
      }
    }
  },
  watch: {
    flag() {
      if (!this.flag) return false
      this.dialogFormVisible = this.flag
    },
    dialogFormVisible() {
      if (!this.dialogFormVisible) this.$emit('changeFlag')
    }
  },
  methods: {
    handleClick() {
      let errorMessage = ''
      if (!this.form.date) errorMessage = '请选择日期'
      if (!this.form.textarea.trim()) errorMessage = '请添加联系记录'
      if (errorMessage) {
        this.$message({
          message: errorMessage,
          type: 'warning',
          duration: 800
        })
        return false
      }
      // 请求接口
      console.log(this.form)
      // this.$emit('sendData', this.form)
    }
  }
}
</script>

<style lang="scss">
  .contactRecord-container {
    label {
      margin-right: 10px;
    }
    .contactRecord-textarea {
      width: 300px;
    }
    .contactRecord-form-item {
      label {
        position: relative;
      }
      label:after {
        content: '*';
        position: absolute;
        top: 2px;
        right: -2px;
        color: red;
      }
    }
    .dialog-footer button {
      width: 100px;
    }
  }
  .contactRecord-container-800 {
    .el-dialog { width: 800px; }
  }
  .contactRecord-container-500 {
    .el-dialog { width: 500px; }
  }
</style>
