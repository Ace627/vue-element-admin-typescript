<template>
  <div class="app-content flex flex-col h-full">
    <el-form>
      <el-row>
        <el-col :lg="5">
          <el-form-item label="设计稿宽度">
            <el-input-number v-model.number="designWidth" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :lg="5">
          <el-form-item label="设计稿高度">
            <el-input-number v-model.number="designHeight" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :lg="5">
          <el-form-item label="列表项间距">
            <el-input-number v-model.number="gap" :min="0"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :lg="5">
          <el-form-item label="列表项个数">
            <el-input-number v-model.number="count" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-scrollbar>
      <AutoWrapList :minWidth="designWidth" :gap>
        <div class="wrap-item flex-center" v-for="(item, index) in count" :key="index" :style="styles">
          <span>{{ item }}</span>
        </div>
      </AutoWrapList>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'WrapList' })

/** 设计稿宽度 */
const designWidth = ref<number>(150)
/** 设计稿高度 */
const designHeight = ref<number>(150)
/** 列表项间距 */
const gap = ref<number>(16)
/** 列表项个数 */
const count = ref<number>(18)

const styles = computed(() => ({ '--wrap-item-height': `${designHeight.value}px` }))
</script>

<style lang="scss" scoped>
.wrap-item {
  --item-font-size: 64px;
  cursor: pointer;
  height: var(--wrap-item-height, 100px);
  font-size: var(--item-font-size);
  font-weight: bold;
  border-radius: 8px;
  border: var(--el-border);
  color: var(--el-color-primary);
  background-color: var(--el-color-primary-light-8);
  transition: all var(--el-transition-duration);
  &:hover {
    font-size: calc(var(--item-font-size) * 1.5);
    color: var(--el-color-white);
    border-color: var(--el-color-primary);
    background-color: var(--el-color-primary);
  }
}
</style>
