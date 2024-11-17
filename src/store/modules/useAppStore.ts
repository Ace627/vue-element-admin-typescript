export default defineStore('app', () => {
  /** 是否移除侧栏和主容器的过渡效果 */
  const withoutAnimation = ref<boolean>(false)
  /** 是否折叠菜单 */
  const isCollapse = ref<boolean>(false)
  /** 设备类型 */
  const device = ref<DeviceType>('desktop')
  const isMobile = computed(() => device.value === 'mobile')
  const isDesktop = computed(() => device.value === 'desktop')

  /** 面包屑开关菜单栏的回调 */
  function toggleSidebar(): void {
    withoutAnimation.value = false
    isCollapse.value = !isCollapse.value
  }

  /** 关闭侧边栏（主要用于移动端状态下） */
  function closeSidebar(hasAnimation: boolean = false): void {
    isCollapse.value = true
    withoutAnimation.value = hasAnimation
  }

  return { isCollapse, isMobile, isDesktop, withoutAnimation, device, toggleSidebar, closeSidebar }
})
