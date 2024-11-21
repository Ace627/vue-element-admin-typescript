<template>
  <div class="app-content"></div>
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
