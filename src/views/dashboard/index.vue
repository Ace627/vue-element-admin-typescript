<template>
  <div class="app-content">
    <AutoWrapList :min-width="160" :gap="16">
      <CalendarCard />
      <FpsCard />
    </AutoWrapList>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Dashboard' })
import FpsCard from './components/FpsCard/index.vue'
import CalendarCard from './components/CalendarCard/index.vue'
</script>

<style lang="scss" scoped>
.app-content {
  --card-size: 160px;
}
</style>
