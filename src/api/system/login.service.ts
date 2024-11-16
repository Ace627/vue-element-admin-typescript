import routes from '@/database/static-routes.json'

export class LoginService {
  /** 获取个人数据 */
  static getInfo() {
    // return {code:200,message:'请求成功',result:}
  }

  /** 获取用户动态路由表 */
  static getRoutes() {
    // return { code: 200, message: '请求成功', result: routes, timestamp: Date.now() }
    return routes
  }
}
