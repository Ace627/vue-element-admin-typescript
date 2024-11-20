<template>
  <div>
    NotFound

    <el-button @click="$router.replace('/')" type="primary">返回首页</el-button>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'NotFound' })
</script>

<style lang="scss" scoped></style>
