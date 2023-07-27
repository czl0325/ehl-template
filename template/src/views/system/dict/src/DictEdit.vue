<template>
  <el-form ref="xForm" :model="newData" :label-width="120" :rules="rules">
    <el-form-item label="字典编码">
      <el-input v-model="newData.dictDataId" placeholder="请输入"/>
    </el-form-item>
    <el-form-item label="字典名称">
      <el-input v-model="newData.dictDataName" placeholder="请输入"/>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { IDictInfo } from "@/models/system"
import _ from "lodash"
import { FormInstance } from "element-plus"
import { operateDict } from "@/http/api/dict"

defineOptions({
  name: "DictEdit"
})
const props = withDefaults(defineProps<{
  parentId: number,
  dictItem: IDictInfo
}>(), {

})
const xForm = ref({} as FormInstance)
const newData = ref<IDictInfo>(_.cloneDeep(props.dictItem))
const rules = reactive({
  dictDataName: [{ required: true, message: '字典名称不能为空', trigger: 'blur' }],
  dictDataId: [{ required: true, message: '字典编码不能为空', trigger: 'blur' }]
})
defineExpose({
  confirm: () => {
    return new Promise((resolve, reject) => {
      xForm.value.validate(valid => {
        if (valid) {
          if (!newData.value.dictId) {
            newData.value.dictId = props.parentId
          }
          resolve(operateDict(newData.value))
        } else {
          reject()
        }
      })
    })
  }
})
</script>

<style lang="scss" scoped>

</style>
