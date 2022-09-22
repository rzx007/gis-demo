<template>
  <div class="about">
    <div id="map" style="width: 100%; height: 400px"></div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import * as esriLeaflet from 'esri-leaflet'
onMounted(() => {
  const map = L.map('map').setView([51.505, -0.09], 13)
  esriLeaflet
    .dynamicMapLayer({
      url: 'http://localhost:3001/_alllayers/MapServer', //地图服务地址
      minZoom: 4, //最小缩放等级
      f: 'image',
      maxZoom: 21, //最大缩放等级
      useCors: true,
    })
    .addTo(map)
})
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
