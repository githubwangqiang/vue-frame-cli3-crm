<template>
  <div class="pagination-container">
    <el-pagination
      :total="total"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="10"
      layout="total, prev, pager, next, sizes"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSizes: [10, 20, 30]
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('paginationChange', { isSizeChange: true, val })
    },
    handleCurrentChange(val) {
      this.$emit('paginationChange', { val })
    }
  }
}
</script>

<style lang='scss'>
  .pagination-container {
    width: 100%;
    margin-top: 20px;
    text-align: right;
    & > div {
      padding: 0;
    }
  }
</style>
