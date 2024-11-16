import type { RouteRecordRaw } from 'vue-router'
import { HOME_PAGE_URL, LAYOUT } from '../router.constant'

export const STATIC_ROUTE_LIST: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    component: LAYOUT,
    redirect: HOME_PAGE_URL,
    meta: { hidden: true },
    children: [
      {
        path: HOME_PAGE_URL,
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '主控台', full: false, affix: true },
      },
    ],
  },

  /** 确保显示为一级菜单 */
  {
    path: HOME_PAGE_URL,
    component: () => import('@/views/dashboard/index.vue'),
    meta: { title: '主控台', full: false, affix: true },
  },

  // The not found page must be placed last
  {
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    meta: { title: 'NotFound', hidden: true },
    alias: '/:pathMatch(.*)*',
  },
]
