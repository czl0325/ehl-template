<template>
  <div class="app-container">
    <section class="panel mt-2">
      <el-form>
        <el-row :gutter="8">
          <el-col :span="12">
            <el-form-item label="角色名称">
              <el-input v-model="searchValue.keyword" placeholder="请输入角色名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12" style="text-align: right">
            <el-button type="primary" @click="onGetRoleList(true)">查询</el-button>
            <el-button type="primary" @click="currentRole={};showRoleEdit=true;">新增</el-button>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <section class="panel my-2 panel-content">
      <div class="panel-table">
        <vxe-table :data="tableData" height="100%" :seq-config="{startIndex: ((pagination.pageNumber-1)*pagination.pageCount) }" :loading="pagination.loading">
          <vxe-column field="rid" width="100" title="角色ID" align="center" />
          <vxe-column field="roleName" title="角色名称" align="center" />
          <vxe-column field="description" title="角色描述" align="center" />
          <vxe-column title="操作" width="240" align="center" fixed="right">
            <template #default="{row}">
              <el-button type="primary" size="small" @click="currentRole=row;showRolePermission=true;">修改权限</el-button>
              <el-button type="primary" size="small" @click="currentRole=row;showRoleEdit=true;">编辑</el-button>
              <el-button type="danger" size="small" @click="onDeleteRole(row)">删除</el-button>
            </template>
          </vxe-column>
        </vxe-table>
      </div>
      <vxe-pager v-model:current-page="pagination.pageNumber" v-model:page-size="pagination.pageCount" :total="pagination.total" @page-change="onGetRoleList(false)" />
    </section>
    <e-dialog v-model="showRolePermission" width="40%" :title="currentRole.description" @ok="onConfirmPermission" >
      <role-permission-edit ref="xRolePermission" :role="currentRole" />
    </e-dialog>
    <e-dialog v-model="showRoleEdit" width="40%" :title="currentRole.rid?currentRole.description:'新增角色'" @ok="onConfirmRole">
      <role-edit ref="xRoleEdit" :role="currentRole" />
    </e-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { EDialog, DialogElement } from 'ehl-ui'
import { cloneDeep } from "lodash"
import RoleEdit from '@/views/system/role/src/RoleEdit.vue'
import RolePermissionEdit from '@/views/system/role/src/RolePermissionEdit.vue'
import { defaultPagination } from '@/http/http'
import { getRoleList, operateRoleByModule } from '@/http/api/system'
import { IRoleInfo } from '@/models/system'

export default defineComponent({
  name: 'SystemRole',
  components: {
    EDialog,
    RoleEdit,
    RolePermissionEdit
  },
  setup () {
    const searchValue = reactive({
      keyword: ""
    })
    const tableData = ref<IRoleInfo[]>([])
    const pagination = reactive(cloneDeep(defaultPagination))
    const onGetRoleList = (refresh: boolean) => {
      if (refresh) pagination.pageNumber = 1
      getRoleList(searchValue, pagination).then(res => {
        tableData.value = res.list
      })
    }
    onGetRoleList(true)
    const showRolePermission = ref(false)
    const showRoleEdit = ref(false)
    const currentRole = ref<IRoleInfo>({})
    const xRolePermission = ref({} as DialogElement)
    const xRoleEdit = ref({} as DialogElement)
    const onConfirmPermission = () => {
      xRolePermission.value.confirm().then(res => {
        ElMessage.success("更新权限成功")
        showRolePermission.value = false
        currentRole.value = {}
        onGetRoleList(false)
      })
    }
    const onConfirmRole = () => {
      xRoleEdit.value.confirm().then(res => {
        ElMessage.success("成功")
        showRoleEdit.value = false
        currentRole.value = {}
        onGetRoleList(false)
      })
    }
    const onDeleteRole = (role: IRoleInfo) => {
      ElMessageBox.confirm("确定要删除该角色？", "警告", {
        callback: (result: string) => {
          if (result === 'confirm') {
            operateRoleByModule(role, "delete").then(() => {
              ElMessage.success("删除成功")
              currentRole.value = {}
              onGetRoleList(false)
            })
          }
        }
      })
    }
    return {
      searchValue,
      tableData,
      pagination,
      onGetRoleList,
      showRolePermission,
      showRoleEdit,
      currentRole,
      xRolePermission,
      xRoleEdit,
      onConfirmPermission,
      onConfirmRole,
      onDeleteRole
    }
  }
})
</script>

<style lang="scss" scoped>
:deep(.el-form-item) {
  margin-bottom: 0;
}
</style>
