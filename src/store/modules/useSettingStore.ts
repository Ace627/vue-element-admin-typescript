type TransitionName = 'fade-transform' | 'el-fade-in-linear' | 'el-fade-in' | 'el-zoom-in-center' | 'el-zoom-in-top' | 'el-zoom-in-bottom'

export default defineStore('setting', () => {
  const transitionName = ref<TransitionName>('fade-transform')
  const showLogo = ref<boolean>(true)

  return { showLogo, transitionName }
})
