<template>
  <div class="small-card shadow">
    <div class="small-card__header" v-if="title">{{ title }}</div>
    <div class="small-card__body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'SmallCard' })

const props = defineProps({
  title: { type: String }
})
</script>

<style lang="scss" scoped>
.small-card {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 160px;
  border-radius: 14px;
  overflow: hidden;
  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    color: var(--el-color-white);
    background-color: var(--el-color-danger);
  }
  &__body {
    width: 100%;
    flex: 1;
    background-color: var(--el-color-white);
  }
}
</style>
