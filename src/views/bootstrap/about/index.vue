<template>
  <div class="app-content">
    <el-card v-for="(item, index) in list" :key="index">
      <template #header> {{ item.title }} </template>
      <AutoWrapList :min-width="170">
        <el-link type="primary" v-for="(v, index) in item.children" :key="index" :href="v.link" target="_blank">{{ v.title }}</el-link>
      </AutoWrapList>
    </el-card>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'About' })

const list = ref([
  {
    title: '开发工具',
    children: [
      { title: 'ChatGPT', link: 'https://chatgpt.com' },
      { title: '文心一言', link: 'https://yiyan.baidu.com' },
      { title: '按钮生成器', link: 'https://markodenic.com/tools/buttons-generator' }
    ]
  },
  {
    title: '开发文档',
    children: [
      { title: 'Vue3 中文文档', link: 'https://cn.vuejs.org/guide/introduction' },
      { title: 'VueRouter 中文网', link: 'https://router.vuejs.org/zh/guide' },
      { title: 'Element Plus', link: 'https://element-plus.org/zh-CN/component/button.html' },
      { title: 'Ant Design Vue', link: 'https://www.antdv.com/components/button-cn' },
      { title: 'UnoCSS 中文网', link: 'https://unocss.nodejs.cn' },
      { title: 'VueUse 中文文档', link: 'https://vueuse.pages.dev' },
      { title: 'Pinia 中文文档', link: 'https://pinia.vuejs.org/zh' },
      { title: 'Axios 中文文档', link: 'https://www.axios-http.cn' },
      { title: 'DayJS 中文网', link: 'https://dayjs.fenxianglu.cn' },
      { title: 'Canvas 中文文档', link: 'https://www.canvasapi.cn' },
      { title: 'NodeJS 平滑文档', link: 'https://doc.cherrychat.org/node' },
      { title: 'Electron 中文网', link: 'https://electron.nodejs.cn' },
      { title: 'Pnpm 中文文档', link: 'https://www.pnpm.cn' },
      { title: 'Vite 中文文档', link: 'https://cn.vitejs.dev/guide' },
      { title: 'Apache ECharts', link: 'https://echarts.apache.org/zh/index.html' },
      { title: 'Animate.css', link: 'https://animate.style' },
      { title: 'Lodash 中文文档', link: 'https://www.lodashjs.com' }
    ]
  }
])
</script>

<style lang="scss" scoped>
a {
  display: flex;
  align-items: center;
  justify-content: center;
  // color: var(--el-color-primary);
  font-size: 20px;
  transition: all 0.3s;
}

.app-content {
  user-select: none;
  :deep(.el-card) {
    --el-card-padding: 16px;
    .el-card__header {
      display: flex;
      align-items: center;
      color: #3d4b66;
      font-size: 16px;
      font-weight: bold;
      letter-spacing: 1px;
      &::before {
        display: block;
        content: '';
        width: 4px;
        height: 1em;
        margin-right: 6px;
        border-radius: 6px;
        background-color: var(--el-color-primary);
      }
    }
    + .el-card {
      margin-top: 16px;
    }
  }
}
</style>
