<template>
  <!-- 有下级，用el-sub-menu，无下级用el-menu-item -->
  <template v-for="item in menuList" :key="item.path">
    <!-- 非叶子节点 -->
    <el-sub-menu v-if="item.children?.length" :index="item.path">
      <template #title>
        <IconFont class="menu-icon" :name="item.meta?.icon ?? 'Flag'" />
        <span class="menu-title">{{ item.meta?.title }}</span>
      </template>
      <AsideSubMenu :menuList="item.children" />
    </el-sub-menu>

    <!-- 叶子节点[功能节点] -->
    <el-menu-item v-else :index="item.path" @click="handleMenuRouter(item)">
      <IconFont class="menu-icon" :name="item.meta?.icon ?? 'Flag'" />
      <template #title>
        <span class="menu-title">{{ item.meta?.title }} </span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
defineOptions({ name: 'AsideSubMenu' })
import { isExternal } from '@/utils/validate'
import { RouteRecordRaw } from 'vue-router'

defineProps({
  menuList: { type: Array as PropType<Array<RouteRecordRaw>>, required: true },
})

const router = useRouter()

function handleMenuRouter(record: any) {
  if (isExternal(record.path)) {
    return window.open(record.path, '_blank')
  } else {
    router.push(record.path)
  }
}
</script>

<style lang="scss" scoped>
.el-menu-item.is-active {
  background-color: var(--ap-sidebar-menu-active-bg-color) !important;
}

.el-menu-item,
:deep(.el-sub-menu__title) {
  user-select: none;
  height: var(--ap-sidebar-menu-height) !important;
  line-height: var(--ap-sidebar-menu-height) !important;
}

.el-menu-item:hover,
:deep(.el-sub-menu__title:hover) {
  background-color: var(--ap-sidebar-menu-hover-bg-color);
}

// .menu-icon {
// }
.menu-title {
  margin-left: 4px;
}
</style>
