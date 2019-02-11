<template>
  <div id="userInfo-wrapper">
    <div id="userInfo">
      <div>用户名：<span>{{ clientInfo.name }}</span></div>
      <div>联系电话：<span>{{ clientInfo.telephone }}</span></div>
      <div>邮箱：<span>{{ clientInfo.email }}</span></div>
      <div>优先级：<span>{{ clientInfo.priority }}</span></div>
      <div>考试类型：<span>{{ clientInfo.testType }}</span></div>
      <div>体验时间：<span>{{ clientInfo.experienceTime }}</span></div>
      <div>注册来源：<span>{{ clientInfo.registSource }}</span></div>
      <div>体验来源：<span>{{ clientInfo.experienceSource }}</span></div>
      <div>下次预约时间：<span>{{ clientInfo.nextAppointmentTime }}</span></div>
      <div>用户跟进状态：<span>{{ clientInfo.followStatus }}</span></div>
    </div>
    <div class="opt-btn" style="margin-bottom:20px;overflow:hidden">
      <el-button size="small" type="primary" style="float:right">派发优惠券</el-button>
      <el-button size="small" type="primary" style="float:right;margin-right:20px">模拟登陆</el-button>
    </div>
    <tabs :tab-data="tabData" />
  </div>
</template>
<script>
import tabs from '@/components/tabs'
import showInfo from './components/ShowInfo'
export default {
  components: {
    tabs
  },
  data() {
    return {
      clientInfo: {
        name: '544546464',
        telephone: 'E-W****9479',
        email: '80078t656@qq.com',
        priority: '3',
        testType: 'IELTS',
        experienceTime: '2018-10-09 10:28:21',
        registSource: '网销（微信)',
        experienceSource: '网销（微信)',
        nextAppointmentTime: '2018-10-09 10:28:21',
        followStatus: '待处理客户'
      },
      tabData: [
        {
          title: '联系记录',
          component: showInfo,
          type: 1
        },
        {
          title: '行为日志',
          component: showInfo,
          type: 2
        },
        {
          title: '第一次测评结果',
          component: showInfo,
          type: 3
        },
        {
          title: '购买记录',
          component: showInfo,
          type: 4
        },
        {
          title: '短信记录',
          component: showInfo,
          type: 5
        },
        {
          title: '优惠券信息',
          component: showInfo,
          type: 6
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  #userInfo-wrapper{
    width: 90%;
    margin: 50px auto;
    padding: 20px 30px 30px;
    box-shadow: 0 0px 4px 0 rgba(0, 0, 0, 0.12);
    #userInfo{
      overflow: hidden;
      div{
        float: left;
        width: 30%;
        line-height: 30px
      }
    }
    .tabs-container{
      width: 100%;
      margin-top: 30px
    }
  }
</style>
