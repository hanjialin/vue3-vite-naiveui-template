import { RouteRecordRaw } from 'vue-router'
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
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'demo',
    component: () => import('@/views/demo/Demo.vue')
  }
]

export default routes
