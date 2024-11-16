import { CacheKey } from '../cache.constant'
import { CacheService } from '../cache.service'

export function setAccessToken(token: string): void {
  CacheService.local.set(CacheKey.ACCESS_TOKEN, token)
}

export function getAccessToken(): string | null {
  return CacheService.local.get(CacheKey.ACCESS_TOKEN)
}

export function removeAccessToken(): void {
  CacheService.local.remove(CacheKey.ACCESS_TOKEN)
}

export function setRefreshToken(token: string): void {
  CacheService.local.set(CacheKey.REFRESH_TOKEN, token)
}

export function getRefreshToken(): string | null {
  return CacheService.local.get(CacheKey.REFRESH_TOKEN)
}

export function removeRefreshToken(): void {
  CacheService.local.remove(CacheKey.REFRESH_TOKEN)
}
