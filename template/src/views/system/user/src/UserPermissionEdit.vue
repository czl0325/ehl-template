<template>
  <el-checkbox-group v-model="roleIds">
    <el-checkbox v-for="role in roles" :key="role.rid" :label="role.rid">{{ role.description }}</el-checkbox>
  </el-checkbox-group>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { UserInfo } from "@/models/user"
import { getUserRoleAll, updateUserRole } from "@/http/api/system"
import { IRoleInfo } from "@/models/system"
import { ElMessage } from "element-plus"

export default defineComponent({
  name: 'UserPermissionEdit',
  props: {
    user: {
      type: Object as PropType<UserInfo>,
      required: true
    }
  },
  setup (props) {
    const roles = ref<IRoleInfo[]>([])
    const roleIds = ref<number[]>([])
    getUserRoleAll().then(res => {
      roles.value = res
      roles.value.forEach(item => {
        if (item.rid && props.user.roles) {
          let isIn = false
          props.user.roles.forEach(r => {
            if (r.rid === item.rid) {
              isIn = true
              return true
            }
          })
          if (isIn) {
            roleIds.value.push(item.rid)
          }
        }
      })
      console.log(roleIds.value)
    })
    const confirm = () => {
      if (roleIds.value.length <= 0) {
        ElMessage.error("至少选择一个角色")
        return Promise.reject(new Error("至少选择一个角色"))
      }
      return updateUserRole(props.user, roleIds.value)
    }
    return {
      roles,
      roleIds,
      confirm
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
