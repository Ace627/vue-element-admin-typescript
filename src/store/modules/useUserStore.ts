import { setAccessToken } from '@/utils/cache'
import type { RouteRecordRaw } from 'vue-router'
import staticRoutes from '@/database/static-routes.json'
import { LoginService } from '@/api/system/login.service'
import { STATIC_ROUTE_LIST } from '@/router/modules/static.route'
import { filterVisibleRoutes, generateFlattenRoutes, generateRoutes } from '@/router/router.helper'

export default defineStore('user', () => {
  /** 当前用户信息 */
  const userInfo = ref({} as Record<string, any>)
  /** 用户角色编码表 */
  const roles = ref<string[]>([])
  /** 用户权限编码表 */
  const permissions = ref<string[]>([])
  /** 递归路由表 用于无限递归菜单 */
  const routeList = shallowRef<RouteRecordRaw[]>([])
  /** 一级扁平化路由表 用于动态路由添加 */
  const flattenRouteList = shallowRef<RouteRecordRaw[]>([])

  /** 登录 */
  async function login(loginForm: LoginFormDto) {
    const data = await LoginService.login(loginForm)
    setAccessToken(data.accessToken)
  }

  /** 请求获取个人权限数据 */
  function getInfo() {
    roles.value = ['admin']
    permissions.value = ['*:*:*']
    routeList.value = filterVisibleRoutes([...STATIC_ROUTE_LIST, ...generateRoutes(staticRoutes)])
    // 获取后端菜单数据 并对其进行扁平化处理
    flattenRouteList.value = generateFlattenRoutes(staticRoutes)
  }

  return { userInfo, roles, permissions, routeList, flattenRouteList, login, getInfo }
})
