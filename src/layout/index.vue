<template>
  <LayoutClassic />
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' })
import LayoutClassic from './LayoutClassic/index.vue'

const appStore = useAppStore()
</script>

<style lang="scss" scoped></style>
