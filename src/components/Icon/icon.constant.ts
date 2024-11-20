import { icons } from '@element-plus/icons-vue/global'
import iconfonts from '@/styles/iconfont/iconfont.json'

/** ElementPlus 的图标前缀标识 */
export const EL_ICON_PREFIX = `el-icon-`

/** ElementPlus 内置的图标列表 */
export const EL_ICON_LIST = icons

/** ElementPlus 内置的图标名字列表 */
export const EL_ICON_NAME_LIST = Object.keys(icons).map((item) => EL_ICON_PREFIX + item)

/** Iconfont 的图标前缀标识 */
export const ICONFONT_PREFIX = 'iconfont-'

/** Iconfont 的图标名字列表 */
export const ICONFONT_NAME_LIST = iconfonts.glyphs.map((v) => v.font_class).map((item) => ICONFONT_PREFIX + item)
