<template>
  <div class="app-content flex flex-col h-full">
    <div class="my-16px">
      <!-- <el-button type="primary" plain icon="Plus" @click="handleCreate()" v-permissions="['system:menu:create']">新增</el-button> -->
      <el-button plain icon="Sort" type="info" @click="toggleExpandAll"> 展开/折叠 </el-button>
    </div>

    <el-table :data="list" row-key="id" :default-expand-all="isExpandAll" v-if="refreshTable" border class="custom-table">
      <el-table-column label="菜单名称" prop="title" min-width="150px"></el-table-column>
      <el-table-column label="菜单类型" min-width="100px">
        <template #default="{ row }">
          <el-tag v-if="row.type === 'M'" type="primary">目录</el-tag>
          <el-tag v-if="row.type === 'C'" type="warning">菜单</el-tag>
          <el-tag v-if="row.type === 'F'" type="success">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="菜单图标" min-width="100px">
        <template #default="{ row }">
          <IconFont :name="row.icon" />
        </template>
      </el-table-column>
      <el-table-column label="路由地址" prop="path" min-width="180px"></el-table-column>
      <el-table-column label="页面地址" prop="component" min-width="200px"></el-table-column>
      <el-table-column label="是否隐藏" min-width="100px">
        <template #default="{ row }">
          <el-tag v-if="row.visible === 0" type="danger">隐藏</el-tag>
          <el-tag v-if="row.visible === 1">显示</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="130px">
        <template #default="{ row }">
          <el-link type="primary">新增</el-link>
          <el-link type="primary">编辑</el-link>
          <el-link type="primary">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Menu' })
import menus from '@/database/static-routes.json'
import { transformListToTree } from '@/utils/tree-helper'

/** 是否展开，默认全部折叠 */
const isExpandAll = ref(false)
/** 重新渲染表格状态 */
const refreshTable = ref(true)

const list = ref<any[]>([])
const getList = async () => {
  list.value = transformListToTree(menus)
}

const toggleExpandAll = () => {
  refreshTable.value = false
  isExpandAll.value = !isExpandAll.value
  nextTick(() => (refreshTable.value = true))
}

getList()
</script>

<style lang="scss" scoped></style>
