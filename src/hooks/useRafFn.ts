/**
 * 在每个 requestAnimationFrame 调用传入的函数，提供暂停与恢复功能。
 * @param fn 每帧执行的回调函数
 * @param options 配置选项
 * @returns 控制动画帧的工具
 */

// 定义配置选项的接口
export interface UseRafFnOptions {
  /**
   * 是否在创建时立即启动
   * @default true
   */
  immediate?: boolean
}

// 定义返回值的接口
export interface UseRafFnReturn {
  /**
   * 当前是否激活
   */
  isActive: Ref<boolean>
  /**
   * 暂停动画帧循环
   */
  pause: () => void
  /**
   * 恢复动画帧循环
   */
  resume: () => void
}

export default (fn: () => void, options: UseRafFnOptions = {}) => {
  const isActive = ref(false) // 是否激活
  let rafId: number | null = null // 存储 requestAnimationFrame 的 ID

  function loop() {
    if (!isActive.value) return
    fn() // 执行回调函数
    rafId = requestAnimationFrame(loop) // 递归调用
  }

  function resume() {
    if (isActive.value) return
    isActive.value = true
    loop() // 开始动画帧循环
  }

  function pause() {
    isActive.value = false
    if (!rafId) return
    cancelAnimationFrame(rafId) // 取消动画帧
    rafId = null
  }

  // 默认是否立即启动
  if (options.immediate !== false) resume()

  // 生命周期管理
  onMounted(() => {
    if (options.immediate) resume()
  })

  onUnmounted(() => {
    pause()
  })

  return { isActive, pause, resume }
}
