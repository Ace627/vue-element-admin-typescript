export default defineStore('app', () => {
  /** 是否折叠菜单 */
  const isCollapse = ref<boolean>(false)
  /** 菜单宽度 */
  const menuWidth = computed(() => (isCollapse.value ? '64px' : '220px'))
  /** 设备类型 */
  const device = ref<DeviceType>('desktop')
  const isMobile = computed(() => device.value === 'mobile')
  const isDesktop = computed(() => device.value === 'desktop')

  /** 面包屑开关菜单栏的回调 */
  function toggleSidebar(): void {
    isCollapse.value = !isCollapse.value
  }

  /** 关闭侧边栏（主要用于移动端状态下） */
  function closeSidebar(): void {
    isCollapse.value = false
  }

  return { isCollapse, isMobile, isDesktop, device, menuWidth, toggleSidebar, closeSidebar }
})
