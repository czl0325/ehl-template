<template>
  <el-form ref="xForm" :model="newData" :rules="rules" :label-width="80">
    <el-form-item label="字典编码" prop="id">
      <el-input v-model="newData.id" placeholder="请输入字典编码" disabled/>
    </el-form-item>
    <el-form-item label="字典名称" prop="name">
      <el-input v-model="newData.name" placeholder="请输入字典名称" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import _ from "lodash"
import { IDictTreeInfo } from "@/models/system"
import { FormInstance } from "element-plus"
import { operateDictTree } from "@/http/api/dict"

defineOptions({
  name: "DictParentEdit"
})
const props = defineProps<{
  dict: IDictTreeInfo
}>()
const xForm = ref({} as FormInstance)
const newData = ref<IDictTreeInfo>(_.cloneDeep(props.dict))
const rules = reactive({
  name: [{ required: true, message: '字典名称不能为空', trigger: 'blur' }]
})
defineExpose({
  confirm: () => {
    return new Promise((resolve, reject) => {
      xForm.value.validate(valid => {
        if (valid) {
          resolve(operateDictTree(newData.value))
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
