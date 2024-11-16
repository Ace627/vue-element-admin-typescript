<template>
  <!-- 若依登录页 -->
  <LoginRuoYi v-if="type === 1" />
</template>

<script setup lang="ts">
defineOptions({ name: 'Login' })
import LoginRuoYi from './template/LoginRuoYi/index.vue'

const type = ref<number>(1)
</script>

<style lang="scss" scoped></style>
