<template>
  <div class="d-flex flex-column h-100">
    <img src="../../../assets/images/image_logo.png" style="margin: 25px auto;position: sticky" >
    <el-scrollbar noresize class="flex-1">
      <el-menu background-color="#00000000" text-color="#A6B3CB" active-text-color="#FFF" :default-active="activeMenu" unique-opened router>
        <e-menu-item v-for="route in routes" :item="route" :key="route" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import EMenuItem from "@/views/Layout/components/EMenuItem.vue"
import { useRoute } from 'vue-router'
import { constantRouterMap } from "@/router"

export default defineComponent({
  name: 'Sidebar',
  components: {
    EMenuItem
  },
  setup () {
    const route = useRoute()
    const routes = ref(constantRouterMap)
    const activeMenu = computed(() => route.path)
    return {
      routes,
      activeMenu
    }
  }
})
</script>

<style lang="scss" scoped>

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
</style>
