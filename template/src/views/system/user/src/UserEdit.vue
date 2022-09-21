<template>
  <el-form ref="xForm" :model="newUser" :rules="rules" :label-width="80">
    <el-form-item label="用户ID" v-if="newUser.uid">
      <el-input v-model="newUser.uid" disabled />
    </el-form-item>
    <el-form-item label="昵称" prop="nickname" required>
      <el-input v-model="newUser.nickname" clearable />
    </el-form-item>
    <el-form-item label="账号" prop="username" required>
      <el-input v-model="newUser.username" clearable />
    </el-form-item>
    <el-form-item label="密码" prop="password" required>
      <el-input v-model="newUser.password" type="password" clearable />
    </el-form-item>
    <el-form-item label="部门" prop="deptId">
      <el-cascader v-model="newUser.deptId" :show-all-levels="false" :options="deptList" :props="{label: 'title', value: 'id', emitPath: false, checkStrictly: true}" class="w-100"/>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-select v-model="newUser.status" placeholder="请选择">
        <el-option v-for="item in userStatus" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="newUser.email" clearable />
    </el-form-item>
    <el-form-item label="生日" prop="gender">
      <el-date-picker v-model="newUser.birthday" type="date" placeholder="选择日期" class="w-100"/>
    </el-form-item>
    <el-form-item label="性别" prop="birthday">
      <el-select v-model="newUser.gender" placeholder="请选择">
        <el-option v-for="item in userGender" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { cloneDeep } from "lodash"
import { UserInfo } from "@/models/user"
import { userStatus, userGender } from "@/models/common"
import { getDepartmentTree, operateUser } from "@/http/api/system"
import { DepartmentInfo } from "@/models/system"
import { FormInstance } from "element-plus/es"

export default defineComponent({
  name: 'UserEdit',
  props: {
    user: {
      type: Object as PropType<UserInfo>,
      required: true
    }
  },
  setup(props) {
    const xForm = ref<FormInstance>()
    const rules = {
      username: [
        {
          required: true,
          message: '登录账号不能为空',
          trigger: 'blur'
        },
        {
          validator: function (rule: any, value: any, callback: any) {
            const regex = /^[a-zA-Z0-9_-]{6,16}$/
            if (!regex.test(value)) {
              callback(new Error('账号以字母开头，长度在6~16之间，只能包含字符、数字和下划线'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }
      ],
      deptId: [
        {
          required: true,
          message: '部门不能为空',
          trigger: 'blur'
        }
      ],
      status: [
        {
          required: true,
          message: '状态不能为空',
          trigger: 'blur'
        }
      ],
      nickname: [
        {
          required: true,
          message: '昵称不能为空',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '密码不能为空',
          trigger: 'blur'
        },
        {
          validator: function (rule: any, value: any, callback: any) {
            const regex = /^[a-zA-Z]\w{5,17}$/
            if (!regex.test(value)) {
              callback(new Error('密码以字母开头，长度在6~18之间，只能包含字符、数字和下划线'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }
      ]
    }
    const deptList = ref<DepartmentInfo[]>([])
    const newUser = ref<UserInfo>(cloneDeep(props.user))
    getDepartmentTree().then(res => {
      deptList.value = res
    })
    const confirm = () => {
      return new Promise((resolve, reject) => {
        xForm.value?.validate((valid) => {
          if (valid) {
            if (newUser.value.uid) {
              resolve(operateUser(newUser.value, "put"))
            } else {
              resolve(operateUser(newUser.value))
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
      deptList,
      newUser,
      userStatus,
      userGender,
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
