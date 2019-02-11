<template>
  <el-table
    :data="tableData"
    highlight-current-row
    border
    style="width: 100%;marginBottom: 15px">
    <el-table-column
      v-if="isIndex"
      type="index"
      align="center"
      width="50"
      label="序号"/>
    <el-table-column
      v-for="(item, idx) in tableHead"
      :key="idx"
      :prop="item.prop"
      :label="item.label"
      align="center"/>
  </el-table>
</template>

<script>
export default {
  name: 'Tables',
  props: {
    tableData: {
      type: Array,
      default: null
    },
    isIndex: {
      type: Boolean,
      default: false
    },
    tableHead: {
      type: Array,
      default: null
    }
  }
}
</script>
