import request from '@/utils/request'

export class UserServie {
  /** 修改密码 */
  static updatePassword(data: UpdatePasswordDto): Promise<string> {
    // return request.post('/user/update/password', data)
    return Promise.resolve('操作成功')
  }
}
