import router from '.'
import staticRoutes from '@/database/static-routes.json'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { generateFlattenRoutes, generateRoutes } from './router.helper'

export async function beforeEach(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  const userStore = useUserStore()

  /** 如果用户已经获得其权限角色 直接放行 */
  if (userStore.roles.length !== 0) return next()
  /** 否则要重新获取权限角色 判断当前用户是否已拉取完 user_info 信息 */
  await userStore.getInfo()
  /** 添加动态路由（扁平化一级路由数据） */
  userStore.flattenRouteList.forEach((v) => (v.meta!.full ? router.addRoute(v) : router.addRoute('Layout', v)))
  /** 确保添加路由已完成 设置 replace: true, 因此导航将不会留下历史记录 */
  next({ ...to, replace: true })
  // // try {

  // // } catch (error: any) {
  // //   console.log('error: ', error.message || error)
  // // }

  // // next({ replace: true })
  // /** 确保添加路由已完成 设置 replace: true, 因此导航将不会留下历史记录 */
  // // next({ ...to, replace: true })
  // /** 添加动态路由（扁平化一级路由数据） */
  // routeList.forEach((v) => (v.meta.full ? router.addRoute(v) : router.addRoute('Layout', v)))
  // next()
}

export function afterEach(to: RouteLocationNormalized) {
  // next()
}
