<template>
  <div class="tab-pane">
    <el-tabs v-model="currentTab" type="card" @tab-click="onClickTab" @tab-remove="onRemoveTab">
      <el-tab-pane v-for="item in tabs" :key="item.path" :label="item.title" :name="item.path" :closable="item.title!=='工作首页'" />
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useSessionStorage } from '@vueuse/core'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from "vuex"

export default defineComponent({
  name: 'TabPane',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const currentTab = ref('')
    const tabs = useSessionStorage<any[]>("tabs", [])
    if (tabs.value.length <= 0) {
      tabs.value.push({
        path: '/dashboard',
        title: '工作首页',
        name: 'Dashboard'
      })
    } else {
      tabs.value = [{
        path: '/dashboard',
        title: '工作首页',
        name: 'Dashboard'
      }].concat(tabs.value.filter(item => item.path !== '/dashboard'))
    }
    const onClickTab = (tab: any) => {
      if (route.path === tab.props.name) {
        return
      }
      router.push(tab.props.name)
    }
    const onRemoveTab = (name: string) => {
      tabs.value.forEach((tab, index) => {
        if (tab.path === name) {
          store.commit("cache/DEL_CACHED_VIEW", tab.name)
          tabs.value.splice(index, 1)
          if (name === currentTab.value) {
            if (index > 1) {
              router.replace(tabs.value[index - 1].path)
            } else {
              router.replace('/')
            }
          }
          return true
        }
      })
    }
    watch(route, (val) => {
      store.commit("cache/ADD_CACHED_VIEW", val.name)
      adjustRoute()
    })
    const adjustRoute = () => {
      if (route.path === '/login') {
        return
      }
      let isIn = false
      for (const tab of tabs.value) {
        if (route.meta.activityPath && tab.path === route.meta.activityPath) {
          currentTab.value = route.meta.activityPath as string
          isIn = true
          break
        } else if (tab.path === route.path) {
          currentTab.value = route.path
          isIn = true
          break
        }
      }
      if (!isIn) {
        tabs.value.push({
          path: route.path,
          title: route.meta.title,
          name: route.name
        })
        currentTab.value = route.path
      }
    }
    adjustRoute()
    return {
      currentTab,
      tabs,
      onClickTab,
      onRemoveTab
    }
  }
})
</script>

<style  scoped>
.tab-pane {
  display: block;
  width: 100%;
  overflow: auto;
  flex: 1;
  height: 0;
}
.tab-pane :deep(.el-tabs__header) {
  margin: 0;
  height: 100%;
}
.tab-pane :deep(.el-tabs__header .el-tabs__nav) {
  border: none;
  display: flex;
}
.tab-pane :deep(.el-tabs--card>.el-tabs__header .el-tabs__item) {
  color: white;
  border-left: none;
  width: 195px;
  text-align: left;
  padding: 0 30px !important;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.tab-pane :deep(.el-tabs--card>.el-tabs__header .el-tabs__item:first-child) {
  width: 120px;
}
.tab-pane :deep(.el-tabs--card>.el-tabs__header .el-tabs__item.is-active) {
  color: #4291f6;
  background: url("../../../assets/images/img_tab_bg_hl.png") no-repeat center center;
  background-size: 100% 100%;
}
.tab-pane :deep(.el-tabs--card>.el-tabs__header .el-tabs__item.is-active:first-child) {
  background: url("../../../assets/images/img_tab_bg_home.png") no-repeat center center;
}
.tab-pane :deep(.el-tabs--card>.el-tabs__header .el-tabs__item .is-icon-close) {
  position: absolute;
  top: 13px;
  right: 20px;
  width: 14px;
}
</style>
