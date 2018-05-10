import Vue from 'vue'
import Router from 'vue-router'
//引用模板
import login from '@/components/loginPage/login'
import Home from '@/components/workItem/home'
/*****运营中心********* */
import operate from '@/components/workItem/operate'
import organmanage from '@/components/workItem/organmanage'
import cardSegManage from '@/components/workItem/cardSegManage'
import wasteCardSearch from '@/components/workItem/wasteCardSearch'
import userSearch from '@/components/workItem/userSearch'
import operatePaySearch from '@/components/workItem/operatePaySearch'
import operateRefundsSearch from '@/components/workItem/operateRefundsSearch'
import operateaReconciliation from '@/components/workItem/operateaReconciliation'
import businessStatement from '@/components/workItem/businessStatement'
/***客户中心******/
import customer from '@/components/workItem/customer'
import cardSearch from '@/components/workItem/cardSearch'
import BasicInfo from '@/components/workItem/BasicInfo'
import statisticalCharts from '@/components/workItem/statisticalCharts'
import paySearch from '@/components/workItem/paySearch'
import refundsSearch from '@/components/workItem/refundsSearch'
import aReconciliation from '@/components/workItem/aReconciliation'

Vue.use(Router)

//配置路由
export default new Router({
  routes: [
    {
      path: '/login',
      name: '登陆',
      component: login,
      hidden: true
    },
    {
      path: '/operCenter',
      component: Home,
      name: '运营中心',
      children: [
          { path: '/operate', component: operate, name: '运营中心', iconCls:"icon-yunying"},
          { path: '/organmanage', component: organmanage, name: '机构管理',iconCls:"icon-jigou"},
          { path: '/cardSegManage', component: cardSegManage, name: '卡段管理',iconCls:"icon-icon" },
          { path: '/wasteCardSearch', component: wasteCardSearch, name: '废卡查询',iconCls:"icon-qiapiansousuo" },
          { path: '/userSearch', component:userSearch, name: '用户查询',iconCls:"icon-yonghu" },
          { path: '/operatePaySearch', component:operatePaySearch, name: '缴费查询',iconCls:"icon-chongzhi"},
          { path: '/operateRefundsSearch', component: operateRefundsSearch, name: '充值退款查询',iconCls:"icon-chongzhijilu" },
          { path: '/operateaReconciliation', component: operateaReconciliation, name: '结算对账',iconCls:"icon-jiesuantongji" }
          // { path: '/businessStatement', component: businessStatement, name: '营业报表',iconCls:"icon-icon-p_mrpbaobiao"}
      ]
    },
    {
      path: '/customerCenter',
      component: Home,
      name: '客户中心',
      children: [
          { path: '/customer', component: customer, name: '客户中心', iconCls:"icon-yonghu"},
          { path: '/BasicInfo', component: BasicInfo, name: '基本资料', iconCls:"icon-jibenziliao"},
          { path: '/cardSearch', component: cardSearch, name: '发卡查询', iconCls:"icon-qiapiansousuo"},
          { path: '/paySearch', component: paySearch, name: '缴费查询',iconCls:"icon-chongzhi"},
          { path: '/refundsSearch', component: refundsSearch, name: '充值退款查询',iconCls:"icon-chongzhijilu" },
          { path: '/aReconciliation', component: aReconciliation, name: '结算对账',iconCls:"icon-jiesuantongji" }
          // { path: '/statisticalCharts', component: statisticalCharts, name: '统计报表',iconCls:"icon-icon-p_mrpbaobiao" } 
        ]
    }
  ]
})
