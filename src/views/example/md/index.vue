<template>
  <div class="app-content">
    <Markdown v-model="content" :height="500" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'MdEditor' })

const content = ref('**仰天大笑出门去，我辈岂是蓬蒿人。**')
</script>

<style lang="scss" scoped></style>
