<template>
  <div class="layout-classic" :class="classes">
    <div class="sidebar-container">
      <AppLogo v-if="settingStore.showLogo" />
      <el-menu :collapse="appStore.isCollapse" :collapseTransition="false" uniqueOpened :defaultActive>
        <AsideSubMenu :menuList />
      </el-menu>
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
defineOptions({ name: 'LayoutClassic' })
import { AppLogo, AppMain, Navbar } from '../components'
import AsideSubMenu from '../components/AppMenu/AsideSubMenu.vue'

const route = useRoute()
const appStore = useAppStore()
const useStore = useUserStore()
const settingStore = useSettingStore()

const defaultActive = computed(() => route.meta.activeMenu ?? route.path)
const menuList = computed(() => useStore.routeList)
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

.el-menu {
  --el-menu-item-height: var(--ap-sidebar-item-height);
  --el-menu-sub-item-height: var(--ap-sidebar-item-height);
  --el-menu-text-color: var(--ap-sidebar-text-color);
  --el-menu-bg-color: var(--ap-sidebar-bg-color);
  --el-menu-hover-bg-color: var(--ap-sidebar-item-hover-bg-color);
  --el-menu-active-color: var(--ap-sidebar-active-text-color);
  --el-menu-hover-text-color: var(--ap-sidebar-hover-text-color);
  width: 100%;
  height: 100%;
  border: none;
}

/* 解决折叠状态下菜单图标不居中的问题 */
:deep(.el-menu--collapse) {
  .el-tooltip__trigger {
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: skyblue;
    .menu-icon {
      margin-right: 0;
    }
  }
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
