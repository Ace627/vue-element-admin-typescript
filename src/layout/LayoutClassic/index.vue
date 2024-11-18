<template>
  <div class="layout-classic" :class="classes">
    <!-- mobile 端侧边栏遮罩层 -->
    <div v-if="appStore.isMobile && !appStore.isCollapse" class="drawer-bg" @click="handleClickOutside"></div>

    <div class="sidebar-container">
      <AppLogo v-if="settingStore.showLogo" />
      <el-menu :collapse="appStore.isCollapse" :collapseTransition="false" uniqueOpened :defaultActive>
        <AsideSubMenu :menuList />
      </el-menu>
    </div>

    <div class="main-container clearFix">
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
/** 用来添加到根组件的动态类的集合 */
const classes = computed(() => [
  appStore.device,
  { 'has-logo': settingStore.showLogo },
  { 'open-sidebar': !appStore.isCollapse },
  { 'hide-sidebar': appStore.isCollapse },
  { withoutAnimation: appStore.withoutAnimation },
])

function handleClickOutside() {
  appStore.closeSidebar(true)
}
</script>

<style lang="scss" scoped>
.layout-classic {
  position: relative;
  width: 100%;
  height: 100%;

  /* 移除侧栏和主容器的过渡效果 */
  &.withoutAnimation .sidebar-container,
  &.withoutAnimation .main-container {
    transition: none;
  }
}

/* 左侧边栏抽屉背景遮罩 */
.drawer-bg {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
  width: 100%;
  height: 100%;
  background-color: var(--el-overlay-color-lighter);
  overflow: hidden;
}
.sidebar-container {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10;
  width: var(--ap-sidebar-width);
  height: 100%;
  color: var(--ap-sidebar-text-color);
  background-color: var(--ap-sidebar-bg-color);
  transition: width var(--el-transition-duration);
  overflow: hidden;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
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
.fixed-header {
  position: fixed;
  top: 0;
  z-index: 8;
  width: calc(100% - var(--ap-sidebar-width));
  transition: width var(--el-transition-duration);
}
.fixed-header + .app-main {
  height: calc(100vh - var(--ap-header-height));
  margin-top: var(--ap-header-height);
}
.app-main {
  position: relative;
  width: 100%;
  overflow: hidden;
}

/* 桌面模式 侧栏折叠 */
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

/* 移动端 侧边栏展开 */
.mobile {
  .fixed-header {
    width: 100%;
  }
  .main-container {
    margin-left: 0;
  }
}

/* 移动端 侧边栏折叠 */
.mobile.hide-sidebar {
  .sidebar-container {
    width: 0;
    pointer-events: none;
  }
}
</style>
