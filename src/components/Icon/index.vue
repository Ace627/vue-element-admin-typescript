<template>
  <!-- ElementPlus 内置图标 -->
  <el-icon v-if="isElIcon">
    <component :is="name.replace(EL_ICON_PREFIX, '')" />
  </el-icon>

  <!-- Iconfont 图标 -->
  <el-icon :class="`iconfont icon-${name.replace(ICONFONT_PREFIX, '')}`" v-else-if="isIconfont"> </el-icon>
</template>

<script setup lang="ts">
defineOptions({ name: 'Icon' })
import { isString } from 'lodash-es'
import { EL_ICON_PREFIX, ICONFONT_PREFIX } from './icon.constant'

const props = defineProps({
  /** 图标的名称 */
  name: { type: String, required: true },
  /** 图标的大小 */
  size: { type: [String, Number], default: '1em' },
  /** 图标的颜色 */
  color: { type: String, default: 'currentColor' }
})

const isElIcon = computed(() => props.name.includes(EL_ICON_PREFIX))
const isIconfont = computed(() => props.name.includes(ICONFONT_PREFIX))
const iconSize = computed(() => (isString(props.size) ? props.size : `${props.size}px`))
const iconColor = computed(() => props.color)
</script>

<style lang="scss" scoped>
.el-icon {
  font-size: v-bind(iconSize);
  color: v-bind(iconColor);
}
</style>
