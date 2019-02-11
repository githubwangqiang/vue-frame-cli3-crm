<template>
  <div class="netSaleClient-container">
    <!-- 单选按钮 -->
    <div class="netSaleClient-list">
      <span>查询方式：</span>
      <el-radio v-model="radio" label="1">条件查询</el-radio>
      <el-radio v-model="radio" label="2">精准查询</el-radio>
    </div>
    <!-- form表单 -->
    <div v-if="radio === '1'">
      <div class="netSaleClient-list">
        <span>网销销售：</span>
        <el-select
          v-model="selectForm.langlibName"
          placeholder="请选择"
          class="netSaleClient-select">
          <el-option
            v-for="item in selectOptions"
            :key="item"
            :label="item"
            :value="item"/>
        </el-select>
      </div>
      <div class="netSaleClient-list">
        <span>添加时间：</span>
        <el-date-picker
          v-model="selectForm.month"
          size="small"
          type="month"
          placeholder="选择月份"/>
        <!-- 已确认网销客户 显示 -->
        <div v-if="type === 2" class="netSaleClient-list-div">
          <span>优先级：</span>
          <el-select
            v-model="selectForm.priorityValue"
            size="small"
            placeholder="请选择"
            class="netSaleClient-list-priority">
            <el-option
              v-for="item in priorityOptions"
              :key="item"
              :label="item"
              :value="item"/>
          </el-select>
          <span>敏感行为：</span>
          <el-select
            v-model="selectForm.sensitiveBehaviorValue"
            size="small"
            placeholder="请选择"
            class="netSaleClient-list-priority">
            <el-option
              v-for="item in sensitiveBehaviorOptions"
              :key="item"
              :label="item"
              :value="item"/>
          </el-select>
        </div>
        <el-button
          type="primary"
          class="netSaleClient-query"
          size="small"
          @click="query">
          查询
        </el-button>
      </div>
    </div>
    <div v-else>
      <div class="netSaleClient-list">
        <span>联系方式：</span>
        <el-select
          v-model="selectForm.contactWay"
          size="small"
          placeholder="请选择"
          class="netSaleClient-select">
          <el-option
            v-for="item in contactWaySelect[type]"
            :key="item.type"
            :label="item.name"
            :value="item.type"/>
        </el-select>
        <el-input
          v-model="selectForm.contactNumber"
          placeholder="请输入内容"
          size="small"
          class="netSaleClient-number"/>
        <el-button
          type="primary"
          class="netSaleClient-query"
          size="small"
          @click="query">
          查询
        </el-button>
      </div>
    </div>
    <!-- 表格 -->
    <tables :type="type" :radio="radio"/>
  </div>
</template>

<script>
import tables from './NetSaleClientTable'
export default {
  name: 'NetSaleClient',
  components: {
    tables
  },
  props: {
    type: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      radio: '1',
      selectForm: {
        langlibName: '',
        month: new Date(),
        contactWay: '',
        priorityValue: '',
        sensitiveBehaviorValue: '',
        contactNumber: ''
      },
      selectOptions: ['lbtest0425b', 'lbtest0425b22', 'lbtest0425b3w', 'lbtest0425b2dfg', 'lbtest0425bss'],
      contactWaySelect: {
        1: [
          {
            type: 1,
            name: '微信'
          }, {
            type: 2,
            name: 'QQ'
          }
        ],
        2: [
          {
            type: 3,
            name: '手机号'
          },
          {
            type: 1,
            name: '微信'
          },
          {
            type: 2,
            name: 'QQ'
          }
        ]
      },
      priorityOptions: ['全部', '4', '3', '2', '1'],
      sensitiveBehaviorOptions: ['全部', '购买产品', '点击购买按钮', '试听方法课', '点击优惠活动首页/购买', '首页banner', '完成小程序测评', '生成智能训练计划', '完成体验联系Task', '观看公开课', '开启小程序测评', '开启评测', '开通体验', '注册']
    }
  },
  watch: {
    radio() {
      this.selectForm.contactWay = this.type === 2 && this.radio === '2' ? 3 : 1
    }
  },
  created() {
    this.selectForm.contactWay = 1
    this.selectForm.langlibName = this.selectOptions[0]
    this.selectForm.priorityValue = this.priorityOptions[0]
    this.selectForm.sensitiveBehaviorValue = this.sensitiveBehaviorOptions[0]
  },
  methods: {
    query() {
      let errorMessage = ''
      let form = {}
      switch (true) {
        case this.type === 1 && this.radio === '1' || this.type === 2 && this.radio === '1':
          form = {
            langlibName: this.selectForm.langlibName,
            month: this.selectForm.month
          }
          if (this.type === 2 && this.radio === '1') {
            form.priorityValue = this.selectForm.priorityValue
            form.sensitiveBehaviorValue = this.selectForm.sensitiveBehaviorValue
          }
          if (!form.month) errorMessage = '请选择添加时间'
          break
        default: {
          form = {
            contactWay: this.selectForm.contactWay,
            contactNumber: this.selectForm.contactNumber
          }
          if (!form.contactNumber.trim()) errorMessage = '请输入联系方式'
          const reg = /^1(3|4|5|7|8)\d{9}$/
          if (form.contactWay === 3 && !reg.test(form.contactNumber)) errorMessage = '请输入正确的手机号码'
        }
      }
      // 未输入或选择内容弹出错误信息
      if (errorMessage) {
        this.errorMessage(errorMessage)
        return false
      }
      // 请求查询接口
      console.log(form)
    },
    errorMessage(message) {
      this.$message({
        message,
        type: 'warning',
        duration: 800
      })
    }
  }
}
</script>

<style lang="scss">
  .netSaleClient-container {
    .el-button + .el-button {
      margin-left: 0;
      margin-top: 10px;
    }
    .el-button {
      white-space: inherit;
    }
    .netSaleClient-table-btn {
      width: 110px;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .netSaleClient-footer {
      margin-top: 20px;
      & > div {
        float: right;
        padding: 0;
      }
      .el-pagination__sizes {
        margin: 0;
      }
    }
    .el-pagination .el-select .el-input {
      margin: 0;
    }
  }
</style>

<style lang="scss" scoped>
  .netSaleClient-container {
    margin: 20px;
    .netSaleClient-list {
      line-height: 50px;
      & > span {
        display: inline-block;
        width: 90px;
      }
    }
    .netSaleClient-select {
      width: 200px;
    }
    .netSaleClient-query {
      margin-left: 15px;
      width: 80px;
    }
    .netSaleClient-table {
      margin-top: 15px;
    }
    .netSaleClient-number {
      width: 200px;
      margin-left: 15px;
    }
    .netSaleClient-list-div {
      display: inline-block;
      & > span {
        margin-left: 15px;
      }
    }
    .netSaleClient-list-priority {
      margin-left: 10px;
    }
  }
</style>

