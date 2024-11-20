<template>
  <div @click="emits('toggleClick')">
    <Icon :name :size />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Hamburger' })

const emits = defineEmits(['toggleClick'])

const appStore = useAppStore()
const size = ref(28)
const name = computed(() => (appStore.isCollapse ? `el-icon-Expand` : `el-icon-Fold`))
</script>

<style lang="scss" scoped></style>
