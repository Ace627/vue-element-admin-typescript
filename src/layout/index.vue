<template>
  <LayoutMobile v-if="appStore.isMobile" />
  <LayoutClassic v-else-if="appStore.isDesktop" />
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' })
import LayoutMobile from './LayoutMobile/index.vue'
import LayoutClassic from './LayoutClassic/index.vue'

const appStore = useAppStore()
</script>

<style lang="scss" scoped></style>
