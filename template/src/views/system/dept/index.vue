<template>
  <div class="app-container flex-row p-2">
    <section class="panel h-100 pt-0" style="width: 250px">
      <e-panel-title title="部门管理" class="mb-2" no-padding/>
      <el-tree :data="treeData" :props="{label: 'title'}" accordion draggable highlight-current @node-click="handleNodeClick" class="container_left_body" />
    </section>
    <section class="panel flex-grow-1 ms-2 h-100" style="width: 0">
      <div class="actions mb-2">
        <div class="action-item" @click="currentRow={source:{id:0}};isEdit=true"><img src="../../../assets/images/system/ic_caidan_xinzeng.png" width="20" height="20">新增
        </div>
        <div class="action-item" @click="isEdit=true"><img src="../../../assets/images/system/ic_caidan_xiugai.png" width="20" height="20">修改
        </div>
        <div class="action-item" @click="deleteDepartment"><img src="../../../assets/images/system/ic_caidan_shanchu.png" width="20" height="20">删除
        </div>
      </div>
      <el-form ref="xForm" :label-width="80" :rules="rules" :model="currentRow.source" style="width: 60%;">
        <el-form-item label="部门ID" prop="id">
          <el-input v-model="currentRow.source.id" placeholder="请选择" disabled/>
        </el-form-item>
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="currentRow.source.name" placeholder="请输入" :disabled="!isEdit"/>
        </el-form-item>
        <el-form-item label="上级部门" :prop="['source', 'parentId']">
          <el-cascader v-model="currentRow.source.parentId" placeholder="请选择" style="width: 100%" :disabled="!isEdit" :show-all-levels="false" :options="treeData" :props="{ label: 'title', value: 'id', emitPath: false, checkStrictly: true }">
            <template v-slot="{ node, data }">
              <span>{{ data.title }}</span>
              <span v-if="!node.isLeaf">({{ data.children.length }})</span>
            </template>
          </el-cascader>
        </el-form-item>
        <el-form-item label="部门排序" prop="level" style="width: 100%">
          <el-input-number :disabled="!isEdit" :min="1" :max="10000" v-model="currentRow.source.level" label="部门排序" style="width: 100%"/>
        </el-form-item>
        <el-form-item label="部门位置" prop="address">
          <el-select :disabled="!isEdit" v-model="currentRow.source.address" placeholder="请选择区域">
            <el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="部门描述" prop="description">
          <el-input :disabled="!isEdit" :autosize="{ minRows: 3, maxRows: 10 }" v-model="currentRow.source.description" type="textarea" clearable/>
        </el-form-item>
        <el-form-item v-if="isEdit">
          <el-button type="primary" @click="saveAndFlush">保存</el-button>
          <el-button @click="isEdit=!isEdit">取消</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { EPanelTitle } from "ehl-ui"
import { DepartmentInfo } from '@/models/system'
import { getRedisKeyValueAll, LabelInfo } from '@/http/api/dict'
import { getDepartmentTree, operateDepartment } from '@/http/api/system'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'

export default defineComponent({
  name: 'SystemDept',
  components: {
    EPanelTitle
  },
  setup () {
    const treeData = ref<DepartmentInfo[]>([])
    const reloadTree = () => {
      getDepartmentTree().then(res => {
        treeData.value = res
      })
    }
    const areas = ref<LabelInfo[]>([])
    getRedisKeyValueAll("区域").then(res => {
      areas.value = res
    })
    const xForm = ref({} as FormInstance)
    const rules = reactive({
      name: [{ required: true, message: '名称必填', trigger: 'change' }],
      parentId: [{ required: true, message: '上级部门必选', trigger: 'change' }],
      address: [{ required: true, message: '部门位置必选', trigger: 'change' }]
    })
    const isEdit = ref(false)
    const currentRow = ref<DepartmentInfo>({
      source: {}
    })
    const handleNodeClick = (node: DepartmentInfo) => {
      if (currentRow.value.id !== node.id) {
        isEdit.value = false
      }
      currentRow.value = node
    }
    const saveAndFlush = () => {
      xForm.value.validate((valid) => {
        if (valid) {
          if (currentRow.value.source?.id) {
            operateDepartment(currentRow.value.source, "put").then(res => {
              ElMessage.success("修改成功")
              isEdit.value = false
              reloadTree()
            })
          } else {
            operateDepartment(currentRow.value.source!, "post").then(() => {
              ElMessage.success("新增成功")
              isEdit.value = false
              reloadTree()
            })
          }
        }
      })
    }
    const deleteDepartment = () => {
      if (currentRow.value.source?.id) {
        ElMessageBox.confirm(`确定要删除【${currentRow.value.source.name}】吗? 请确认这个部门下面没有子部门.并且没有角色在使用这个部门.否则无法删除 是否继续?`, "警告", {
          callback: (result: string) => {
            if (result === 'confirm') {
              operateDepartment(currentRow.value.source!, "delete").then(() => {
                ElMessage.success("删除成功")
                isEdit.value = false
                reloadTree()
              })
            }
          }
        })
      } else {
        ElMessage.error("请先选择菜单后再删除")
      }
    }
    reloadTree()
    return {
      xForm,
      treeData,
      rules,
      isEdit,
      currentRow,
      areas,
      handleNodeClick,
      saveAndFlush,
      deleteDepartment
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
