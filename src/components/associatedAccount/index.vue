
<template>
  <el-dialog
    :visible.sync="dialogFormVisible"
    :title="title"
    class="associatedAccount-container">
    <!-- 关联账号 第一步 -->
    <div v-if="dialogType === 1">
      <el-form :model="form" class="associatedAccount-form">
        <el-form-item v-if="type === 1" label="关联方式" label-width="110px">
          <el-select v-model="form.type" placeholder="请选择活动区域">
            <el-option label="手机号" value="1"/>
            <el-option label="邮箱" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="type === 1"
          label="请输入"
          label-width="110px"
          class="associatedAccount-form-item">
          <el-input
            v-model="form.name"
            :placeholder="`朗播账号绑定${{1: '手机号', 2: '邮箱'}[form.type]}`"
            auto-complete="off"
            class="associatedAccount-input"/>
        </el-form-item>
        <el-form-item :label="{1: '选择产品', 2: '产品类型'}[type]" label-width="110px">
          <el-select v-model="form.product" placeholder="请选择活动区域">
            <el-option
              v-for="item in productList"
              :key="item"
              :label="item"
              :value="item"/>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- 已有账号 开通体验 -->
    <div v-if="dialogType === 2">
      <div class="associatedAccount-text">用户名：sssssss</div>
      <div class="associatedAccount-text">手机号：18101209754</div>
      <div class="associatedAccount-text">邮箱：18101209754@qq.com</div>
      <tables
        v-for="(item, idx) in list"
        :key="idx"
        :table-data="item"
        :table-head="tableHead[idx+1]"/>
    </div>
    <!-- 没有账号用户 创建账号并开通体验 -->
    <div v-if="dialogType === 3">
      <div class="associatedAccount-text">手机号：18101209754</div>
      <!-- <div class="associatedAccount-text">邮箱号：18101209754</div> -->
      <div class="associatedAccount-text">开通体验：toefl</div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleClick">{{ dialogType === 1 ? '关联' : '确定' }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import tables from '@/components/tables/index'
export default {
  name: 'AssociatedAccount',
  components: {
    tables
  },
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
      dialogFormVisible: false,
      form: {
        name: '',
        product: 'TOEFL 4.0',
        type: '1'
      },
      productList: ['TOEFL 4.0', 'GRE 3.0', 'IELTS 4.0', 'SAT 2.0', 'ACT 2.0', 'GMAT 2.0'],
      dialogType: 1,
      title: '',
      isUser: true,
      tableHead: {
        1: [{ prop: 'name', label: '体验产品' }, { prop: 'date', label: '体验时间' }],
        2: [{ prop: 'name', label: '已购买产品' }, { prop: 'date', label: '购买时间' }]
      },
      list: [
        [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      ]
    }
  },
  watch: {
    flag() {
      if (!this.flag) return false
      this.dialogFormVisible = this.flag
      this.title = this.type === 1 ? '关联/创建朗播账号' : '开通体验'
      this.dialogType = 1
      if (this.form.name) this.form.name = ''
      if (this.form.type !== '1') this.form.type = '1'
    },
    dialogFormVisible() {
      if (!this.dialogFormVisible) this.$emit('changeFlag')
    }
  },
  methods: {
    handleClick() {
      const type = this.dialogType
      // 第一步
      if (type === 1 && this.type === 1) {
        const mobileReg = /^1(3|4|5|7|8)\d{9}$/
        const emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
        const name = this.form.name.trim()
        let errorMessage = ''
        if (!name) {
          errorMessage = '请输入手机号或邮箱'
          if (this.form.name) this.form.name = ''
        } else if (!mobileReg.test(name) && !emailReg.test(name)) {
          errorMessage = '手机号或邮箱格式不正确'
        }
        if (errorMessage) {
          this.$message({
            message: errorMessage,
            type: 'warning',
            duration: 800
          })
        } else {
          // 调接口 查该用户是否有账号
          console.log(this.form)
          this.dialogType = this.isUser ? 2 : 3
          this.title = this.isUser ? '确认进行关联' : '是否创建账号'
        }
      } else {
        this.dialogFormVisible = false
      }
    }
  }
}
</script>

<style lang="scss">
  .associatedAccount-container {
    label {
      margin-right: 10px;
    }
    .el-dialog__body {
      padding-top: 15px;
    }
    .el-dialog {
      width: 380px;
    }
    .associatedAccount-input {
      width: 195px;
    }
    .associatedAccount-form-item {
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
    .associatedAccount-text {
      // line-height: 30px;
      height: 30px;
    }
    .associatedAccount-table {
      margin-top: 15px;
    }
  }
</style>
