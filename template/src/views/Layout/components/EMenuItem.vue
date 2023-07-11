<template>
  <div v-if="!item.hidden">
    <el-sub-menu v-if="onlyOneChild(item)>0" :index="item.path" popper-append-to-body >
      <template #title>
        <div class="parent-item d-flex flex-row align-items-center">
          <img v-if="item.meta.icon" :src="generateIcon(item)" class="nav-icon" alt="">
          <span class="first-menu" :style="generateTitle(item)">{{ item.meta.title }}</span>
        </div>
      </template>
      <e-menu-item v-for="child in item.children" :key="child.path" :item="child" />
    </el-sub-menu>
    <router-link :to="item.path" v-else-if="item.independent">
      <el-menu-item :class="{'parent-active-color': generateParentBackground(item)}" class="only-one-item">
        <img v-if="item.meta.icon" :src="generateIcon(item)" class="nav-icon" alt="">
        <template #title>
          <span class="first-menu">{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </router-link>
    <el-menu-item v-else :index="item.path" :route="item" :class="{'parent-active-color': generateChildBackground(item)}">
      <img v-if="item.meta.icon" :src="generateIcon(item)" class="nav-icon" alt="">
      <template #title>
        <span class="second-menu">{{ item.meta.title }}</span>
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
    const generateTitle = (item: any) => {
      const path = route.path.split("/").filter(p => p.length)[0]
      if (item.path.replace("/", "") === path) {
        return {
          color: "white"
        }
      } else {
        return {
          color: "#C6CFE1"
        }
      }
    }
    const onlyOneChild = (item: any) => {
      if (!item.children) {
        return 0
      } else {
        let num = 0
        item.children.forEach((it: any) => {
          if (!it.hidden || (it.hidden === false)) {
            num += 1
          }
        })
        return num
      }
    }
    const generateParentBackground = (item: any) => {
      const path = route.path.split("/").filter(p => p.length)[0]
      return item.path.replace("/", "") === path
    }
    const generateChildBackground = (item: any) => {
      if (item.path === route.path) {
        return true
      } else {
        if (item.meta.childrenPath) {
          return item.meta.childrenPath.indexOf(route.path) !== -1
        }
      }
      return false
    }
    return {
      route,
      generateIcon,
      generateTitle,
      onlyOneChild,
      generateParentBackground,
      generateChildBackground
    }
  }
})
</script>

<style lang="scss" scoped>
.first-menu {
  //color: #C6CFE1;
  font-size: 16px;
  margin-left: 10px;
}

.second-menu {
  font-size: 14px;
}

.only-one-item {
  background-color: #242832;
  color: #C6CFE1;
  height: 70px;
  line-height: 70px;
}

.parent-item {
  height: 70px;
  line-height: 70px;
}

.el-sub-menu__title {
  background-color: #242823;
}

:deep(.el-sub-menu__title) {
  height: 70px !important;
  line-height: 70px !important;
}

.parent-active-color {
  background: linear-gradient(90deg, rgba(21, 137, 245, 0.78) 0%, rgba(24, 144, 255, 0.78) 100%) !important;
  color: white !important;
}

.nav-icon {
  width: 28px;
  object-fit: scale-down;
}
</style>
<style scoped>
/*隐藏文字*/
:deep(.el-menu--collapse .el-submenu__title span) {
  display: none;
}

/*隐藏 > */
:deep(.el-menu--collapse .el-submenu__title .el-submenu__icon-arrow) {
  display: none;
}
</style>
