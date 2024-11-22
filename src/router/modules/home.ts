import { RouteRecordRaw } from 'vue-router'
import layout from '@/layout/LayoutMain.vue'
/*
 * @desc
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.title 菜单名称
 * @param meta.sort 排序越小越排前
 * @author HanJiaLin
 * @time 2023/5/8 9:34
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: layout,
    redirect: '/welcome',
    meta: { title: '欢迎页', sort: 1, icon: 'Home' },
    children: [
      {
        path: 'welcome',
        name: 'HomePage',
        component: () => import('@/views/home/HomePage.vue'),
        meta: { title: '欢迎页' }
      },
      {
        path: 'chart',
        name: 'ChartPage',
        component: () => import('@/views/echarts/IndexPage.vue'),
        meta: { title: '使用图表' }
      },
      {
        path: 'table',
        name: 'TablePage',
        component: () => import('@/views/table/IndexPage.vue'),
        meta: { title: '使用表格' }
      }
    ]
  }
]

export default routes
