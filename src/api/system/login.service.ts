import request from '@/utils/request'
import routes from '@/database/static-routes.json'

export class LoginService {
  /** 登录 */
  static login(data: LoginFormDto): Promise<LoginResult> {
    return Promise.resolve({ accessToken: 'adfbiuwafdsbodahsgbfadjsdj' })
    // return request.post('/login', data)
  }

  /** 获取个人数据 */
  static getInfo() {
    // return {code:200,message:'请求成功',result:}
  }

  /** 获取用户动态路由表 */
  static getRoutes() {
    // return { code: 200, message: '请求成功', result: routes, timestamp: Date.now() }
    return routes
  }

  /** 退出 */
  static logout() {
    return Promise.resolve('退出成功')
    // return request.post('/logout')
  }
}
