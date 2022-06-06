<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <navbar />
      <app-main />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Sidebar from "@/views/Layout/components/Sidebar.vue"
import Navbar from "@/views/Layout/components/Navbar.vue"
import AppMain from "@/views/Layout/components/AppMain.vue"

export default defineComponent({
  name: 'Layout',
  components: { Sidebar, Navbar, AppMain },
  setup () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
@import "../../assets/css/variables.scss";
.app-wrapper {
  width: 100%;
  height: 100vh;
  overflow: auto;
  display: flex;
  .sidebar-container {
    background-color: #242832;
    transition: width 0.28s;
    width: $sideBarWidth !important;
    height: 100%;
    overflow: auto;
    flex-shrink: 1;
  }
  .main-container {
    background-color: #ecf0f9;
    flex: 1;
    display: inline-flex;
    flex-direction: column;
    overflow: auto;
  }
}
</style>
