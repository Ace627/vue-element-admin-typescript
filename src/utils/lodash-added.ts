/** 校验是否是字符串类型的数字 */
export function isStringNumber(value: string): boolean {
  if (typeof value !== 'string') return false
  return !Number.isNaN(Number(value))
}

/** 校验是否是字符串类型的布尔值 */
export function isStringBoolean(value: string): boolean {
  if (typeof value !== 'string') return false
  return ['true', 'false'].includes(value)
}

/** 复制文本到剪贴板 */
export async function copyText(value: string | number | object) {
  let text: string
  const isClipboardApiSupported = window.navigator && window.navigator.clipboard

  if (typeof value === 'string') {
    text = value
  } else if (typeof value === 'number') {
    text = value.toString()
  } else if (typeof value === 'object') {
    text = JSON.stringify(value, null, 2)
  } else {
    throw new Error('不支持的参数类型')
  }

  if (isClipboardApiSupported) {
    try {
      await window.navigator.clipboard.writeText(text)
    } catch (error) {
      throw error
    }
  } else {
    const textarea = document.createElement('textarea')
    textarea.readOnly = true
    textarea.value = text
    textarea.style.position = 'absolute'
    textarea.style.top = '-9999px'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()
    try {
      document.execCommand('copy')
    } catch (error) {
      throw error
    }
    textarea.remove()
  }
}
