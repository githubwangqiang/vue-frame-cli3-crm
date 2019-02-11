<template>
  <tabs :tab-data="tabData" />
</template>

<script>
import organizationalStructure from './components/organizationalStructure/index'
import roleManagement from './components/roleManagement/index'
import tabs from '@/components/tabs'
export default {
  name: 'SystemManagement',
  components: {
    tabs
  },
  data() {
    return {
      tabData: [
        {
          title: '组织架构',
          component: organizationalStructure
        },
        {
          title: '角色管理',
          component: roleManagement
        }
      ]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang='scss'>
  .systemManagement-container {
    width: 90%;
    margin: 50px auto;
    overflow: hidden;
    .el-tab-pane-container {
      width: 100%;
      height: 600px;
      overflow-y: auto;
      padding-bottom: 100px;
    }
  }
</style>
