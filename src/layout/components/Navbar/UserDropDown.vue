<template>
  <el-dropdown>
    <div class="flex-center">
      <el-avatar :src="userStore.avatar" :size="36" alt="avatar" class="user-avatar" />
    </div>

    <template #dropdown>
      <el-dropdown-item @click="emits('updatePassword')">
        <Icon name="el-icon-Lock" />
        <span>修改密码</span>
      </el-dropdown-item>

      <el-dropdown-item @click="handleLogout">
        <Icon name="el-icon-SwitchButton" />
        <span>退出登录</span>
      </el-dropdown-item>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
defineOptions({ name: 'UserDropDown' })

const emits = defineEmits(['updatePassword'])

const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const settingStore = useSettingStore()

/** 处理退出登录的操作 */
async function handleLogout() {
  try {
    await useModal().confirm(`确定注销并退出系统吗？`)
    await userStore.logout()
    window.location.reload()
  } catch (error: any) {
    if (error === 'cancel') return useModal().msg('操作取消')
    console.log('退出登录失败: ', error.message || error)
  }
}
</script>

<style lang="scss" scoped>
/* 取消头像周围的环形阴影效果 */
.el-tooltip__trigger:focus-visible {
  outline: none;
}
</style>
