import type { App } from 'vue'
import { registerElementIcon } from './modules/element-icon'
import { registerGlobalComponent } from './modules/global-component'

export function setupPlugins(app: App) {
  /** 导入 ElementPlus 所有图标并进行全局注册 */
  app.use(registerElementIcon)
  /** 批量注册全局组件 */
  app.use(registerGlobalComponent)
}
