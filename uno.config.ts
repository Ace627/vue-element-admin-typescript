import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist', '.git', '.vscode', 'public', 'build', 'config', '.github', 'types']
    }
  },

  presets: [
    /** 默认预设，包括Tailwind CSS、Windi CSS、Bootstrap、Tachyons，可以使用以上任意规则 https://unocss.nodejs.cn/presets/uno */
    presetUno()
  ],

  /** 规则定义工具类和生成的 CSS。UnoCSS 有许多内置规则，但也允许轻松添加自定义规则 https://unocss.nodejs.cn/config/rules */
  rules: [
    [/wh-(.+)$/, ([, d]) => ({ width: `${d}`, height: `${d}` })],
    ['bg-repeat-none', { 'background-repeat': 'no-repeat' }]
  ],

  /** 受 Windi CSS 的 启发，快捷方式可让你将多个规则组合成一个简写 https://unocss.nodejs.cn/config/shortcuts */
  shortcuts: {
    'wh-full': 'w-full h-full', // 宽高百分比铺满
    'wh-screen': 'w-screen h-screen', // 宽高视口铺满
    'flex-center': 'flex justify-center items-center', // 利用 flex 使子元素垂直水平居中
    'flex-col-center': 'flex-center flex-col',
    clearFix: 'before:content-empty before:table before:clear-both after:content-empty after:table after:clear-both', // 同时解决高度塌陷和外边距折叠的问题
    'app-content': 'relative w-full p-16px', // 业务页面几乎都应该在根元素上挂载 class="app-content"，以保持页面美观
    'b-rd-circle': 'b-rd-50%',
    'c-primary': 'c-[--el-color-primary]',
    'c-success': 'c-[--el-color-success]',
    'c-warning': 'c-[--el-color-warning]',
    'c-info': 'c-[--el-color-info]',
    'c-danger': 'c-[--el-color-danger]',
    'bg-primary': 'bg-[--el-color-primary]',
    'bg-success': 'bg-[--el-color-success]',
    'bg-warning': 'bg-[--el-color-warning]',
    'bg-info': 'bg-[--el-color-info]',
    'bg-danger': 'bg-[--el-color-danger]'
  }
})
