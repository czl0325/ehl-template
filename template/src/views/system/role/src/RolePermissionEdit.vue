<template>
  <el-tree ref="xTree" :data="role.all" :props="{label: 'title'}" :default-checked-keys="role.have" :check-strictly="true" show-checkbox highlight-current node-key="id" />
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { ElTree } from "element-plus"
import { IRoleInfo } from '@/models/system'
import { getRoleById, updateRolePermission } from '@/http/api/system'

export default defineComponent({
  name: 'RolePermissionEdit',
  props: {
    role: {
      type: Object as PropType<IRoleInfo>,
      required: true
    }
  },
  setup (props) {
    const xTree = ref<InstanceType<typeof ElTree>>()
    getRoleById(props.role.rid).then(res => {
      props.role.all = res.all
      props.role.have = res.have
    })
    const confirm = () => {
      const checks = xTree.value?.getCheckedKeys() || []
      const reduceNewArr = props.role.have?.filter(item => {
        return checks.indexOf(item) < 0
      })
      const addNewArr = checks.filter(item => ((props.role.have?.indexOf(Number(item)) || -1) < 0)).map(item => Number(item))
      return updateRolePermission(checks as number[], props.role.rid as number, addNewArr, reduceNewArr)
    }
    return {
      xTree,
      confirm
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
