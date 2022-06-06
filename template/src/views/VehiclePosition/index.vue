<template>
  <div id="map" class="w-100 h-100">

  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { shallowRef } from '@vue/reactivity'
import AMapLoader from '@amap/amap-jsapi-loader'

export default defineComponent({
  name: 'VehiclePosition',
  setup() {
    const map = shallowRef(null)
    onMounted(() => {
      AMapLoader.load({
        key: "7b1b8483b06da673188e1f1fab786ee5", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [''] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        map.value = new AMap.Map("map", { // 设置地图容器id
          viewMode: "3D", // 是否为3D地图模式
          zoom: 15, // 初始化地图级别
          mapStyle: 'amap://styles/c22f9e0ede8c89d8505e7a1b75220b28',
          center: [118.0404, 24.2646] // 初始化地图中心点位置
        })
      }).catch(e => {
        console.log(e)
      })
    })
    return {
      map
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
