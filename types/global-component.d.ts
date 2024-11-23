export {}

declare module 'vue' {
  export interface GlobalComponents {
    Icon: typeof import('../src/components/Icon/index.vue')['default']
    Markdown: typeof import('../src/components/Markdown/index.vue')['default']
    Screenfull: typeof import('../src/components/Screenfull/index.vue')['default']
    AutoWrapList: typeof import('../src/components/AutoWrapList/index.vue')['default']
  }
}
