import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'

interface IModuleType {
  default: Array<RouteRecordRaw> | RouteRecordRaw
}
const modules = import.meta.glob<IModuleType>('./modules/**/*.ts', { eager: true })
const routeModuleList: RouteRecordRaw[] = Object.keys(modules).reduce(
  (list: RouteRecordRaw[], key) => {
    const mod = modules[key].default ?? {}
    const modList = Array.isArray(mod) ? [...mod] : [mod]
    return [...list, ...modList]
  },
  []
)

/*const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'LayOut',
    component: () => import('@/layout/indexhh.vue')
  }
]*/
//根路由排序
const sortRoute = (a: any, b: any) => {
  return (a.meta?.sort ?? 0) - (b.meta?.sort ?? 0)
}
routeModuleList.sort(sortRoute)
//需要验证权限
export const asyncRoutes = [...routeModuleList]
//无需验证权限
export const constantRouter: RouteRecordRaw[] = [...routeModuleList]
const router = createRouter({
  history: createWebHistory(),
  routes: constantRouter
})

export default router
