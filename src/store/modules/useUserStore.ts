import type { RouteRecordRaw } from 'vue-router'
import staticRoutes from '@/database/static-routes.json'
import { filterVisibleRoutes, generateFlattenRoutes, generateRoutes } from '@/router/router.helper'
import { STATIC_ROUTE_LIST } from '@/router/modules/static.route'

export default defineStore('user', () => {
  /** 用户角色编码表 */
  const roles = ref<string[]>([])
  /** 用户权限编码表 */
  const permissions = ref<string[]>([])
  /** 递归路由表 用于无限递归菜单 */
  const routeList = shallowRef<RouteRecordRaw[]>([])
  /** 一级扁平化路由表 用于动态路由添加 */
  const flattenRouteList = shallowRef<RouteRecordRaw[]>([])

  /** 请求获取个人权限数据 */
  function getInfo() {
    roles.value = ['admin']
    permissions.value = ['*:*:*']
    routeList.value = filterVisibleRoutes([...STATIC_ROUTE_LIST, ...generateRoutes(staticRoutes)])
    // 获取后端菜单数据 并对其进行扁平化处理
    flattenRouteList.value = generateFlattenRoutes(staticRoutes)
  }

  return { roles, permissions, routeList, flattenRouteList, getInfo }
})
