<template>
  <div class="treeData-container">
    <div class="custom-tree-container">
      <div class="block">
        <el-tree
          :data="treeData"
          :render-content="renderContent"
          :expand-on-click-node="false"
          :props="defaultProps"
          node-key="id"
          default-expand-all />
      </div>
    </div>
    <system-management-dialog
      :edit-flag="editFlag"
      :dialog-opt="dialogOpt"
      @changeEditFlag="changeEditFlag"
      @sendData="getData"/>
  </div>
</template>

<script>
import systemManagementDialog from './SystemManagementDialog'
import { Message } from 'element-ui'
export default {
  name: 'TreeData',
  components: {
    systemManagementDialog
  },
  data() {
    return {
      treeData: [],
      dialogOpt: {},
      editFlag: false,
      newArray: [],
      defaultProps: {
        children: 'children',
        label: 'departmentName'
      }
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    // 渲染设置的dom节点
    renderContent(h, { node, data, store }) {
      return (
        <div class='custom-tree-node' on-mouseenter={() => this.hideTreeSet() }>
          <span>{node.label}</span>
          <div class='custom-tree-span'>
            <span onClick={e => this.setup(e)}>设置</span>
            <ul class='custom-tree-list'>
              <li>
                <span on-click={ () => this.append(node, data, 1) }>新建下级部门</span>
              </li>
              <li>
                <span on-click={ () => this.append(node, data, 2) }>编辑部门</span>
              </li>
              { this.isDelete(data, node) }
            </ul>
          </div>
        </div>
      )
    },
    // 判断是否是最后一级 是的话显示删除按钮
    isDelete(data, node) {
      if (!data.children && data.parentDepartmentId) {
        return (
          <li>
            <span on-click={ () => this.remove(node, data) }>删除部门</span>
          </li>
        )
      }
    },
    /*
     * 点击添加 / 编辑 / 删除部门
     * 参数：
     *  1 -> 新建
     *  2 -> 编辑
     *  3 -> 删除
     */
    append(node, data, n) {
      if (this.dialogOpt.departmentName) this.dialogOpt.department = ''
      const opt = {
        title: '新建下级部门',
        type: n,
        id: data.id
      }
      // 新建下级部门 当前点击设置的部门为下级部门的上级部门
      if (n === 1) {
        opt.superiorDepartment = data.departmentName
        opt.parentDepartmentId = data.id
      }
      // 编辑当前部门信息
      if (n === 2) {
        opt.title = '编辑部门信息'
        opt.departmentName = data.departmentName
        opt.superiorDepartment = node.parent.label || ''
        opt.parentDepartmentId = node.parent.data.id || 0
        opt.special = data.special
      }
      this.showDialog(opt)
    },
    // 显示弹窗
    showDialog(opt) {
      this.editFlag = true
      this.dialogOpt = Object.assign({}, opt)
    },
    // 改变展示dialog开关 点击关闭和取消
    changeEditFlag(bool) {
      this.editFlag = bool
    },
    // 点击设置
    setup(e) {
      this.hideTreeSet()
      document.querySelectorAll('.custom-tree-list').forEach(item => {
        item.style.display = 'none'
      })
      const nextNode = e.target.parentNode.childNodes[1]
      nextNode.style.display = 'block'
    },
    // 点击隐藏列表
    hideTreeSet() {
      document.querySelectorAll('.custom-tree-list').forEach(item => {
        item.style.display = 'none'
      })
    },
    // 点击删除部门
    remove(node, data) {
      const opt = {
        title: '删除部门',
        id: data.id,
        type: 0
      }
      this.showDialog(opt)
    },
    getData(params) {
      switch (true) {
        case this.dialogOpt.type === 1:
          this.addDepartments(params)
          break
        case this.dialogOpt.type === 2:
          this.changeDepartments(params)
          break
        default:
          this.deleteDepartments({ id: params.id })
      }
    },
    // 获取组织架构
    getDepartments() {
      this.$axios.systemManagement.getDepartments().then(rs => {
        this.treeData = [rs.data[0]]
      })
    },
    // 填加部门
    addDepartments(data) {
      const params = {
        departmentName: data.departmentName,
        parentDepartmentId: data.parentDepartmentId,
        special: 0
      }
      this.$axios.systemManagement.addDepartments(params).then(rs => {
        this.messageAndUpdata('添加成功', params, 1)
      })
    },
    // 修改部门名称
    changeDepartments(data) {
      const params = {
        departmentName: data.departmentName,
        id: data.id,
        special: data.special,
        parentDepartmentId: data.parentDepartmentId
      }
      this.$axios.systemManagement.putDepartments(params).then(rs => {
        this.messageAndUpdata('修改成功', params, 2)
      })
    },
    // 删除部门
    deleteDepartments(params) {
      this.$axios.systemManagement.deleteDepartments(params).then(rs => {
        this.messageAndUpdata('删除成功', params, 3)
      })
    },
    messageAndUpdata(text, params, updataType) {
      Message({
        message: text,
        type: 'success'
      })
      this.updataDepartments(this.treeData[0], params, updataType)
    },
    updataDepartments(data, params, type) {
      if (type === 2 && data.parentDepartmentId === params.parentDepartmentId && data.id === params.id) {
        data.departmentName = params.departmentName
      } else if (type === 1 && data.id === params.parentDepartmentId || type === 3 && data.id === params.id) {
        this.getDepartments()
      } else {
        if (data.children && data.children.length) {
          for (let i = 0; i < data.children.length; i++) {
            this.updataDepartments(data.children[i], params, type)
          }
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang='scss'>
  .treeData-container {
    padding: 50px;
    .custom-tree-container {
      width: 300px;
      min-height: 300px;
    }
    .custom-tree-span {
      position: relative;
      display: none;
    }
    .custom-tree-list {
      position: absolute;
      top: 0;
      right: -110px;
      display: none;
      background-color: #fff;
      border: 1px solid #f4f4f4;
      li {
        height: 30px;
        line-height: 30px;
        padding-left: 10px;
        padding-right: 10px;
        border-bottom: 1px solid #f4f4f4;
        &:last-child {
          border-bottom: none;
        }
      }
    }
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
      &:hover .custom-tree-span {
        display: block;
      }
    }
    .el-tree-node > .el-tree-node__children {
      overflow: initial;
    }
    .el-tree-node__content{
      .el-tree-node__expand-icon {
        padding: 0px;
        margin-right: 10px;
        margin-top: -2px;
        width: 15px;
        height: 15px;
      }
    }
  }
</style>
