<template>
  <!-- 有下级，用 el-sub-menu，无下级用 el-menu-item -->
  <template v-for="item in menuList" :key="item.path">
    <!-- 非叶子节点 -->
    <el-sub-menu v-if="item.children?.length || item.meta?.alwaysShow" :index="item.path">
      <template #title>
        <Icon class="menu-icon" :name="item.meta?.icon" v-if="item.meta?.icon" />
        <span class="menu-title">{{ item.meta?.title }}</span>
      </template>
      <AsideSubMenu v-if="item.children?.length" :menuList="item.children" />
    </el-sub-menu>

    <!-- 叶子节点[功能节点] -->
    <el-menu-item v-else :index="item.path" @click="handleMenuRouter(item)">
      <Icon class="menu-icon" :name="item.meta?.icon" v-if="item.meta?.icon" />
      <template #title>
        <span class="menu-title">{{ item.meta?.title }} </span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
defineOptions({ name: 'AsideSubMenu' })
import { RouteRecordRaw } from 'vue-router'
import { isExternal } from '@/utils/validate'

defineProps({
  menuList: { type: Array as PropType<Array<RouteRecordRaw>>, required: true }
})

const router = useRouter()

function handleMenuRouter(record: RouteRecordRaw) {
  isExternal(record.path) ? window.open(record.path, '_blank') : router.push(record.path)
}
</script>

<style lang="scss" scoped>
.el-icon.menu-icon {
  font-size: var(--ap-sidebar-icon-size);
  font-weight: bold;
}

/* 再次配置前景背景色 是为了侧栏的折叠菜单样式不生效的问题 */
.el-menu-item {
  height: var(--ap-sidebar-item-height);
  color: var(--ap-sidebar-text-color);
  background-color: var(--ap-sidebar-bg-color);
  &:hover {
    background-color: var(--ap-sidebar-item-hover-bg-color);
  }
}

/* 重写激活菜单项的样式 */
.el-menu-item.is-active {
  color: var(--ap-sidebar-active-text-color);
  background-color: var(--ap-sidebar-active-bg-color);
}
</style>
