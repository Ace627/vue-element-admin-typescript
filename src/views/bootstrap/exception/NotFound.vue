<template>
  <div class="wh-full flex justify-center pt-16vh">
    <div class="container">
      <div class="error-code">404</div>
      <div class="message">哎呀！页面走丢了 🤔</div>
      <div class="description">我们找不到你访问的页面，试试回到首页看看吧！</div>
      <el-button type="success" @click="$router.replace('/')">返回首页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'NotFound' })
</script>

<style lang="scss" scoped>
div.wh-full.flex {
  background: linear-gradient(135deg, #f0f8ff, #e6e6fa);
}

.container {
  text-align: center;
  padding: 16px;
}

.error-code {
  font-size: 6rem;
  font-weight: bold;
  color: var(--el-color-danger);
}

.message {
  font-size: 1.5rem;
  margin: 16px 0;
}

.description {
  font-size: 1rem;
  color: var(--el-color-info);
  margin-bottom: 32px;
}
</style>
