import router from '.'
import { getAccessToken } from '@/utils/cache'
import { isWhiteList } from './router.helper'
import { LOGIN_PAGE_URL, HOME_PAGE_URL } from './router.constant'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

const nprogress = useNProgress({ show: import.meta.env.VITE_ROUTER_NPROGRESS === 'true' })

export async function beforeEach(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  const userStore = useUserStore()
  const accessToken = getAccessToken()

  nprogress.start()

  // 如果没有 Token，但在免登录的白名单中，则直接进入；否则将被重定向到登录页面
  if (!accessToken) return isWhiteList(to) ? next() : next({ path: LOGIN_PAGE_URL, query: { redirect: to.fullPath } })

  // 如果已经登录，并准备进入 Login 页面，则重定向到主页
  if (to.path.toLowerCase() === LOGIN_PAGE_URL) return next({ path: HOME_PAGE_URL, replace: true })

  try {
    // 如果用户已经获得其权限角色 直接放行
    if (userStore.roles.length !== 0) return next()
    // 否则要重新获取权限角色 判断当前用户是否已拉取完 user_info 信息
    await userStore.getInfo()
    // 添加动态路由（扁平化一级路由数据）
    userStore.flattenRouteList.forEach((v) => (v.meta!.full ? router.addRoute(v) : router.addRoute('Layout', v)))
    // 确保添加路由已完成 设置 replace: true, 因此导航将不会留下历史记录
    next({ ...to, replace: true })
  } catch (error: any) {
    // 过程中发生任何错误，都直接重置 Token，并重定向到登录页面
    // await userStore.logout()
    next({ path: LOGIN_PAGE_URL, query: { redirect: to.fullPath } })
  }
}

export function afterEach(to: RouteLocationNormalized) {
  nprogress.done()
}
