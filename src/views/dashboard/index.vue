<template>
  <div class="app-content">
    <el-button plain type="danger" @click="hanleLogout">退出登录</el-button>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Dashboard' })

const appStore = useAppStore()
const userStore = useUserStore()

async function hanleLogout() {
  try {
    await useModal().confirm(`确定注销并退出系统吗？`)
    await userStore.logout()
    window.location.reload()
  } catch (error) {
    if (error === 'cancel') return useModal().msg('操作取消')
  }
}
</script>

<style lang="scss" scoped>
.item {
  height: 150px;
  border-radius: 8px;
}
</style>
