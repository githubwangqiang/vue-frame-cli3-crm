<template>
  <div class="sensitiveClient-container">
    <div class="block">
      <span>查询时间：</span>
      <el-date-picker
        v-model="form.date"
        size="small"
        type="date"
        placeholder="选择日期"/>
      <span v-if="type==1" class="demonstration">敏感行为：</span>
      <el-select
        v-if="type==1"
        v-model="form.sensitiveOpt"
        size="small"
        placeholder="请选择敏感行为">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-button size="small" type="primary" class="search" @click="query">查询</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        v-for="(item, idx) in tableTop"
        :key="idx"
        :prop="item.prop"
        :label="item.label"
        show-overflow-tooltip
        align="center">
        <template slot-scope="scope">
          <!-- 点击用户名跳转至用户信息页面 -->
          <router-link v-if="item.prop === 'client'" :to="{name: 'clientInfo'}">
            {{ scope.row[item.prop] }}
          </router-link>
          <!-- 正常显示 -->
          <span v-else>
            {{ scope.row[item.prop] }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="130">
        <template slot-scope="scope">
          <el-button
            id="addRecord"
            size="small"
            type="warning"
            plain
            @click="contactRecord(1)">
            添加联系记录
          </el-button>
          <el-button
            id="openAccess"
            size="small"
            type="warning"
            plain
            @click="contactRecord(2)">
            开通体验
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div id="page">
      <!-- <el-pagination
        :current-page.sync="currentPage2"
        :page-size="100"
        :page-sizes="[100, 200, 300, 400]"
        :total="1000"
        layout="prev, pager, next, sizes"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/> -->
    </div>
    <associated-account
      :flag="associatedAccountFlag"
      :type="associatedAccountType"
      @sendData="getData"
      @changeFlag="changeFlag"/>
    <contact-record
      :flag="contactRecordFlag"
      :type="Number(type)"
      @sendData="getData"
      @changeFlag="changeFlag"/>
  </div>
</template>
<script>
import associatedAccount from '@/components/associatedAccount/index'
import contactRecord from '@/components/contactRecord/index'
export default {
  name: 'SensitiveClient',
  components: {
    associatedAccount,
    contactRecord
  },
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      form: {
        date: new Date(),
        sensitiveOpt: '0'
      },
      tableData: [{
        priority: '1',
        clientType: '微信',
        client: 'vsvvhv',
        tel: '1111231231',
        product: 'TOfel',
        contactPerson: '王小虎',
        source: '公开课',
        sensitiveOpt: '购买TOFEL',
        optTime: '2019-09-10'
      }, {
        priority: '1',
        clientType: '微信',
        client: 'vsvvhv',
        tel: '1111231231',
        product: 'TOfel',
        contactPerson: '王小虎',
        source: '公开课',
        sensitiveOpt: '购买TOFEL',
        optTime: '2019-09-10'
      }, {
        priority: '1',
        clientType: '微信',
        client: 'vsvvhv',
        tel: '1111231231',
        product: 'TOfel',
        contactPerson: '王小虎',
        source: '公开课',
        sensitiveOpt: '购买TOFEL',
        optTime: '2019-09-10'
      }],
      options: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '注册朗播账号'
      }, {
        value: '2',
        label: '体验出国考试产品'
      }, {
        value: '3',
        label: '开启出国考试产品评测'
      }, {
        value: '4',
        label: '观看某公开课时长'
      }, {
        value: '5',
        label: '完成体验练习单个Task'
      }, {
        value: '6',
        label: '体验用户，生成托福/雅思训练计划'
      }, {
        value: '7',
        label: '点击课程优惠活动首页/购买页 banner'
      }, {
        value: '8',
        label: '试听体验科目的方法课程、备考指南'
      }, {
        value: '9',
        label: '点击出国考试某种产品的购买按钮'
      }, {
        value: '10',
        label: '购买出国考试某种产品'
      }],
      currentPage2: 5,
      tableTop: [
        {
          prop: 'priority',
          label: '优先级'
        },
        {
          prop: 'clientType',
          label: '客户类型'
        },
        {
          prop: 'client',
          label: '客户'
        },
        {
          prop: 'tel',
          label: '朗播账号'
        },
        {
          prop: 'product',
          label: '体验产品'
        },
        {
          prop: 'contactPerson',
          label: '关联电销人员'
        },
        {
          prop: 'source',
          label: '用户来源'
        },
        {
          prop: 'sensitiveOpt',
          label: '敏感行为'
        },
        {
          prop: 'optTime',
          label: this.type === 1 ? '行为时间' : '添加时间'
        }
      ],
      associatedAccountFlag: false,
      contactRecordFlag: false,
      associatedAccountType: 1
    }
  },
  methods: {
    handleSizeChange(val) {
      // console.log('每页' + val + '条')
    },
    handleCurrentChange(val) {
      // console.log('当前页:' + val)
    },
    getData(data) {
      this.associatedAccountFlag = false
      this.contactRecordFlag = false
      console.log(data)
    },
    changeFlag() {
      this.associatedAccountFlag = false
      this.contactRecordFlag = false
    },
    contactRecord(type) {
      if (type === 1) this.contactRecordFlag = true
      if (type === 2) {
        this.associatedAccountFlag = true
        this.associatedAccountType = type
      }
    },
    query() {
      console.log(this.type)
      if (!this.form.date) {
        this.$message({
          message: '请选择查询时间',
          type: 'warning',
          duration: 800
        })
        return false
      }
      const form = {
        date: this.form.date
      }
      if (this.type === 1) form.sensitiveOpt = this.form.sensitiveOpt
      console.log(form)
    }
  }
}
</script>

<style lang="scss">
  .sensitiveClient-container {
    margin: 20px;
    .block{
      height: 50px;
      line-height: 50px;
      margin-bottom: 15px;
      & > span {
        margin-right: 10px;
      }
    }
    .demonstration {
      margin-left: 15px;
    }
    .search{
      margin-left: 15px;
      width: 80px;
    }
    #addRecord{
      margin-bottom: 10px
    }
    #addRecord,#openAccess{
      width: 100px;
      margin-left: 0
    }
    #page{
      margin: 20px 0;
      text-align: right;
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

