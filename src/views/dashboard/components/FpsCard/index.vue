<template>
  <SmallCard title="FPS">
    <div class="flex-center flex-col h-full text-44px">{{ fps }}</div>
  </SmallCard>
</template>

<script setup lang="ts">
defineOptions({ name: 'FpsCard' })
import SmallCard from '../SmallCard/index.vue'

const fps = useFps()
</script>

<style lang="scss" scoped></style>
