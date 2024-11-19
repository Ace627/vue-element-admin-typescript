import { upperFirst } from 'lodash-es'
import { LAYOUT, NAME_WHITE_LIST, PATH_WHITE_LIST } from './router.constant'
import type { RouteMeta, RouteRecordRaw, RouteLocationNormalized } from 'vue-router'
import { isExternal } from '@/utils/validate'

/**
 * 递归函数用于生成路由配置，登录的时候也需要调用一次
 */
export function generateRoutes(menus: any[], parentId: string = '0') {
  // 首先把你需要动态路由的组件地址全部获取 [vue2 中可以直接用拼接的方式，但是 vue3 中必须用这种方式]
  const views = import.meta.glob('@/views/**/*.vue')
  const routeList: any[] = []
  for (const item of menus) {
    if (item.parentId === parentId) {
      const route: any = {}
      route.path = item.path
      route.name = upperFirst(item.path.replaceAll('/', ''))
      route.component = item.component ? views[`/src/views/${item.component}.vue`] : null
      // 处理路由元信息
      route.meta = generateRouteMeta(item)
      // 处理子路由
      const children = generateRoutes(menus, item.id)
      if (children.length > 0) route.children = children
      routeList.push(route)
    }
  }
  return routeList
}

/**
 * 初始化动态路由[用于生成扁平化一级路由，将后端一级路由数据转化为前端router格式的一级路由]
 */
export function generateFlattenRoutes(menus: any[]) {
  const routeList: any[] = []
  const views = import.meta.glob('@/views/**/*.vue')
  for (const item of menus) {
    const route: any = {}
    route.path = item.path
    route.name = upperFirst(item.path.replaceAll('/', ''))
    route.component = item.component ? views[`/src/views/${item.component}.vue`] : null
    // 处理路由元信息
    route.meta = generateRouteMeta(item)
    routeList.push(route)
  }
  return routeList
}

/**
 * 过滤出可见路由，父级不可见则子级不可见
 */
export function filterVisibleRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  return routes
    .filter((route) => !route.meta?.hidden)
    .map((route) => {
      if (route.children && route.children.length) {
        route.children = filterVisibleRoutes(route.children)
      }
      return route
    })
}

/** 根据菜单数据生成对应的路由元信息 */
export function generateRouteMeta(record: Record<string, any>): RouteMeta {
  const meta = {} as RouteMeta
  meta.icon = record.icon
  meta.title = record.title
  meta.alwaysShow = record.type === 'M'
  meta.affix = record.affix === 1
  meta.full = record.full === 1
  meta.hidden = record.visible === 0
  return meta
}

/**
 * 判断路由是否在白名单
 */
export function isWhiteList(to: RouteLocationNormalized): boolean {
  // path 和 name 任意一个匹配上即可
  return PATH_WHITE_LIST.includes(to.path) || NAME_WHITE_LIST.includes(to.name as string)
}
