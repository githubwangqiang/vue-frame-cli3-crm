<template>
  <div class="netSaleClientTable-container">
    <el-table
      :data="tableData"
      class="netSaleClient-table"
      border
      style="width: 100%">
      <el-table-column
        v-for="item in tableTop[type]"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :min-width="{langlibUser: '150px', time: '120px'}[item.prop]"
        show-overflow-tooltip
        align="center">
        <template slot-scope="scope">
          <!-- 用户没有朗播账号时 -->
          <el-button
            v-if="type === 1 && item.prop === 'langlibUser' && !scope.row[item.prop]"
            size="small"
            type="warning"
            plain
            @click="relation(1, scope.row)">
            关联/创建朗播账号
          </el-button>
          <!-- 点击用户名跳转至用户信息页面 -->
          <router-link v-else-if="type === 2 && item.prop === 'user'" :to="{name: 'clientInfo'}">
            {{ scope.row[item.prop] }}
          </router-link>
          <!-- 正常显示 -->
          <span v-else>
            {{ scope.row[item.prop] }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="130">
        <template slot-scope="scope">
          <el-button
            class="netSaleClient-table-btn"
            type="warning"
            size="small"
            plain
            @click="contactRecord(1)">
            添加联系记录
          </el-button>
          <br>
          <el-button
            v-if="type === 1"
            class="netSaleClient-table-btn"
            type="warning"
            plain
            size="small"
            @click="contactRecord(2)">
            查看聊天记录
          </el-button>
          <el-button
            v-else
            type="warning"
            class="netSaleClient-table-btn"
            size="small"
            plain
            @click="relation(2)">
            开通体验
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="netSaleClientTable-footer">
      <pagination
        v-if="radio === '1'"
        :total="50"
        @paginationChange="paginationChange"/>
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
import pagination from '@/components/pagination/index'
import { netSaleClientTableTop } from '@/utils/tableHead.js'
export default {
  name: 'NetSaleClientTable',
  components: {
    associatedAccount,
    contactRecord,
    pagination
  },
  props: {
    type: {
      type: Number,
      default: 1
    },
    radio: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      tableTop: {},
      tableData: [
        {
          type: '微信',
          time: '2016-05-02',
          user: '王小虎',
          langlibUser: '',
          source: 'QQ',
          relationSale: 'wsss',
          sensitiveBehavior: '111'
        },
        {
          type: '微信',
          time: '2016-05-04',
          user: '王小虎',
          langlibUser: 'wssss',
          source: 'QQ',
          relationSale: 'wsss',
          sensitiveBehavior: '111'
        },
        {
          type: '微信',
          time: '2016-05-01',
          user: '王小虎888876666666',
          langlibUser: 'wssss',
          source: 'QQ',
          relationSale: 'wsss',
          sensitiveBehavior: '111'
        },
        {
          type: '微信',
          time: '2016-05-03',
          user: '王小虎',
          langlibUser: 'wssss',
          source: 'QQ',
          relationSale: 'wsss',
          sensitiveBehavior: '111'
        }
      ],
      associatedAccountFlag: false,
      associatedAccountType: 1,
      contactRecordFlag: false,
      currentPage: 5,
      pageSizes: [5, 10, 20, 30],
      pageSize: 1
    }
  },
  created() {
    this.tableTop = netSaleClientTableTop
  },
  methods: {
    relation(n, data) {
      this.associatedAccountFlag = true
      this.associatedAccountType = n
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
      console.log(type)
      if (type === 1) this.contactRecordFlag = true
    },
    paginationChange(opt) {
      // 修改page-size
      if (opt.isSizeChange) {
        this.pageSize = opt.val
      } else { // 修改当前页码
        this.currentPage = opt.val
      }
    }
  }
}
</script>

<style lang='scss'>
  .netSaleClientTable-container {
    .netSaleClientTable-footer {
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
