<template>
  <div class="about">
    <div id="map" style="width: 100%; height: 400px"></div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import Map from 'ol/Map'
import View from 'ol/View'
import OSM from 'ol/source/OSM'
import TileLayer from 'ol/layer/Tile'

onMounted(() => {
  const map = new Map({ target: 'map' })
  map.setView(
    new View({
      center: [0, 0],
      zoom: 2,
    })
  )
  const source = new OSM()
  const layer = new TileLayer({ source: source })
  map.addLayer(layer)
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
