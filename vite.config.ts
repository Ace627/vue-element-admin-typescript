import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite' // Vite Plugin
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import AutoComponents from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    /** 提供 Vue 3 单文件组件支持 */
    vue(),
    /** 即时按需的原子化 CSS 引擎 UnoCSS */
    UnoCSS(),
    /** Element Plus 样式自动按需导入 */
    ElementPlus({ useSource: true }),
    /** 自动跟踪依赖并导入所需的内容，避免手动导入的繁琐步骤 */
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
      imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'], // 自动导入 vue、vue-router、Pinia 相关函数
      dts: 'types/auto-generate/auto-import.d.ts',
      dirs: ['src/store/modules', 'src/hooks'], // 配置其它需要导入的文件目录
    }),
    /** 提供组件自动按需导入及类型声明功能 */
    AutoComponents({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
      dts: 'types/auto-generate/auto-components.d.ts',
      dirs: [], // 配置其它需要导入的文件目录 'src/components'
    }),
  ],

  resolve: {
    alias: {
      /** 设置 `@` 指向 `src` 目录 */
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      /** 设置 `#` 指向 `types` 目录 */
      '#': fileURLToPath(new URL('./types', import.meta.url)),
    },
  },

  css: {
    /**
     * 如果启用了这个选项，那么 CSS 预处理器会尽可能在 worker 线程中运行；即通过多线程运行 CSS 预处理器，从而极大提高其处理速度
     * https://cn.vitejs.dev/config/shared-options#css-preprocessormaxworkers
     */
    preprocessorMaxWorkers: true,
    /**
     * 建议只用来嵌入 SCSS 的变量声明文件，嵌入后全局可用
     * 该选项可以用来为每一段样式内容添加额外的代码。但是要注意，如果你添加的是实际的样式而不仅仅是变量，那这些样式在最终的产物中会重复。
     * https://cn.vitejs.dev/config/shared-options.html#css-preprocessoroptions-extension-additionaldata
     */
    preprocessorOptions: {
      scss: {
        // 如果您的终端提示 legacy JS API Deprecation Warning, 您可以配置以下代码在 vite.config.ts
        // https://element-plus.org/zh-CN/guide/installation.html#sass
        api: 'modern-compiler',
        additionalData: `@use "@/styles/element-plus/element-theme.scss" as *;`,
      },
    },
  },
})
