import { dayjs } from 'element-plus'
import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite' // Vite Plugin
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import ElementPlus from 'unplugin-element-plus/vite'
import AutoComponents from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀
  const runtimeConfig = loadEnv(mode, import.meta.dirname, 'VITE_') as unknown as ImportMetaEnv

  return {
    // 部署应用包时的基本 URL
    base: runtimeConfig.VITE_PUBLIC_PATH,

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
        imports: ['vue', 'pinia', 'vue-router'], // 自动导入 vue、vue-router、Pinia 相关函数
        dts: 'types/auto-generate/auto-import.d.ts',
        dirs: ['src/store/modules', 'src/hooks'], // 配置其它需要导入的文件目录
      }),
      /** 提供组件自动按需导入及类型声明功能 */
      AutoComponents({
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
        dts: 'types/auto-generate/auto-components.d.ts',
        dirs: [], // 配置其它需要导入的文件目录 'src/components'
      }),
      /** 针对 index.html，提供压缩和基于 ejs 模板功能，亦可对其注入动态数据 */
      createHtmlPlugin({
        // 在这里写 entry 后，你将不需要在 `index.html` 内添加 script 标签，原有标签需要删除
        entry: 'src/main.ts',
        // 是否压缩 html
        minify: command === 'build',
        // 需要注入 index.html ejs 模版的数据
        inject: {
          data: { VITE_APP_TITLE: runtimeConfig.VITE_APP_TITLE, buildTime: dayjs().format(`YYYY-MM-DD HH:mm:ss`) },
        },
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

    server: {
      /** 设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址 */
      host: true,
      /** 指定开发服务器端口。注意：如果端口已经被使用，Vite 会自动尝试下一个可用的端口，所以这可能不是开发服务器最终监听的实际端口 */
      port: +runtimeConfig.VITE_SERVER_PORT,
      /** 端口被占用时，是否直接退出 | 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口 */
      strictPort: false,
      /** 是否自动打开浏览器 */
      open: runtimeConfig.VITE_AUTO_OPEN === 'true',
      /** 是否允许跨域 */
      cors: true,
      /** 反向代理配置（主要是开发时用来解决跨域问题） */
      proxy: {
        [runtimeConfig.VITE_BASE_API]: {
          target: runtimeConfig.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace('/dev-api', ''),
        },
      },
    },

    build: {
      /** 指定打包文件的输出目录。默认值为 dist ，当 dist 被占用或公司有统一命名规范时，可进行调整 */
      outDir: runtimeConfig.VITE_OUTPUT_DIR,
      /** 图片转 base64 编码的阈值。为防止过多的 http 请求，Vite 会将小于此阈值的图片转为 base64 格式 */
      assetsInlineLimit: 4096,
      /** 规定触发警告的 chunk 大小。（以 kbs 为单位） */
      chunkSizeWarningLimit: 4096,
      /** 启用/禁用 CSS 代码拆分 */
      cssCodeSplit: true,
      /** 构建后是否生成 source map 文件 */
      sourcemap: false,
      /** 是否在构建阶段将 publicDir 目录中的所有文件复制到 outDir 目录中 */
      copyPublicDir: true,
      /** 指定使用哪种混淆器。默认为 esbuild，它比 terser 快 20-40 倍，压缩率只差 1%-2% */
      minify: 'esbuild',
      rollupOptions: {
        output: {
          // 引入文件名的名称
          chunkFileNames: 'js/[name]-[hash].js',
          // 包的入口文件名称
          entryFileNames: 'js/[name]-[hash].js',
          // 对打包出来的资源文件进行分类，分别放到不同的文件夹内
          assetFileNames(chunkInfo) {
            // css 样式文件
            if (chunkInfo.name.endsWith('.css')) {
              return 'css/[name]-[hash].css'
            }
            // 字体文件
            const fontExtList = ['.ttf', '.otf', '.woff', '.woff2', '.eot']
            if (fontExtList.some((ext) => chunkInfo.name.endsWith(ext))) {
              return 'font/[name]-[hash].[ext]'
            }
            // 图片文件
            const imgExtList = ['png', 'jpg', '.jpeg', 'gif', 'webp']
            if (imgExtList.some((ext) => chunkInfo.name.endsWith(ext))) {
              return `img/[name]-[hash].[ext]`
            }
            // 视频文件
            const videoExtList = ['.mp4', '.avi', '.wmv', '.ram', '.mpg', 'mpeg', '.m3u8']
            if (videoExtList.some((ext) => chunkInfo.name.endsWith(ext))) {
              return `video/[name]-[hash].[ext]`
            }
            // 音频文件
            const audioExtList = ['.mp3', '.flac', '.wav', '.aac', '.ape', '.m4a']
            if (audioExtList.some((ext) => chunkInfo.name.endsWith(ext))) {
              return `audio/[name]-[hash].[ext]`
            }
            // 其它文件: 保存在 assets/文件名-哈希值.扩展名
            return 'assets/[name]-[hash].[ext]'
          },
          // 打包的文件进行拆包处理
          manualChunks(chunk) {
            // 这个 chunk 就是所有文件的绝对路径
            // 因为 node_modules 中的依赖通常是不会改变的 所以直接单独打包出去
            // 这个 return 的值就是打包的名称
            // 可以利用浏览器的缓存机制 减少请求次数
            if (chunk.includes('node_modules')) return 'vendor'
          },
        },
      },
    },

    esbuild: {
      /**
       * 打包后是否移除所有的 console、debugger
       * http://cosarty.cn/doc/essay/handbook/esbuild.html#drop
       */
      drop: runtimeConfig.VITE_DROP_CONSOLE === 'true' ? ['console', 'debugger'] : [],
      /**
       * 打包后是否移除所有的注释
       * http://esbuild.docschina.org/api/#legal-comments
       */
      legalComments: runtimeConfig.VITE_CLEAR_COMMENT === 'true' ? 'none' : 'inline',
    },
  }
})
