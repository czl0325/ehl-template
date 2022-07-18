<template>
  <div v-if="!item.hidden">
    <el-sub-menu v-if="onlyOneChild(item)>1" :index="item.path" popper-append-to-body >
      <template #title>
        <div class="parent-item d-flex flex-row align-items-center">
          <img v-if="item.meta?.icon" :src="generateIcon(item)" class="nav-icon">
          <span class="first-menu">{{ item.meta?.title }}</span>
        </div>
      </template>
      <e-menu-item v-for="child in item.children" :key="child.path" :item="child" />
    </el-sub-menu>
    <app-link :to="item.children[0].path" v-else-if="onlyOneChild(item)===1">
      <el-menu-item :class="{'parent-active-color': generateParentBackground(item)}" class="parent-item">
        <template #title>
          <img v-if="item.meta?.icon" :src="generateIcon(item)" class="nav-icon">
          <span class="first-menu">{{ item.meta?.title }}</span>
        </template>
      </el-menu-item>
    </app-link>
    <el-menu-item v-else :index="item.path" :route="item" :class="{'parent-active-color': item.path===route.path}">
      <template #title>
        <img v-if="item.meta?.icon" :src="generateIcon(item)" class="nav-icon">
        <span class="second-menu">{{ item.meta?.title }}</span>
      </template>
    </el-menu-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from "vue-router"
import AppLink from "@/views/Layout/components/Link.vue"

export default defineComponent({
  name: 'EMenuItem',
  components: {
    AppLink
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const generateIcon = (item: any) => {
      const path = route.path.split("/").filter(p => p.length)[0]
      if (item.path.replace("/", "") === path) {
        return item.meta.icon.replace("nor", "sel")
      } else {
        return item.meta.icon
      }
    }
    const onlyOneChild = (item: any) => {
      if (!item.children) {
        return 0
      } else {
        let num = 0
        item.children.forEach((it: any) => {
          if ((!it.hidden || (it.hidden === false)) && it.component !== null && it.component !== undefined) {
            num += 1
          }
        })
        return num
      }
    }
    const generateParentBackground = (item: any) => {
      const path = route.path.split("/").filter(p => p.length)[0]
      return (item.path.replace("/", "") === path || (item.meta && item.meta.activityPath && item.meta.activityPath.replace("/", "") === path))
    }
    return {
      route,
      generateIcon,
      onlyOneChild,
      generateParentBackground
    }
  }
})
</script>

<style lang="scss" scoped>
.first-menu {
  color: #C6CFE1;
  font-size: 16px;
  margin-left: 10px;
}

.second-menu {
  font-size: 14px;
}

.parent-item {
  height: 70px;
  line-height: 70px;
}

:deep(.el-sub-menu__title) {
  height: 70px !important;
  line-height: 70px !important;
}

.parent-active-color {
  background: linear-gradient(90deg, rgba(21, 137, 245, 0.78) 0%, rgba(24, 144, 255, 0.78) 100%) !important;
}

.nav-icon {
  width: 28px;
  object-fit: scale-down;
}
</style>
<style scoped>

</style>
