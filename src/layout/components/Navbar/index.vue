<template>
  <div class="navbar flex items-center">
    <!-- 侧栏折叠控制 -->
    <Hamburger class="navbar-item" @toggleClick="appStore.toggleSidebar" />

    <div class="right h-full ml-auto flex-center">
      <!-- 全屏控件 -->
      <Screenfull class="navbar-item" :size="24" />

      <UserDropDown class="navbar-item" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Navbar' })
import Hamburger from './Hamburger.vue'
import UserDropDown from './UserDropDown.vue'

const appStore = useAppStore()
</script>

<style scoped>
.navbar {
  width: 100%;
  height: var(--ap-navbar-height);
  background-color: var(--ap-navbar-bg-color);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

/* 菜单项的通用样式 */
.navbar-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 8px;
  transition: background-color var(--el-transition-duration-fast);
}
.navbar-item:hover {
  background-color: rgba(0, 21, 41, 0.08);
}
</style>
