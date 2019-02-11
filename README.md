# CRM2.0后台管理系统

## 项目启动：npm run serve

## 项目结构

├── api                         // 接口api  
│   ├── apiUrl  
│       └── index.js            // 接口统一管理api  
│   ├── login.js                // 登陆接口调用  
│   ├── index.js                // 接口请求统一输出文件  
│   ├── salers.js               // 销售管理接口调用  
│   └── systemManagement.js     // 系统管理接口调用  
├── views                       // 页面目录  
│   ├── dashboard               // 主页  
│   ├── login                   // 登陆  
│   ├── layout                  // 菜单栏  
│   ├── salesManagement         // 销售管理  
│   └── systemManagement        // 系统管理  
├── store                       // 存储  
│   ├── modules  
│     ├── app.js                // 页面结构展示  
│     ├── role.js               // 角色数据  
│     └── user.js               // 用户信息  
│   ├── getters.js              // getters输出  
│   └── index.js                // 状态配置文件

## CRM项目公共组件传参及应用场景

### Tabs

路径：src/compoments/tabs  
应用场景：页面中使用页签显示不同模块  
传入参数:
  > tabData
  > * type：Array
  > * title: 页签标题
  > * component: 页签对应显示的组件

``` eg:
  :tabData = [
    {
      title: 'title',
      component: component
    }
  ]
```

### Pagination

路径：src/compoments/pagination  
应用场景：表格下方的分页  
传入参数：
  > total
  > * type：Number
  > * describe: 数据的总条数

与父组件通信：
  > paginationChange
  > * isSizeChange：Boolean
  > * describe: 是否改变页面显示数据的数量
  > * val：Number
  > * describe: 页面显示的条数 / 当前页码

### AssociatedAccount

路径：src/compoments/associatedAccount  
应用场景：关联/创建朗播账号 / 开通体验  
传入参数：
  > flag
  > * type：Boolean
  > * describe: 是否显示该弹窗
  > type
  > * type：Number
  > * describe:  
  >   1 -> 关联/创建朗播账号  
  >   2 -> 开通体验  
  >   3 -> 电销开通体验  

与父组件通信：
  > changeFlag
  > * describe: 当点击关闭按钮关闭弹窗时派发此事件，在父组件中接受 该变传入flag的值，防止下次点击不出现弹窗
  > sendData
  > * describe: 将当前获取到的form表单内容派发给父级组件
  
### ContactRecord

路径：src/compoments/associatedAccount  
应用场景：添加联系记录  
传入参数：
  > flag
  > * type：Boolean
  > * describe: 是否显示该弹窗
  > type
  > * type：Number
  > * describe:  
  >   1 -> 添加待确认客户联系记录  
  >   2 -> 添加已确认客户联系记录  
  >   3 -> 添加联系记录  

与父组件通信：
  > changeFlag
  > * describe: 当点击关闭按钮关闭弹窗时派发此事件，在父组件中接受 该变传入flag的值，防止下次点击不出现弹窗

### Tables

路径：src/compoments/tables  
应用场景：table表格  
传入参数：
  > isIndex
  > * type：Boolean
  > * describe: 是否显示下标
  > tableData
  > * type：Array
  > * describe: table显示的数据
  > tableHead
  > * type：Array
  > * describe: 表头列表
