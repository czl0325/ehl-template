<template>
  <div class="app-container">
    <div class="panel h-100 p-0 d-flex flex-column">
      <div class="header">设备默认配置</div>
      <el-form class="p-3 w-75 flex-grow-1" label-width="100px">
        <el-form-item label="主电源" required>
          <el-input v-model="deviceMap['主电源-过压电压']">
            <template #prepend>过压电压</template>
            <template #append>V</template>
          </el-input>
          <el-input v-model="deviceMap['主电源-欠压电压']">
            <template #prepend>欠压电压</template>
            <template #append>V</template>
          </el-input>
          <el-input v-model="deviceMap['主电源-电流']">
            <template #prepend>电流</template>
            <template #append>mA</template>
          </el-input>
        </el-form-item>
        <el-form-item label="备用电源" required>
          <el-input v-model="deviceMap['备用电源-过压电压']">
            <template #prepend>过压电压</template>
            <template #append>V</template>
          </el-input>
          <el-input v-model="deviceMap['备用电源-欠压电压']">
            <template #prepend>欠压电压</template>
            <template #append>V</template>
          </el-input>
          <el-input v-model="deviceMap['备用电源-电流']">
            <template #prepend>电流</template>
            <template #append>mA</template>
          </el-input>
        </el-form-item>
        <el-form-item label="信号机" required>
          <el-input v-model="deviceMap['信号机-过压电压']">
            <template #prepend>过压电压</template>
            <template #append>V</template>
          </el-input>
          <el-input v-model="deviceMap['信号机-欠压电压']">
            <template #prepend>欠压电压</template>
            <template #append>V</template>
          </el-input>
          <el-input v-model="deviceMap['信号机-电流']">
            <template #prepend>电流</template>
            <template #append>mA</template>
          </el-input>
        </el-form-item>
        <el-form-item label="信号灯" required>
          <el-input v-model="deviceMap['信号灯-过压电压']">
            <template #prepend>过压电压</template>
            <template #append>V</template>
          </el-input>
          <el-input v-model="deviceMap['信号灯-欠压电压']">
            <template #prepend>欠压电压</template>
            <template #append>V</template>
          </el-input>
          <el-input v-model="deviceMap['信号灯-电流']">
            <template #prepend>电流</template>
            <template #append>mA</template>
          </el-input>
        </el-form-item>
        <el-form-item label="环境监测" required>
          <el-input v-model="deviceMap['环境监测-温度']">
            <template #prepend>温度</template>
            <template #append>℃</template>
          </el-input>
          <el-input v-model="deviceMap['环境监测-湿度']">
            <template #prepend>湿度</template>
            <template #append>%</template>
          </el-input>
          <el-input class="opacity-0" />
        </el-form-item>
      </el-form>
      <div class="text-align-right p-3">
        <el-button type="primary" size="large" @click="onSaveDeviceSetting">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getDeviceSettingAll, updateDeviceSettingAll } from "@/http/api/system"
import { ElMessage, FormRules } from "element-plus"

defineOptions({
  name: "SystemDevice"
})
const deviceMap = ref<any>({
  "主电源-过压电压": 0,
  "主电源-欠压电压": 0,
  "主电源-电流": 0,
  "备用电源-过压电压": 0,
  "备用电源-欠压电压": 0,
  "备用电源-电流": 0,
  "信号机-过压电压": 0,
  "信号机-欠压电压": 0,
  "信号机-电流": 0,
  "信号灯-过压电压": 0,
  "信号灯-欠压电压": 0,
  "信号灯-电流": 0,
  "环境监测-温度": 0,
  "环境监测-湿度": 0,
})
getDeviceSettingAll().then(res => {
  deviceMap.value = res
})
const onSaveDeviceSetting = () => {
  updateDeviceSettingAll(deviceMap.value).then(res => {
    ElMessage.success("更新成功")
  })
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #E6E6E6;
  padding: 0 20px;
  box-sizing: border-box;
  text-align: left;
  font-weight: bolder;
  font-size: 18px;
}
:deep(.el-input) {
  flex: 1;
  input {
    text-align: right;
  }
}
:deep(.el-input + .el-input) {
  margin-left: 10px;
}
</style>
