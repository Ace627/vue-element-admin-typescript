<template>
  <div @click="emits('toggleClick')">
    <IconFont name="Expand" :size="24" v-if="appStore.isCollapse" />
    <IconFont name="Fold" :size="24" v-else />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Hamburger' })

const emits = defineEmits(['toggleClick'])

const appStore = useAppStore()
</script>

<style lang="scss" scoped></style>
