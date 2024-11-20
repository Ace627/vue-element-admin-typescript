<template>
  <div class="app-content flex flex-col h-full">
    <div class="mb-16px">
      <el-button :plain="iconType !== 1" type="primary" @click="updateIconType(1)">ElementPlus</el-button>
      <el-button :plain="iconType !== 2" type="primary" @click="updateIconType(2)">Iconfont</el-button>
    </div>

    <el-scrollbar>
      <AutoWrapList :min-width="150" :gap="0" class="icon-list">
        <div class="icon-item" v-for="(item, index) in iconList" :key="index" @click="handleCopyIcon(item)">
          <Icon :name="item" />
          <span class="text-14px mt-6px">{{ item.replace(iconPrefix, '') }}</span>
        </div>
      </AutoWrapList>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Icons' })
import { EL_ICON_PREFIX, EL_ICON_NAME_LIST, ICONFONT_NAME_LIST, ICONFONT_PREFIX } from '@/components/Icon/icon.constant'
import { copyText } from '@/utils/lodash-added'

const iconType = ref<number>(1)
const iconList = ref<string[]>([])
const iconPrefix = ref<string>('')

function updateIconType(type: number = 1) {
  if (type === 1) {
    iconPrefix.value = EL_ICON_PREFIX
    iconList.value = EL_ICON_NAME_LIST
  }
  if (type === 2) {
    iconPrefix.value = ICONFONT_PREFIX
    iconList.value = ICONFONT_NAME_LIST
  }
  iconType.value = type
}

function handleCopyIcon(name: string) {
  const comStr = `<Icon name='${name}' />`
  copyText(comStr)
  useModal().msgSuccess(`${comStr} 🔥`)
}

onMounted(() => {
  updateIconType()
})
</script>

<style lang="scss" scoped>
.icon-list {
  border-top: var(--el-border);
  border-left: var(--el-border);
  overflow-x: hidden;
  overflow-y: auto;
}
.icon-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 16px 0;
  font-size: 36px;
  border-right: var(--el-border);
  border-bottom: var(--el-border);
  transition: background-color var(--el-transition-duration);
  &__title {
    margin-top: 6px;
    font-size: 14px;
  }
  &:hover {
    color: var(--el-color-primary);
    background-color: var(--el-color-primary-light-9);
  }
}

:deep(.el-scrollbar) {
  padding: 16px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: var(--el-box-shadow);
  overflow: hidden;
}
</style>
