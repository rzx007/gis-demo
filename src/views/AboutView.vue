<!--
 * @Author: 阮志雄
 * @Date: 2022-09-22 12:38:05
 * @LastEditTime: 2022-09-29 17:17:27
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \web-gis-vue3\src\views\AboutView.vue
-->
<template>
  <div class="about">
    <div id="map" style="width: 100%; height: 95vh"></div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import TileWMS from 'ol/source/TileWMS'
import { transform } from 'ol/proj'
import { setOlMarker } from '@/libs/openlayers'
// openlayers 的默认投射格式是EPSG:3857
onMounted(() => {
  const map = new Map({
    target: 'map',
  })
  map.setView(
    new View({
      // projection: 'EPSG:4326',
      center: transform([114.357033, 30.577739], 'EPSG:4326', 'EPSG:3857'),
      zoom: 16,
    })
  )
  const wmsTile1 = new TileLayer({
    source: new TileWMS({
      url: 'http://10.172.246.234:7070/geoserver/cite/wms',
      params: { LAYERS: 'cite:china_map', TILED: true },
      serverType: 'geoserver',
    }),
  })
  map.addLayer(wmsTile1)

  const vectorLayer = setOlMarker({
    coordinate: [114.357033, 30.577739],
  })
  map.addLayer(vectorLayer)
})
</script>
<style></style>
