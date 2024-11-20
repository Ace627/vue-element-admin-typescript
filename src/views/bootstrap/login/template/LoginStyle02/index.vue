<template>
  <div class="login-container flex-center" :class="[appStore.device]">
    <div class="title-container tracking-widest">
      <h3 class="title-container__title">神圣知识宝库智能管理与维护辅助应用系统</h3>
      <div class="title-container__desc">智能管理知识 维护高效便捷</div>
    </div>

    <img src="./1732099400041.png" draggable="false" class="logo-img absolute left-160px top-224px w-420px h-425px" alt="" />

    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="login-form__title">欢迎登录</h3>

      <el-divider class="my-16px!" />

      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="账号">
          <template #prefix> <Icon name="el-icon-UserFilled" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" show-password placeholder="密码">
          <template #prefix> <Icon name="el-icon-Lock" /> </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <div class="flex items-center w-full">
          <el-input v-model="loginForm.captcha" placeholder="请输入验证码">
            <template #prefix> <Icon name="iconfont-Guard" /> </template>
          </el-input>
          <img :src="captchaURL" alt="captcha" @click="getCaptcha" class="cursor-pointer ml-10px" draggable="false" />
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin: 0px 0px 25px 0px">记住密码</el-checkbox>
      <el-form-item>
        <el-button :loading type="primary" class="w-full" size="large" @click.prevent="handleLogin(loginFormRef)">
          <span>{{ loading ? `登录中...` : `登录` }}</span>
        </el-button>
      </el-form-item>
    </el-form>

    <!--  底部  -->
    <div class="login-footer text-center">
      <span>Copyright © 2024-2024 legendary.vip All Rights Reserved.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'LoginStyle01' })
import type { FormInstance } from 'element-plus'

const appStore = useAppStore()
/** 解构登录逻辑及其数据 */
const { loading, loginForm, loginRules, captchaURL, getCaptcha, handleLogin } = useLogin()

/** 获取登录表单实例 */
const loginFormRef = ref<FormInstance>()
</script>

<style lang="scss" scoped>
.title-container {
  position: absolute;
  left: 64px;
  top: 64px;
  &__title {
    font-size: 32px;
    font-weight: 800;
    color: var(--el-text-color-primary);
  }
  &__desc {
    margin-top: 10px;
    font-size: 18px;
    color: var(--el-text-color-placeholder);
  }
}

.login-form {
  position: absolute;
  right: 160px;
  top: 320px;
  width: 480px;
  padding: 32px 42px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 6px 50px 0px #0000001a;
  &__title {
    color: var(--el-text-color-primary);
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 4px;
  }
  .el-input {
    --el-input-height: 56px;
    --el-input-border-radius: 10px;
    font-size: 18px;
  }
  .el-button {
    height: 60px;
    font-size: 20px;
    border-radius: 10px;
    letter-spacing: 6px;
  }
}

.login-container {
  position: relative;
  height: 100%;
  background-image: url('@/assets/images/background/bg-image-02.png');
  background-size: cover;

  .login-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: var(--el-color-white);
    font-size: var(--el-font-size-extra-small);
    letter-spacing: 1px;
  }
}

.login-container.mobile {
  .title-container {
    left: 16px;
    right: 16px;
    line-height: 1.25;
    text-align: center;
  }
  .logo-img {
    display: none;
  }
  .login-form {
    position: static;
    width: calc(100% - 16px);
  }
}
</style>
