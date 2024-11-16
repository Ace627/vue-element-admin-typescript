/** 默认布局组件 */
export const LAYOUT = () => import('@/layout/index.vue')

/** 默认首页 */
export const HOME_PAGE_URL = '/dashboard'

/** 默认登录页 */
export const LOGIN_PAGE_URL = '/login'

/** 免登录白名单（匹配路由 path） */
export const PATH_WHITE_LIST: string[] = ['/login', '/register']

/** 免登录白名单（匹配路由 name） */
export const NAME_WHITE_LIST: string[] = []
