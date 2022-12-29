import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'demo',
    component: () => import('@/views/demo/Demo.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
