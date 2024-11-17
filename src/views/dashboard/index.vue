<template>
  <div class="app-content">
    首页
    <div v-for="(item, index) in 99" class="bg-pink mb-16px py-10px b-rd-10px" :key="index">{{ item }}</div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Dashboard' })

const appStore = useAppStore()
const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.item {
  height: 150px;
  border-radius: 8px;
}
</style>
