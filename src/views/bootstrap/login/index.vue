<template>
  <div class="wh-full relative">
    <LoginStyle01 v-if="type === 1" />
    <LoginStyle02 v-else-if="type === 2" />

    <div class="absolute right-16px top-16px">
      <el-select v-model="type" style="width: 100px" size="small">
        <el-option label="样式01" :value="1"></el-option>
        <el-option label="样式02" :value="2"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Login' })
import LoginStyle01 from './template/LoginStyle01/index.vue'
import LoginStyle02 from './template/LoginStyle02/index.vue'

const type = ref<number>(1)
</script>

<style lang="scss" scoped>
.el-tag {
  cursor: pointer;
}
.el-tag + .el-tag {
  margin-left: 8px;
}
</style>
