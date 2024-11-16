<template>
  <div class="app-content">
    <AutoWrapList>
      <div class="item text-64px flex-center bg-[--el-color-primary] c-white" v-for="(item, index) in 99" :key="index">{{ item }}</div>
    </AutoWrapList>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Dashboard' })

const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.item {
  height: 150px;
  border-radius: 8px;
}
</style>
