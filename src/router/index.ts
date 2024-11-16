import type { App } from 'vue'
import { afterEach, beforeEach } from './router.guard'
import { STATIC_ROUTE_LIST } from './modules/static.route'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

/** 创建路由实例 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...STATIC_ROUTE_LIST],
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

/** 路由配置函数 */
export async function setupRouter(app: App) {
  router.beforeEach(beforeEach) // 配置路由全局前置守卫
  router.afterEach(afterEach) // 配置路由全局后置守卫
  app.use(router)
  await router.isReady() // 当路由准备好时再执行挂载 https://router.vuejs.org/zh/api/interfaces/Router.html#Methods-isReady
}

export default router
