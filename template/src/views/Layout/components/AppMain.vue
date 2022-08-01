<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <keep-alive :include="cachedViews">
        <component :is="Component"/>
      </keep-alive>
    </router-view>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from "vuex"

export default defineComponent({
  name: 'AppMain',
  setup: function () {
    const store = useStore()
    const cachedViews = computed(() => {
      return store.getters.cachedViews.map((item: string) => {
        return item
      })
    })
    return {
      cachedViews
    }
  }
})
</script>

<style lang="scss" scoped>
.app-main {
  height: calc(100vh - 100px);
  width: 100%;
  overflow-x: hidden !important;
  overflow-y: auto !important;
}
</style>
