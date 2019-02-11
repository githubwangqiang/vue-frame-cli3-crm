import Vue from 'vue'
import Router from 'vue-router'

import systemManagement from '@/views/systemManagement/index'
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'iconfont-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    meta: { title: '登录' },
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'icon-home' }
    }]
  },

  {
    path: '/systemManagement',
    component: Layout,
    redirect: '/systemManagement/index',
    meta: { title: '系统管理', icon: 'icon-systemManagement' },
    children: [
      {
        path: 'index',
        name: 'index',
        component: systemManagement,
        meta: { title: '系统管理' }
      },
      {
        path: 'salesManagement',
        name: 'salesManagement',
        component: () => import('@/views/salesManagement/index'),
        meta: { title: '销售人员管理' }
      }
    ]
  },

  {
    path: '/netSaleManagement',
    component: Layout,
    meta: { title: '网销客户管理', icon: 'icon-yonghuguanli' },
    children: [
      {
        path: 'client',
        name: 'netSaleManagement1',
        redirect: '/netSaleManagement/client/index',
        component: () => import('@/views/netSaleManagement/components/netSaleClient/index'),
        meta: { title: '客户管理' },
        children: [
          {
            path: 'index',
            name: 'netSaleManagementIndex',
            hidden: true,
            meta: { title: '客户管理' },
            component: () => import('@/views/netSaleManagement/components/netSaleClient/Tabs')
          },
          {
            path: 'clientInfo',
            name: 'clientInfo',
            hidden: true,
            component: () => import('@/views/clientInfo/index'),
            meta: { title: '用户信息', icon: 'icon-yejiguanli' }
          }
        ]
      }
      // {
      //   path: 'performance666',
      //   name: 'netSaleManagement2',
      //   component: () => import('@/views/netSaleManagement/performance'),
      //   meta: { title: '我的业绩' }
      // }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
