<template>
  <el-form ref="xForm" :model="newRole" :label-width="80" :rules="rules">
    <el-form-item v-if="newRole.rid>0" label="角色ID">
      <el-input v-model="newRole.rid" disabled />
    </el-form-item>
    <el-form-item label="角色名称" required prop="roleName">
      <el-input v-model="newRole.roleName" clearable/>
    </el-form-item>
    <el-form-item label="角色描述" required prop="description">
      <el-input v-model="newRole.description" clearable/>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { FormInstance } from "element-plus"
import { cloneDeep } from "lodash"
import { IRoleInfo } from '@/models/system'
import { roleOverloadOptions, roleIllegalOptions } from "@/models/common"
import { operateRoleByModule } from "@/http/api/system"

export default defineComponent({
  name: 'RoleEdit',
  props: {
    role: {
      type: Object as PropType<IRoleInfo>,
      required: true
    }
  },
  setup(props) {
    const xForm = ref<FormInstance>()
    const rules = {
      roleName: [
        {
          required: true,
          message: '角色名称不能为空',
          trigger: 'blur'
        },
        {
          validator: function (rule: any, value: any, callback: any) {
            const regex = /[R][O][L][E][_][A-Z]{4,}/
            if (!regex.test(value)) {
              callback(new Error('角色名称必须是全大写英文,并且要以“ROLE_”开头,下划线后面至少4个大写字符'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }
      ],
      description: [{
        required: true,
        message: '角色描述不能为空',
        trigger: 'blur'
      }]
    }
    const newRole = ref<IRoleInfo>(cloneDeep(props.role))
    const confirm = () => {
      return new Promise((resolve, reject) => {
        xForm.value?.validate((valid) => {
          if (valid) {
            if (newRole.value.rid) {
              resolve(operateRoleByModule(newRole.value, "put"))
            } else {
              resolve(operateRoleByModule(newRole.value))
            }
          } else {
            reject(new Error())
          }
        })
      })
    }
    return {
      xForm,
      rules,
      newRole,
      roleOverloadOptions,
      roleIllegalOptions,
      confirm
    }
  }
})
</script>

<style lang="scss" scoped>
:deep(.el-form-item) {
  margin-bottom: 18px !important;
}
</style>
