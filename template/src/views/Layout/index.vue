<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" :class="fold ? 'sidebar-fold' : 'sidebar-unfold'" :collapse="fold"/>
    <div class="main-container" :class="fold ? 'main-fold' : 'main-unfold'">
      <navbar @onFold="onFold" :is-fold="fold"/>
      <app-main />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue'
import { useLocalStorage } from "@vueuse/core"
import Sidebar from '@/views/Layout/components/Sidebar.vue'
import Navbar from '@/views/Layout/components/Navbar.vue'
import AppMain from '@/views/Layout/components/AppMain.vue'

defineOptions({
  name: "Layout"
})
const fold = useLocalStorage("sidebar-fold", false)
const onFold = () => {
  fold.value = !fold.value
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/variables.scss";

.app-wrapper {
  width: 100%;
  height: 100vh;
  overflow: auto;
  position: relative;
  .sidebar-container {
    background-color: #242832;
    transition: width 0.28s;
    height: 100%;
    overflow: auto;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
  }
  .sidebar-fold {
    width: $sideBarFoldWidth !important;
  }
  .sidebar-unfold {
    width: $sideBarWidth !important;
  }
  .main-container {
    transition: left 0.28s;
    background-color: #ecf0f9;
    overflow: auto;
    position: absolute;
    right: 0 ;
    top: 0;
    bottom: 0;
  }
  .main-fold {
    left: $sideBarFoldWidth !important;
  }
  .main-unfold {
    left: $sideBarWidth !important;
  }
}
</style>
