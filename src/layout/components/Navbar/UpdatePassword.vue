<template>
  <el-dialog v-model="visible" title="修改密码" width="500px" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model :rules label-width="80px" ref="formRef">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input type="password" v-model.trim="model.oldPassword" show-password placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model.trim="model.newPassword" show-password placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model.trim="model.confirmPassword" show-password placeholder="请再次输入新密码"></el-input>
      </el-form-item>
    </el-form>

    <div class="dialog-footer mt-32px flex-center">
      <el-button type="info" @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
defineOptions({ name: 'UpdatePassword' })
import { UserServie } from '@/api/system/user.service'
import type { FormInstance, FormRules } from 'element-plus'

const userStore = useUserStore()

/** 对话框是否可见 */
const visible = ref<boolean>(false)
/** 表单实例 */
const formRef = ref<FormInstance>()
/** 表单的数据 */
const model = ref({} as UpdatePasswordDto)
/** 表单的验证规则配置 */
const rules: FormRules<UpdatePasswordDto> = {
  oldPassword: [{ required: true, message: '旧密码不能为空', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '新密码不能为空', trigger: 'blur' },
    { validator: validateNewPassword, trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '确认密码不能为空', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' },
  ],
}

/** 自定义新密码的校验逻辑 补充 */
function validateNewPassword(rule: any, value: any, callback: any) {
  value !== model.value.oldPassword ? callback() : callback('新密码不能与旧密码相同')
}

/** 自定义确认密码的校验逻辑 补充 */
function validateConfirmPassword(rule: any, value: any, callback: any) {
  value === model.value.newPassword ? callback() : callback('确认密码与新密码输入不一致')
}

function handleOpen() {
  visible.value = true
}
function handleClose() {
  formRef.value?.resetFields()
  model.value = {} as UpdatePasswordDto
  visible.value = false
}

/** 提交表单数据 */
async function handleSubmit() {
  try {
    await formRef.value?.validate()
    // Todo
    // 调用真正接口 注销登录
    await UserServie.updatePassword(model.value)
    useModal().msgSuccess(`密码修改成功，请重新登录`)
    await userStore.logout()
    window.location.reload()
    handleClose()
  } catch (error) {}
}

defineExpose({ handleOpen })
</script>

<style lang="scss" scoped></style>
