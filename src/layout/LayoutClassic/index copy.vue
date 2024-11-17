<template>
  <el-container :class="classes" class="h-full">
    <el-aside width="200px">
      <AppLogo v-if="settingStore.showLogo" />
      Aside
    </el-aside>

    <el-container class="main-container">
      <el-header>
        <Navbar />
      </el-header>

      <AppMain />
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
defineOptions({ name: 'LayoutClassic' })
import { AppMain, AppLogo, Navbar } from '../components'

const appStore = useAppStore()
const settingStore = useSettingStore()

const classes = computed(() => ['layout-classic', { 'has-logo': settingStore.showLogo }])
</script>

<style scoped>
/* 重置 Element Plus 的样式 */
.el-header {
  --el-header-height: auto;
  --el-header-padding: 0;
}
.el-main {
  --el-main-padding: 0;
}

.main-container {
  position: relative;
  height: 100%;
}
</style>
