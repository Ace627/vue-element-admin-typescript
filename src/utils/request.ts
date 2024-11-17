import axios, { HttpStatusCode } from 'axios'
import { getAccessToken } from '@/utils/cache'

export const request = axios.create({
  // baseURL 将自动加在 url 前面，除非 url 是一个绝对 URL
  baseURL: import.meta.env.VITE_BASE_URL,
  // timeout 指定请求超时的毫秒数(0 表示无超时时间)，如果请求花费了超过 timeout 的时间，请求将被中断
  timeout: parseInt(import.meta.env.VITE_REQUEST_TIMEOUT) * 1000,
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 给 get 请求加上时间戳参数，避免从缓存中拿数据
    if (config.method?.toUpperCase() === 'GET') {
      config.params = Reflect.set(config.params ?? {}, 't', Date.now())
    }
    // 让每个请求携带自定义 token 请根据实际情况自行修改
    const token = getAccessToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 未设置状态码则默认成功状态
    const code = response.data.code || HttpStatusCode.Ok
    // 获取错误信息
    const message = response.data.message || `系统未知错误，请反馈给管理员`
    // 二进制数据则直接返回
    if (['blob', 'arraybuffer'].includes(response.request.responseType)) {
      return response.data
    }
    // 非二进制且状态码为成功状态码 直接返回具体数据 {code, message, result, timestamp}
    if (code === HttpStatusCode.Ok) {
      return response.data.result
    } else {
      useModal().msgError(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // 参考：https://gitee.com/y_project/RuoYi-Vue/blob/master/ruoyi-ui/src/utils/request.js
    let { message } = error
    if (message == 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = `系统接口 ${message.substr(message.length - 3)} 异常`
    }

    useModal().msgError(message, { duration: 5 * 1000 })

    return Promise.reject(error)
  }
)

export default request
