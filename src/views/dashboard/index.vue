<template>
  <div class="app-content">
    <AutoWrapList>
      <div v-for="(item, index) in 521" class="bg-pink h-150px b-rd-10px text-64px flex-center" :key="index">{{ item }}</div>
    </AutoWrapList>
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
