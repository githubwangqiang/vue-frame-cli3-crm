<template>
  <div class="clientInfo-wrapper">
    <div v-if="type == 1" class="record">
      <el-button size="small" type="primary" @click="showRecord">查看微信聊天记录</el-button>
      <el-button size="small" type="primary">添加联系记录</el-button>
    </div>
    <tables
      v-if="type !== 3"
      :is-index="type === 1 || type === 5"
      :table-data="{1: tableData1, 2: tableData2, 4: tableData4, 5: tableData5, 6: tableData6}[type]"
      :table-head="tableTop"/>
    <div v-else>
      <table
        v-for="item in tableData3"
        :key="item.id"
        class="resultTable">
        <tr>
          <td>科目</td>
          <td>{{ item.subject }}</td>
          <td>开始测评时间</td>
          <td>{{ item.openTime }}</td>
          <td>生成计划时间</td>
          <td>{{ item.resultTime }}</td>
        </tr>
        <tr>
          <td>目标分数</td>
          <td>{{ item.targetScore }}</td>
          <td>考试时间</td>
          <td>{{ item.testTime }}</td>
          <td>对应分数</td>
          <td>{{ item.score }}</td>
        </tr>
        <tr>
          <td>词汇量</td>
          <td>{{ item.word }}</td>
          <td>听力正确率</td>
          <td>{{ item.listenRight }}</td>
          <td>阅读正确率</td>
          <td>{{ item.readRight }}</td>
        </tr>
        <tr>
          <td>口语正确率</td>
          <td>{{ item.oralRight }}</td>
          <td>写作正确率</td>
          <td>{{ item.writeRight }}</td>
          <td>语法正确率</td>
          <td>{{ item.grammerRight }}</td>
        </tr>
      </table>
    </div>
    <show-record :show="showDialog" @changeShow="changeShow"/>
  </div>
</template>
<script>
import { clientInfoTableTop } from '@/utils/tableHead.js'
import showRecord from './ShowRecord'
import tables from '@/components/tables/index'
export default {
  components: {
    showRecord,
    tables
  },
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      showDialog: false,
      tableData1: [{
        priority: '1',
        record: '客户于 2018-10-09 申请雅思名师方法论试听课',
        date: '2016-05-02',
        name: '王小虎'
      }, {
        priority: '1',
        record: '客户于 2018-10-09 申请雅思名师方法论试听课',
        date: '2016-05-02',
        name: '王小虎'
      }, {
        priority: '1',
        record: '客户于 2018-10-09 申请雅思名师方法论试听课',
        date: '2016-05-02',
        name: '王小虎'
      }, {
        priority: '1',
        record: '客户于 2018-10-09 申请雅思名师方法论试听课',
        date: '2016-05-02',
        name: '王小虎'
      }],
      tableData2: [{
        date: '2016-05-02',
        operation: '体验IELTS Online(网销（微信）)'
      }, {
        date: '2016-05-02',
        operation: '体验IELTS Online(网销（微信）)'
      }, {
        date: '2016-05-02',
        operation: '体验IELTS Online(网销（微信）)'
      }, {
        date: '2016-05-02',
        operation: '体验IELTS Online(网销（微信）)'
      }],
      tableData3: [{
        subject: 'TOFEL',
        openTime: '2018-09-20',
        resultTime: '2018-09-20',
        targetScore: '80',
        testTime: '2018-09-20',
        score: '90',
        word: '2000',
        listenRight: '80%',
        readRight: '80%',
        oralRight: '80%',
        writeRight: '80%',
        grammerRight: '80%'
      }, {
        subject: 'TOFEL',
        openTime: '2018-09-20',
        resultTime: '2018-09-20',
        targetScore: '80',
        testTime: '2018-09-20',
        score: '90',
        word: '2000',
        listenRight: '80%',
        readRight: '80%',
        oralRight: '80%',
        writeRight: '80%',
        grammerRight: '80%'
      }],
      tableData4: [{
        products: 'TOFEL',
        buyTime: '2018-09-20',
        actualPayment: '3000',
        openTime: '2018-09-20',
        practiceEndTime: '2018-09-20',
        endTime: '2018-10-20'
      }, {
        products: 'TOFEL',
        buyTime: '2018-09-20',
        actualPayment: '3000',
        openTime: '2018-09-20',
        practiceEndTime: '2018-09-20',
        endTime: '2018-10-20'
      }, {
        products: 'TOFEL',
        buyTime: '2018-09-20',
        actualPayment: '3000',
        openTime: '2018-09-20',
        practiceEndTime: '2018-09-20',
        endTime: '2018-10-20'
      }, {
        products: 'IELTS',
        buyTime: '2018-09-20',
        actualPayment: '3000',
        openTime: '2018-09-20',
        practiceEndTime: '2018-09-20',
        endTime: '2018-10-20'
      }],
      tableData5: [{
        message: '客户于 2018-10-09 申请雅思名师方法论试听课',
        date: '2016-05-02'
      }, {
        message: '客户于 2018-10-09 申请雅思名师方法论试听课',
        date: '2016-05-02'
      }, {
        message: '客户于 2018-10-09 申请雅思名师方法论试听课',
        date: '2016-05-02'
      }, {
        message: '客户于 2018-10-09 申请雅思名师方法论试听课',
        date: '2016-05-02'
      }],
      tableData6: [{
        money: '300',
        testType: 'IELTS',
        date: '2016-05-02',
        name: 'alone',
        status: '拒绝',
        remark: '理由不充分'
      }, {
        money: '300',
        testType: 'IELTS',
        date: '2016-05-02',
        name: 'alone',
        status: '未使用',
        remark: '理由不充分'
      }, {
        money: '300',
        testType: 'IELTS',
        date: '2016-05-02',
        name: 'alone',
        status: '已使用',
        remark: '理由不充分'
      }, {
        money: '300',
        testType: 'IELTS',
        date: '2016-05-02',
        name: 'alone',
        status: '已到期',
        remark: '理由不充分'
      }],
      tableTop: []
    }
  },
  watch: {
    // showDialog() {
    //   this.dialogVisible = this.show
    // }
  },
  created() {
    this.tableTop = clientInfoTableTop[this.type]
  },
  methods: {
    showRecord() {
      console.log(2)
      this.showDialog = true
    },
    changeShow() {
      this.showDialog = false
    }
  }
}
</script>

<style lang="scss">
  .clientInfo-wrapper {
    .record {
      text-align: right;
      margin-bottom: 20px;
    }
    .resultTable {
      width: 100%;
      border-left: 1px solid #ebeef5;
      text-align: center;
      color: #606266;
      td{
        padding: 12px;
        border-right: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
      }
    }
    .resultTable:nth-child(1) {
      border-top: 1px solid #ebeef5;
    }
    .resultTable:nth-child(2) {
      margin-top: -3px;
      td {
        background: #eee;
      }
    }
  }
</style>

