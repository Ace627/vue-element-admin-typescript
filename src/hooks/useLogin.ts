import router from '@/router'
import type { FormInstance, FormRules } from 'element-plus'
import defaultCaptcha from '@/assets/images/default/default-captcha.png'

export default () => {
  const userStore = useUserStore()
  const route = router.currentRoute.value
  /** 计算需要跳转的路径 */
  const redirect = (route.query['redirect'] as string) ?? '/'
  /** 验证码图片地址 */
  const captchaURL = ref<string>(defaultCaptcha)
  /** 登录加载状态 */
  const loading = ref<boolean>(false)
  /** 登录表单数据 */
  const loginForm = ref({ username: 'admin', password: '123456', captcha: '18' } as LoginFormDto)
  /** 登录表单校验规则 */
  const loginRules: FormRules<LoginFormDto> = {
    username: [{ required: true, message: '账号不可为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不可为空', trigger: 'blur' }],
    captcha: [{ required: true, message: '验证码不可为空', trigger: 'blur' }],
  }

  /** 登录 */
  async function handleLogin(formInstance: FormInstance | undefined) {
    try {
      if (!formInstance) return
      await formInstance.validate()
      await userStore.login(loginForm.value)
      await router.replace(redirect)
    } catch (error: any) {
      console.log(`登录失败`, error.message || error)
    }
  }

  /** 获取登录验证码 */
  async function getCaptcha() {}

  return { loading, loginForm, loginRules, captchaURL, getCaptcha, handleLogin }
}
