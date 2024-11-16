export default defineStore('setting', () => {
  const transitionName = ref<string>('fade-transform')

  return { transitionName }
})
