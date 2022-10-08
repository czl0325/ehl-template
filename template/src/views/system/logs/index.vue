<template>
  <div class="app-container">
    <section class="panel mt-2">
      <el-form>
        <el-row :gutter="6">
          <el-col :span="5">
            <el-form-item label="查询维度">
              <el-select v-model="search_value.dimension" placeholder="请选择">
                <el-option v-for="item in dimensionOptions" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="起止时间">
              <el-date-picker v-model="search_value.startTime" placeholder="请选择" :type="changeDateType()" />-<el-date-picker v-model="search_value.endTime" placeholder="请选择" :type="changeDateType()" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="操作用户">
              <el-input v-model="search_value.userName" placeholder="请输入操作用户"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="日志类型">
              <el-select v-model="search_value.logTypeList" multiple placeholder="请选择日志类型">
                <el-option v-for="item in logOptions" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2" style="text-align: right">
            <el-button type="primary" @click="onGetSystemLog(true)">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <section class="panel my-2 panel-content">
      <div class="panel-table">
        <vxe-table :data="tableData" height="100%" :seq-config="{startIndex: ((pagination.currentPage-1)*pagination.pageSize) }" :loading="pagination.loading">
          <vxe-column type="seq" title="序号" width="80" align="center" />
          <vxe-column field="userName" title="操作用户" width="110" align="center" />
          <vxe-column field="operationDeviceIp" title="IP地址" width="120" align="center" />
          <vxe-column field="browser" title="浏览器"  align="center" />
          <vxe-column field="logTime" title="操作时间" width="180" align="center" />
          <vxe-column field="logContent" title="操作内容" align="center" />
          <vxe-column field="logTypes" title="日志类型" width="100" align="center" />
        </vxe-table>
      </div>
      <vxe-pager v-model:current-page="pagination.currentPage" v-model:page-size="pagination.pageSize" :total="pagination.total" @page-change="onGetSystemLog(false)" />
    </section>

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import dayjs from "dayjs"
import { cloneDeep } from "lodash"
import { dimensionOptions } from "@/models/common"
import { getRedisKeyValueAll, LabelInfo } from "@/http/api/dict"
import { defaultPagination } from "@/http/http"
import { SystemLogInfo } from "@/models/system"
import { getSystemLogPage } from "@/http/api/system"

export default defineComponent({
  name: 'SystemLogs',
  setup () {
    const changeDateType = () => {
      switch (search_value.dimension) {
        case 0: return "date"
        case 1: return "week"
        case 2: return "date"
        case 3: return "month"
        case 4: return "month"
        case 5: return "date"
        case 6: return "year"
        default: return "date"
      }
    }
    const logOptions = ref<LabelInfo[]>([])
    getRedisKeyValueAll("日志类型").then(res => {
      logOptions.value = res
    })
    const search_value = reactive({
      dimension: 0,
      startTime: dayjs().subtract(30, "day").toDate(),
      endTime: dayjs().toDate(),
      userName: "",
      logTypeList: []
    })
    const tableData = ref<SystemLogInfo[]>([])
    const pagination = reactive(cloneDeep(defaultPagination))
    const onGetSystemLog = (refresh: boolean) => {
      if (refresh) pagination.currentPage = 1
      getSystemLogPage(search_value, pagination).then(res => {
        tableData.value = res.list
      })
    }
    onGetSystemLog(true)
    return {
      dimensionOptions,
      changeDateType,
      search_value,
      logOptions,
      tableData,
      pagination,
      onGetSystemLog
    }
  }
})
</script>

<style lang="scss" scoped>
:deep(.el-form-item) {
  margin-bottom: 0;
}
:deep(.el-form-item__content) {
  flex-wrap: nowrap;
}
</style>
