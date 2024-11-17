<template>
  <div class="screenfull-container" @click="toggleFullScreen">
    <el-tooltip effect="dark" :content="tips" placement="bottom">
      <IconFont :name="iconName" :size />
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Screenfull' })
import screenfull from 'screenfull'

const props = defineProps({
  /** 全屏的元素，默认是 html */
  element: { type: String, default: 'html' },
  /** 打开全屏提示语 */
  openTips: { type: String, default: '全屏' },
  /** 关闭全屏提示语 */
  exitTips: { type: String, default: '退出全屏' },
  /** 图标的大小，size x size */
  size: { type: [String, Number], default: '1em' },
})

const tips = ref<string>(props.openTips)
const isFullscreen = ref<boolean>(false)
const iconName = computed(() => (isFullscreen.value ? 'ExitFullScreen' : 'FullScreen'))

function toggleFullScreen() {
  if (!screenfull.isEnabled) return useModal().msgWarning('您的浏览器暂不支持全屏效果')
  screenfull.toggle(document.querySelector(props.element) || undefined)
}
function change() {
  isFullscreen.value = screenfull.isFullscreen
  tips.value = screenfull.isFullscreen ? props.exitTips : props.openTips
}

screenfull.on('change', change)

onUnmounted(() => {
  if (screenfull.isEnabled) screenfull.off('change', change)
})
</script>

<style scoped></style>
