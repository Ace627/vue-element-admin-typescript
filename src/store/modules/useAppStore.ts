export default defineStore('app', () => {
  /** 是否折叠菜单 */
  const isCollapse = ref<boolean>(false)
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
    isCollapse.value = true
  }

  return { isCollapse, isMobile, isDesktop, device, toggleSidebar, closeSidebar }
})
