export default defineStore('setting', () => {
  const transitionName = ref<string>('fade-transform')
  const showLogo = ref<boolean>(true)

  return { showLogo, transitionName }
})
