<template>
  <div class="app-container flex-row p-2">
    <section class="panel h-100 pt-0" style="width: 250px">
      <e-panel-title title="菜单管理" class="mb-2" no-padding/>
      <el-tree :data="treeData" :props="{label: 'title'}" accordion draggable highlight-current @node-click="handleNodeClick" class="container_left_body" />
    </section>
    <section class="panel flex-grow-1 ms-2 h-100 overflow-auto" style="width: 0">
      <div class="actions mb-2">
        <div class="action-item" @click="currentRow={source:{}};isEdit=true"><img src="../../../assets/images/system/ic_caidan_xinzeng.png" width="20" height="20" alt="">新增
        </div>
        <div class="action-item" @click="isEdit=true"><img src="../../../assets/images/system/ic_caidan_xiugai.png" width="20" height="20" alt="">修改
        </div>
        <div class="action-item" @click="deleteMenu"><img src="../../../assets/images/system/ic_caidan_shanchu.png" width="20" height="20" alt="">删除
        </div>
      </div>
      <el-form :label-width="80" :rules="rules" :model="currentRow.source" style="width: 60%;">
        <el-form-item label="类型" prop="type">
          <el-select v-model="currentRow.source.type" placeholder="请选择" :disabled="!isEdit">
            <el-option v-for="type in menuTypes" :key="type.type" :label="type.name" :value="type.type"/>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="currentRow.source.title" placeholder="请输入" :disabled="!isEdit"/>
        </el-form-item>
        <el-form-item label="标识" prop="resources">
          <el-input v-model="currentRow.source.resources" placeholder="强调，必须是唯一的英文字母" :disabled="!isEdit"/>
        </el-form-item>
        <el-form-item label="上级菜单" prop="parentId">
          <el-cascader v-model="currentRow.source.parentId" placeholder="请选择" style="width: 100%" :disabled="!isEdit" :show-all-levels="false" :options="menuTreeData" :props="{ label: 'title', value: 'id', emitPath: false, checkStrictly: true }">
            <template v-slot="{ node, data }">
              <span>{{ data.title }}</span>
              <span v-if="!node.isLeaf">({{ data.children.length }})</span>
            </template>
          </el-cascader>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input :disabled="!isEdit" v-model="currentRow.source.description" clearable/>
        </el-form-item>
        <el-form-item label="菜单排序" prop="level" style="width: 100%" v-if="currentRow.source.type === 'menu'">
          <el-input-number :disabled="!isEdit" :min="1" :max="10000" v-model="currentRow.source.level" label="菜单排序" style="width: 100%"/>
        </el-form-item>
        <el-form-item v-if="currentRow.source.type === 'menu'" label="菜单图标" >
          <el-input v-model="currentRow.source.icon" :disabled="!isEdit"/>
<!--          <e-uploader v-model="iconList" :multiple="false" :limit="1" :disabled="!isEdit"/>-->
        </el-form-item>
        <el-form-item v-if="isEdit">
          <el-button type="primary" @click="saveAndFlush">保存</el-button>
          <el-button @click="isEdit=false">取消</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, watch } from 'vue'
import { EPanelTitle } from "ehl-ui"
import { getPermissionTree, operatePermission } from '@/http/api/system'
import { MenuInfo } from '@/models/system'
import { menuTypeOptions } from '@/models/common'
import { ElMessage, ElMessageBox, UploadUserFile } from 'element-plus'

export default defineComponent({
  name: 'SystemMenu',
  components: {
    EPanelTitle
  },
  setup () {
    const treeData = ref<MenuInfo[]>([])
    const menuTreeData = ref<MenuInfo[]>([])
    const reloadTree = () => {
      getPermissionTree(false).then(res => {
        treeData.value = res
      })
      getPermissionTree(true).then(res => {
        menuTreeData.value = res.concat([{ id: 0, title: '顶级菜单' }])
      })
    }
    const rules = reactive({
      type: [{ required: true, message: '类型必选', trigger: 'change' }],
      title: [{ required: true, message: '标题必填', trigger: 'change' }],
      resources: [{ required: true, message: '标识必填', trigger: 'change' }, {
        validator: function (rule:any, value:any, callback: any) {
          const regex = /[a-z]{2}$/
          if (!regex.test(value)) {
            callback(new Error('标识必须是全英文小写5位以上字母'))
          } else {
            callback()
          }
        },
        trigger: 'change'
      }],
      parentId: [{ required: true, message: '上级菜单必选', trigger: 'change' }],
      description: [{ required: true, message: '描述必填', trigger: 'change' }],
      level: [{ required: true, message: '排序必填', trigger: 'change' }]
    })
    const isEdit = ref(false)
    const menuTypes = computed(() => menuTypeOptions)
    const currentRow = ref<MenuInfo>({
      source: {}
    })
    const iconList = ref<UploadUserFile[]>([])
    watch(() => iconList, (val) => {
      console.log(val)
    })
    const handleNodeClick = (node: MenuInfo) => {
      if (currentRow.value.id !== node.id) {
        isEdit.value = false
      }
      currentRow.value = node
    }
    const saveAndFlush = () => {
      if (currentRow.value.source?.pid) {
        operatePermission(currentRow.value.source, "put").then(() => {
          ElMessage.success("修改成功")
          isEdit.value = false
          reloadTree()
        })
      } else {
        // @ts-ignore
        operatePermission(currentRow.value.source, "post").then(() => {
          ElMessage.success("新增成功")
          isEdit.value = false
          reloadTree()
        })
      }
    }
    const deleteMenu = () => {
      if (currentRow.value.source?.pid) {
        ElMessageBox.confirm(`确定要删除【${currentRow.value.source.title}】吗? 请确认这个菜单下面没有子菜单.并且没有角色在使用这个菜单.否则无法删除 是否继续?`, "警告", {
          callback: (result: string) => {
            if (result === 'confirm') {
              operatePermission(currentRow.value.source!, "delete").then(res => {
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
      treeData,
      menuTreeData,
      rules,
      currentRow,
      menuTypes,
      isEdit,
      iconList,
      handleNodeClick,
      saveAndFlush,
      deleteMenu
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
