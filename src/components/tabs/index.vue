<template>
  <el-tabs class="tabs-container" type="border-card" @tab-click="click">
    <el-tab-pane
      v-for="(item, idx) in tabData"
      :key="'tabs' + idx"
      :label="item.title">
      <div class="el-tab-pane-container">
        <component :is="item.component" :type="item.type"/>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    tabData: {
      type: Array,
      default: null
    },
    getPath: {
      type: Object,
      default: null
    }
  },
  methods: {
    click(e) {
      if (this.getPath) console.log(this.getPath[e.index])
    }
  }
}
</script>

<style rel="stylesheet/scss" lang='scss'>
  .tabs-container {
    width: 90%;
    margin: 50px auto;
    overflow: hidden;
    .el-tab-pane-container {
      width: 100%;
      overflow-y: auto;
      padding-bottom: 100px;
    }
  }
</style>
