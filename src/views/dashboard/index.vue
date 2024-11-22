<template>
  <div class="app-content">
    <div class="text-64px">{{ fps }}</div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Dashboard' })

const appStore = useAppStore()
const userStore = useUserStore()
const fps = useFps()
</script>

<style lang="scss" scoped>
.item {
  height: 150px;
  border-radius: 8px;
}
</style>
