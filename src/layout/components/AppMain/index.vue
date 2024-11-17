<template>
  <div class="app-main">
    <!-- key 采用 route.path 和 route.fullPath 有着不同的效果，大多数时候 path 更通用 -->
    <el-scrollbar>
      <RouterView v-slot="{ Component, route }">
        <Transition :name="settingStore.transitionName" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppMain' })

const settingStore = useSettingStore()
console.log('settingStore.transitionName: ', settingStore.transitionName)
</script>

<style scoped></style>
