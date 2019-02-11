<template>
  <div>
    <tabs :tab-data="tabData"/>
  </div>
</template>
<script>
import tabs from '@/components/tabs'
import NetSaleClient from './components/NetSaleClient'
import SensitiveClient from './components/SensitiveClient'
export default {
  name: 'NetSaleManagement',
  components: {
    tabs
  },
  data() {
    return {
      tabData: [
        {
          title: '待确认网销客户',
          component: NetSaleClient,
          type: 1
        },
        {
          title: '已确认网销客户',
          component: NetSaleClient,
          type: 2
        },
        {
          title: '敏感行为客户',
          component: SensitiveClient,
          type: 1
        },
        {
          title: '待联系客户',
          component: SensitiveClient,
          type: 2
        }
      ]
    }
  }
}
</script>
