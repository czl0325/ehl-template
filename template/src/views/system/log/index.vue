<template>
  <div class="app-container">
    <section class="panel mt-2">
      <el-form>
        <el-row :gutter="6">
          <el-col :span="12">
            <el-form-item label="起止时间">
              <el-date-picker v-model="search_value.startTime" placeholder="请选择" type="datetime"  value-format="YYYY-MM-DD HH:mm:ss"/>-<el-date-picker v-model="search_value.endTime" placeholder="请选择" type="datetime" value-format="YYYY-MM-DD HH:mm:ss"/>
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
                <el-option v-for="item in logOptions" :key="item.dictDataId" :label="item.dictDataName" :value="<string>item.dictDataId"/>
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
        <vxe-table :data="tableData" height="100%" :seq-config="{startIndex: ((pagination.pageNumber-1)*pagination.pageCount) }" :loading="pagination.loading">
          <vxe-column type="seq" title="序号" width="80" align="center" />
          <vxe-column field="userName" title="操作用户" width="110" align="center" />
          <vxe-column field="operationDeviceIp" title="IP地址" width="120" align="center" />
          <vxe-column field="browser" title="浏览器"  align="center" />
          <vxe-column field="logTime" title="操作时间" width="180" align="center" />
          <vxe-column field="logContent" title="操作内容" align="center" />
          <vxe-column field="logType" title="日志类型" width="100" align="center">
            <template #default="{row}">
              <span>{{ getDictText(logOptions, row.logType) }}</span>
            </template>
          </vxe-column>
        </vxe-table>
      </div>
      <vxe-pager v-model:current-page="pagination.pageNumber" v-model:page-size="pagination.pageCount" :total="pagination.total" @page-change="onGetSystemLog(false)" />
    </section>

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import dayjs from "dayjs"
import { cloneDeep } from "lodash"
import { dimensionOptions } from "@/models/common"
import { getDictByName } from "@/http/api/dict"
import { defaultPagination } from "@/http/http"
import { IDictInfo, ISystemLogInfo } from "@/models/system"
import { getSystemLogPage } from "@/http/api/system"
import { getDictText } from "../../../utils/tools"

export default defineComponent({
  name: 'SystemLogs',
  methods: { getDictText },
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
    const logOptions = ref<IDictInfo[]>([])
    getDictByName("日志类型").then(res => {
      logOptions.value = res
    })
    const search_value = reactive({
      dimension: 0,
      startTime: dayjs().subtract(30, "day").format("YYYY-MM-DD HH:mm:ss"),
      endTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      userName: "",
      logTypeList: []
    })
    const tableData = ref<ISystemLogInfo[]>([])
    const pagination = reactive(cloneDeep(defaultPagination))
    const onGetSystemLog = (refresh: boolean) => {
      if (refresh) pagination.pageNumber = 1
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
