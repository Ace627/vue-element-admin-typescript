<template>
  <div class="app-content">
    <el-card v-for="(item, index) in list" :key="index">
      <template #header> {{ item.title }} </template>
      <AutoWrapList :min-width="170">
        <div class="link-card" v-for="(v, index) in item.children" :key="index" @click="toTarget(v)">
          <div class="link-card__logo">
            <img :src="v.icon ?? '/favicon.ico'" alt="" class="logo-img" @error="loadIconImageError" />
          </div>
          <div class="link-card__title">{{ v.title }}</div>
        </div>
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
      { title: '代码小抄', link: 'https://www.codecopy.cn', icon: 'https://www.codecopy.cn/favicon.ico' },
      { title: 'ChatGPT', link: 'https://chatgpt.com', icon: 'https://cdn.oaistatic.com/assets/apple-touch-icon-mz9nytnj.webp' },
      { title: '文心一言', link: 'https://yiyan.baidu.com', icon: 'https://nlp-eb.cdn.bcebos.com/logo/favicon.ico' },
      { title: '按钮生成器', link: 'https://markodenic.com/tools/buttons-generator', icon: 'https://markodenic.com/wp-content/themes/blog/favicon/apple-touch-icon.png' },
      { title: 'VSCode', link: 'https://code.visualstudio.com/#alt-downloads', icon: 'https://code.visualstudio.com/apple-touch-icon.png' },
      { title: '彩云小译', link: 'https://fanyi.caiyunapp.com/#/?w=', icon: 'https://www.caiyunapp.com/imgs/xiaoyilogo.png' },
      { title: '百度翻译', link: 'https://fanyi.baidu.com/mtpe-individual/multimodal', icon: 'https://fanyi.baidu.com/favicon.ico' },
      { title: '搜狗翻译', link: 'https://fanyi.sogou.com/text', icon: 'https://dlweb.sogoucdn.com/translate/favicon.ico?v=20180424' },
      { title: '有道翻译', link: 'https://fanyi.youdao.com', icon: 'https://ydlunacommon-cdn.nosdn.127.net/31cf4b56e6c0b3af668aa079de1a898c.png' },
      { title: 'GitMind 思维导图', link: 'https://gitmind.cn', icon: 'https://qncdn.aoscdn.com/astro/gitmind/_astro/favicon-32@32w.dc79bcef.png' },
    ],
  },
  {
    title: '前端开发文档',
    children: [
      { title: 'Vue3 中文文档', link: 'https://cn.vuejs.org/guide/introduction', icon: 'https://cn.vuejs.org/logo.svg' },
      { title: 'VueRouter 中文网', link: 'https://router.vuejs.org/zh/guide', icon: 'https://cn.vuejs.org/logo.svg' },
      { title: 'Element Plus', link: 'https://element-plus.org/zh-CN/component/button.html', icon: 'https://element-plus.org/apple-touch-icon.png' },
      { title: 'Ant Design Vue', link: 'https://www.antdv.com/components/button-cn', icon: 'https://aliyuncdn.antdv.com/favicon.ico' },
      { title: 'UnoCSS 中文网', link: 'https://unocss.nodejs.cn', icon: 'https://unocss.nodejs.cn/favicon.ico' },
      { title: 'UnoCSS 速查网', link: 'https://unocss.dev/interactive', icon: 'https://unocss.nodejs.cn/favicon.ico' },
      { title: 'VueUse 中文文档', link: 'https://vueuse.pages.dev', icon: 'https://vueuse.pages.dev/favicon.svg' },
      { title: 'Pinia 中文文档', link: 'https://pinia.vuejs.org/zh', icon: 'https://pinia.vuejs.org/logo.svg' },
      { title: 'Axios 中文文档', link: 'https://www.axios-http.cn', icon: 'https://www.axios-http.cn/img/favicon.ico' },
      { title: 'DayJS 中文网', link: 'https://dayjs.fenxianglu.cn', icon: 'https://dayjs.fenxianglu.cn/assets/favicon.png' },
      { title: 'Canvas 中文文档', link: 'https://www.canvasapi.cn', icon: 'https://www.canvasapi.cn/favicon.ico' },
      { title: 'NodeJS 平滑文档', link: 'https://doc.cherrychat.org/node', icon: 'https://doc.cherrychat.org/logo.png' },
      { title: 'Electron 中文网', link: 'https://electron.nodejs.cn', icon: 'https://electron.nodejs.cn/assets/img/favicon.ico' },
      { title: 'Pnpm 中文文档', link: 'https://www.pnpm.cn', icon: 'https://www.pnpm.cn/img/favicon.png' },
      { title: 'Vite 中文文档', link: 'https://cn.vitejs.dev/guide', icon: 'https://cn.vitejs.dev/logo.svg' },
      { title: 'Apache ECharts', link: 'https://echarts.apache.org/zh/index.html', icon: 'https://echarts.apache.org/zh/images/favicon.png?_v_=20240226' },
      { title: 'Animate.css', link: 'https://animate.style', icon: 'https://animate.style/img/favicon.ico' },
      { title: '京东微前端', link: 'https://micro-zoe.github.io/micro-app', icon: 'https://micro-zoe.github.io/micro-app/favicon.ico' },
      { title: 'Lodash 中文文档', link: 'https://www.lodashjs.com', icon: 'https://www.lodashjs.com/img/favicon.ico' },
    ],
  },
])

/** 处理链接打开的操作 */
function toTarget(record: any) {
  window.open(record.link, '_blamk')
}

function loadIconImageError(event: Event) {
  ;(event.target as HTMLImageElement).src = '/favicon.ico'
}
</script>

<style lang="scss" scoped>
.link-card {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 10px;
  background-color: #fff;
  border: var(--el-border);
  transition: all var(--el-transition-duration);
  &__logo {
    flex: none;
    margin-right: 4px;
    .logo-img {
      width: 30px;
      height: 30px;
      border-radius: 10px;
    }
  }
  &__title {
    font-size: 14px;
  }
  &:hover {
    color: var(--el-color-primary);
    background-color: var(--el-color-primary-light-9);
  }
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
