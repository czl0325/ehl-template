<template>
  <div class="d-flex flex-column h-100" style="background-color: #242832">
    <img :src="isCollapse?getAssetsFile('image_logo_phone.png'):getAssetsFile('image_logo.png')" :class="isCollapse?'logo-fold':'logo-unfold'" alt=""/>
    <el-scrollbar noresize class="flex-1">
      <el-menu background-color="#00000000" text-color="#A6B3CB" active-text-color="#FFF" :default-active="activeMenu" unique-opened router :collapse="isCollapse" :collapse-transition="false">
        <e-menu-item v-for="route in routes" :item="route" :key="<any>route" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import EMenuItem from "@/views/Layout/components/EMenuItem.vue"
import { getAssetsFile } from "@/utils/tools"
import { constantRouterMap } from "@/router"

export default defineComponent({
  name: 'Sidebar',
  components: {
    EMenuItem
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const store = useStore()
    const route = useRoute()
//    const routes = computed(() => store.getters.routes)
    const routes = computed(() => constantRouterMap)
    const adjustActiveMenu = (arr: any[]) => {
      let path = ""
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        if (item.meta.activityPath && item.path === route.path) {
          path = item.meta.activityPath
          break
        }
        if (item.children?.length > 0) {
          path = adjustActiveMenu(item.children)
        }
      }
      if (path === "") {
        path = route.path
      }
      return path
    }
    const activeMenu = computed(() => route.path)
    const isCollapse = computed(() => props.collapse)
    return {
      routes,
      activeMenu,
      isCollapse,
      getAssetsFile
    }
  }
})
</script>

<style lang="scss" scoped>
.logo-unfold {
  width: 219px;
  height: 50px;
  margin: 24px auto;
  position: sticky;
}
.logo-fold {
  width: 41px;
  height: 51px;
  margin: 24px auto;
  position: sticky;
}
</style>
<style>
.el-menu {
  border: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  min-height: 100%;
}
.el-menu-item.is-active {
  background-color: #3C424E;
}
.el-menu-item {
  background-color: #191E29;
}
</style>
