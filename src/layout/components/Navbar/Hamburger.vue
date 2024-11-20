<template>
  <div @click="emits('toggleClick')">
    <Icon name="el-icon-Expand" :size v-if="appStore.isCollapse" />
    <Icon name="el-icon-Fold" :size v-else />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Hamburger' })

const emits = defineEmits(['toggleClick'])

const size = ref(28)
const appStore = useAppStore()
</script>

<style lang="scss" scoped></style>
