<template>
  <div class="layout-classic" :class="classes">
    <div class="sidebar-container">
      <AppLogo v-if="settingStore.showLogo" />
    </div>

    <div class="main-container">
      <div class="fixed-header">
        <Navbar />
      </div>

      <AppMain />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AppLogo, AppMain, Navbar } from '../components'

defineOptions({ name: 'LayoutClassic' })

const appStore = useAppStore()
const settingStore = useSettingStore()

const classes = computed(() => [{ 'has-logo': settingStore.showLogo }, { 'open-sidebar': !appStore.isCollapse }, { 'hide-sidebar': appStore.isCollapse }])
</script>

<style lang="scss" scoped>
.layout-classic {
  position: relative;
  width: 100%;
  height: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  width: calc(100% - var(--ap-sidebar-width));
  transition: width var(--el-transition-duration);
}
.fixed-header + .app-main {
  height: 100vh;
  padding-top: var(--ap-header-height);
  overflow-y: auto;
}

.sidebar-container {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 555;
  width: var(--ap-sidebar-width);
  height: 100%;
  color: var(--ap-sidebar-text-color);
  background-color: var(--ap-sidebar-bg-color);
  transition: width var(--el-transition-duration);
  overflow: hidden;
}

.main-container {
  position: relative;
  height: 100%;
  margin-left: var(--ap-sidebar-width);
  transition: margin-left var(--el-transition-duration);
}

.hide-sidebar {
  .sidebar-container {
    width: var(--ap-sidebar-width--hide);
  }
  .main-container {
    margin-left: var(--ap-sidebar-width--hide);
  }
  .fixed-header {
    width: calc(100% - var(--ap-sidebar-width--hide));
  }
}
</style>
