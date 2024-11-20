import type { RouteRecordRaw } from 'vue-router'
import { HOME_PAGE_URL, LAYOUT, LOGIN_PAGE_URL } from '../router.constant'

export const STATIC_ROUTE_LIST: Array<RouteRecordRaw> = [
  // 布局路由配置 确保可以显示布局框架
  {
    path: '/',
    name: 'Layout',
    component: LAYOUT,
    redirect: HOME_PAGE_URL,
    meta: { hidden: true },
    children: [{ path: HOME_PAGE_URL, component: () => import('@/views/dashboard/index.vue') }]
  },

  // 确保显示为一级菜单
  {
    path: HOME_PAGE_URL,
    component: () => import('@/views/dashboard/index.vue'),
    meta: { title: '主控台', icon: 'iconfont-Home', full: false, affix: true }
  },

  // 系统登录页
  {
    path: LOGIN_PAGE_URL,
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录', full: true, hidden: true }
  },

  // 重定向页
  {
    path: '/redirect',
    component: () => import('@/views/redirect/index.vue'),
    meta: { title: '重定向', full: false, hidden: true }
  },

  // The not found page must be placed last
  {
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    meta: { title: 'NotFound', hidden: true },
    alias: '/:pathMatch(.*)*'
  }
]
