export {}

declare module 'vue' {
  export interface GlobalComponents {
    AutoWrapList: typeof import('../src/components/AutoWrapList/index.vue')['default']
    IconFont: typeof import('../src/components/IconFont/index.vue')['default']
    Screenfull: typeof import('../src/components/Screenfull/index.vue')['default']
  }
}
