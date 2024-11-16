interface LoginFormDto {
  /** 登录账号 */
  username: string
  /** 登录密码 */
  password: string
  /** 验证码的校验结果 */
  captcha: string
  /** 记住密码 */
  rememberMe: boolean
}
