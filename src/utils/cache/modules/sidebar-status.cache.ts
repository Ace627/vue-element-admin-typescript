import { CacheKey } from '../cache.constant'
import { CacheService } from '../cache.service'

export function setSidebarStatus(value: boolean): void {
  CacheService.local.set(CacheKey.SIDEBAR_STATUS, value ? '1' : '0')
}

/**
 * 从本地缓存获取侧边栏的折叠状态 如果缓存数据存在 以其为主 否则默认打开状态
 * @default false 不折叠
 */
export function getSidebarStatus(): boolean {
  const record = CacheService.local.get(CacheKey.SIDEBAR_STATUS)
  return record ? record === '1' : false
}

export function remvoeSidebarStatus(): void {
  CacheService.local.remove(CacheKey.SIDEBAR_STATUS)
}