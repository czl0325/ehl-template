<template>
  <div class="app-container">
    <section class="panel mt-2">
      <el-form>
        <el-row :gutter="8">
          <el-col :span="12">
            <el-form-item label="用户名称">
              <el-input v-model="searchValue.keyword" placeholder="请输入用户名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12" style="text-align: right">
            <el-button type="primary" @click="onGetUserList(true)">查询</el-button>
            <el-button type="primary" @click="currentUser={};showUserEdit=true;">新增</el-button>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <section class="panel my-2 panel-content">
      <div class="panel-table">
        <vxe-table ref="xTable1" :data="tableData" height="100%" :seq-config="{startIndex: ((pagination.currentPage-1)*pagination.pageSize) }" :loading="pagination.loading" show-overflow>
          <vxe-column type="seq" width="80" title="序号" align="center" />
          <vxe-column field="nickname" title="用户昵称" align="center" />
          <vxe-column field="status" title="状态" align="center">
            <template #default="{row}">
              <span v-if="row.status===1">正常</span>
              <span v-else-if="row.status===0">禁用</span>
              <span v-else>被删除</span>
            </template>
          </vxe-column>
          <vxe-column field="username" title="账户" align="center"/>
          <vxe-column title="操作" width="240" align="center" fixed="right">
            <template #default="{row}">
              <el-button type="primary" size="small" @click="currentUser=row;showUserPermission=true;">修改角色</el-button>
              <el-button type="primary" size="small" @click="currentUser=row;showUserEdit=true;">编辑</el-button>
              <el-button type="danger" size="small" @click="onDeleteUser(row)">删除</el-button>
            </template>
          </vxe-column>
        </vxe-table>
      </div>
      <vxe-pager v-model:current-page="pagination.currentPage" v-model:page-size="pagination.pageSize" :total="pagination.total" @page-change="onGetUserList(false)" />
    </section>
    <e-dialog v-model="showUserPermission" width="40%" :title="currentUser.nickname" @ok="onConfirmPermission" >
      <user-permission-edit ref="xUserPermission" :user="currentUser" />
    </e-dialog>
    <e-dialog v-model="showUserEdit" width="40%" :title="currentUser.uid?currentUser.nickname:'新增用户'" @ok="onConfirmUser">
      <user-edit ref="xUserEdit" :user="currentUser" />
    </e-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from "element-plus"
import { VxeTableInstance } from "vxe-table"
import { cloneDeep } from "lodash"
import { EDialog, DialogElement } from 'ehl-ui'
import UserEdit from "@/views/system/user/src/UserEdit.vue"
import UserPermissionEdit from "@/views/system/user/src/UserPermissionEdit.vue"
import { defaultPagination } from "@/http/http"
import { getUserList, operateUser } from "@/http/api/system"
import { UserInfo } from "@/models/user"

export default defineComponent({
  name: 'SystemUser',
  components: {
    EDialog,
    UserEdit,
    UserPermissionEdit
  },
  setup () {
    const searchValue = reactive({
      keywords: ""
    })
    const xTable1 = ref({} as VxeTableInstance)
    const tableData = ref<UserInfo[]>([])
    const pagination = reactive(cloneDeep(defaultPagination))
    const onGetUserList = (refresh: boolean) => {
      if (refresh) pagination.currentPage = 1
      getUserList(searchValue, pagination).then(res => {
        tableData.value = res.list
      })
    }
    onGetUserList(true)
    const currentUser = ref<UserInfo>({})
    const showUserPermission = ref(false)
    const showUserEdit = ref(false)
    const xUserPermission = ref({} as DialogElement)
    const xUserEdit = ref({} as DialogElement)
    const onConfirmPermission = () => {
      xUserPermission.value.confirm().then(() => {
        onGetUserList(false)
        showUserPermission.value = false
        ElMessage.success("更新成功")
      })
    }
    const onConfirmUser = () => {
      xUserEdit.value.confirm().then(() => {
        onGetUserList(false)
        showUserEdit.value = false
        ElMessage.success("操作成功")
      })
    }
    const onDeleteUser = (user: UserInfo) => {
      ElMessageBox.confirm("确定要删除该角色？", "警告", {
        callback: (result: string) => {
          if (result === 'confirm') {
            operateUser(user, "delete").then(() => {
              ElMessage.success("删除成功")
              currentUser.value = {}
              onGetUserList(false)
            })
          }
        }
      })
    }
    return {
      xTable1,
      searchValue,
      tableData,
      pagination,
      onGetUserList,
      currentUser,
      showUserPermission,
      showUserEdit,
      xUserPermission,
      xUserEdit,
      onConfirmPermission,
      onConfirmUser,
      onDeleteUser
    }
  }
})
</script>

<style lang="scss" scoped>
:deep(.el-form-item) {
  margin-bottom: 0;
}
</style>
