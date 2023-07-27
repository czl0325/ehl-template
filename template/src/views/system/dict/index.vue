<template>
  <div class="row-container">
    <div class="left-container">
      <el-tree ref="xTree" :data="treeData" :props="{label: 'name'}" default-expand-all @node-click="onClickNode" highlight-current node-key="id">
        <template #default="{ node, data }">
          <div class="d-flex flex-row align-items-center justify-content-between w-100" @mouseenter="data.show=true" @mouseleave="data.show=false">
            <span class="flex-horizontal-1 single-text">{{ node.label }}</span>
            <span class="flex-shrink-0" style="line-height: 1">
              <el-icon v-if="node.level===1" color="#ff3434" @click.stop="currentParent={};showDictParentEdit=true" :size="16"><CirclePlus /></el-icon>
              <el-icon v-if="node.level!==1" color="#228b22" @click.stop="currentParent=data;showDictParentEdit=true" :size="16"><Edit/></el-icon>
              <el-icon v-if="node.level!==1" color="#ff3434" class="ms-2" @click.stop="onDeleteDictParent(data)" :size="16"><Delete /></el-icon>
            </span>
          </div>
        </template>
      </el-tree>
    </div>
    <div class="right-container panel-content">
      <div class="text-align-right">
        <el-button type="primary" @click="currentDict={};showDictEdit=true">新增</el-button>
        <el-button type="danger" @click="onBatchDeleteDict">批量删除</el-button>
      </div>
      <div class="panel-table mt-3">
        <vxe-table ref="xTableRef" :data="dictList" height="100%" :seq-config="{startIndex: ((pagination.pageNumber-1)*pagination.pageCount) }" :loading="pagination.loading">
          <vxe-column type="checkbox" width="40" />
          <vxe-column type="seq" title="序号" width="60" align="center" />
          <vxe-column field="dictDataId" title="字典编码" align="center"/>
          <vxe-column field="dictDataName" title="字典名称" align="center"/>
          <vxe-column title="操作" width="180" align="center">
            <template #default="{row}">
              <el-button text type="primary" @click="currentDict=row;showDictEdit=true">编辑</el-button>
              <el-button text type="danger" @click="onDeleteDict(row)">删除</el-button>
            </template>
          </vxe-column>
        </vxe-table>
      </div>
      <vxe-pager v-model:current-page="pagination.pageNumber" v-model:page-size="pagination.pageCount" :total="pagination.total" @page-change=""/>
    </div>
    <e-dialog :title="`${currentParent.id ? '编辑' : '新增'}字典类别`" v-model="showDictParentEdit" @ok="onEditDictParent">
      <dict-parent-edit ref="xDictParentEdit" :dict="currentParent"/>
    </e-dialog>
    <e-dialog :title="`${currentDict.dictId ? '编辑' : '新增'}字典`" v-model="showDictEdit" @ok="onEditDict">
      <dict-edit ref="xDictEdit" :dict-item="currentDict" :parent-id="currentParent.id!" />
    </e-dialog>
  </div>
</template>

<script lang="ts" setup>
import _ from "lodash"
import { ElMessageBox, ElMessage, ElTree } from "element-plus"
import { CirclePlus, Edit, Delete } from "@element-plus/icons-vue"
import { batchDeleteDict, deleteDict, deleteDictTree, getDictPage, getDictTree } from "@/http/api/dict"
import { IDictTreeInfo, IDictInfo } from "@/models/system"
import { defaultPagination } from "@/http/http"
import DictEdit from "@/views/system/dict/src/DictEdit.vue"
import DictParentEdit from "@/views/system/dict/src/DictParentEdit.vue"
import { DialogElement } from "ehl-ui"
import { VxeTableInstance } from "vxe-table"

defineOptions({
  name: "SystemDict"
})
const xTree = ref<InstanceType<typeof ElTree>>()
const xTableRef = ref<VxeTableInstance<IDictInfo>>()
const treeData = ref<IDictTreeInfo[]>([])
const dictList = ref<IDictInfo[]>([])
const pagination = reactive(_.cloneDeep(defaultPagination))
const currentParent = ref<IDictTreeInfo>({})
const currentDict = ref<IDictInfo>({})
const showDictParentEdit = ref(false)
const showDictEdit = ref(false)
const xDictParentEdit = ref({} as DialogElement)
const xDictEdit = ref({} as DialogElement)
const onClickNode = (node: IDictTreeInfo) => {
  if (node.id && !node.children) {
    currentParent.value = node
    onGetDictPage(true)
  }
}
const onGetDictTree = () => {
  getDictTree().then(res => {
    treeData.value = [{
      id: 0,
      name: "全部",
      children: res
    }]
    if (res.length > 0) {
      currentParent.value = res[0]
      onClickNode(currentParent.value)
      nextTick(() => {
        xTree.value?.setCurrentKey(res[0].id)
      })
    }
  })
}
const onGetDictPage = (refresh: boolean) => {
  if (refresh) {
    pagination.pageNumber = 1
  }
  getDictPage(currentParent.value.id!, pagination).then(res => {
    dictList.value = res.list
  })
}
const onEditDictParent = () => {
  xDictParentEdit.value.confirm().then(() => {
    onGetDictTree()
    showDictParentEdit.value = false
    ElMessage.success("保存成功")
  })
}
const onEditDict = () => {
  xDictEdit.value.confirm().then(() => {
    onGetDictPage(!currentDict.value.id)
    showDictEdit.value = false
    ElMessage.success("保存成功")
  })
}
const onDeleteDictParent = (data: IDictTreeInfo) => {
  ElMessageBox.confirm("确认删除该字典类别吗？", "提示").then(() => {
    if (data.id) {
      deleteDictTree(data.id).then(res => {
        ElMessage.success("删除成功")
        onGetDictTree()
        if (currentParent.value.id === data.id) {
          dictList.value = []
        }
      })
    }
  })
}
const onBatchDeleteDict = () => {
  const arr: IDictInfo[] = xTableRef.value?.getCheckboxRecords() || []
  if (arr.length <= 0) {
    ElMessage.error("请选择要删除的字典")
    return
  }
  ElMessageBox.confirm("确认删除选中字典？", "提示").then(() => {
    batchDeleteDict(arr.map(item => item.id)).then(res => {
      ElMessage.success("删除成功")
      onGetDictPage(false)
    })
  })
}
const onDeleteDict = (row: IDictInfo) => {
  ElMessageBox.confirm("确认删除该字典吗？", "提示").then(() => {
    if (row.id) {
      deleteDict(row.id).then(res => {
        ElMessage.success("删除成功")
        onGetDictPage(false)
      })
    }
  })
}
onGetDictTree()
</script>

<style lang="scss" scoped>

</style>
