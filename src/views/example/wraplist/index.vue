<template>
  <div class="app-content">
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

    <AutoWrapList :minWidth="designWidth" :gap class="overflow-y-auto flex-1">
      <div class="wrap-item flex-center" v-for="(item, index) in count" :key="index" :style="styles">
        <span>{{ item }}</span>
      </div>
    </AutoWrapList>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'WrapList' })

/** 设计稿宽度 */
const designWidth = ref<number>(375)
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
  height: var(--wrap-item-height, 100px);
  font-size: 32px;
  border-radius: 8px;
  border: var(--el-border);
  background-color: #fff;
  box-shadow: var(--el-box-shadow);
}
</style>
