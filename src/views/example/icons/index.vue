<template>
  <div class="app-content">
    <el-card>
      <AutoWrapList :min-width="150" :gap="0" class="icon-list">
        <div class="icon-item" v-for="(item, index) in icons" :key="index">
          <IconFont :name="item" />
          <span class="text-14px mt-6px">{{ item }}</span>
        </div>
      </AutoWrapList>
    </el-card>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Icons' })
import iconfonts from '@/styles/iconfont/iconfont.json'

const icons = computed(() => iconfonts.glyphs.map((v) => v.font_class))

// function copyText(name:string) {
//   cop
// }
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
</style>
