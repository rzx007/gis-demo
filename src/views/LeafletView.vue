<template>
  <div class="about">
    <div id="map" style="width: 100%; height: 95vh"></div>
    <div class="leaflet-tool">
      <button type="danger" size="small" @click="clearAllLayers()">清除所有元素</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { setLPoint } from '@/libs/leaflet'
const layerGroup = L.layerGroup()
const clearAllLayers = () => {
  layerGroup.clearLayers()
}
onMounted(() => {
  const baseTile = L.tileLayer.wms('http://10.172.246.234:7070/geoserver/cite/wms?service=WMS&tiled=true', {
    layers: 'cite:china_map',
    transparent: true,
    minZoom: 3,
    zoomOffset: 1,
  })
  const secTile = L.tileLayer.wms('http://10.172.246.234:7070/geoserver/cite/wms?service=WMS', {
    layers: 'cite:natural_earth',
    transparent: true,
    minZoom: 3,
  })

  const map = L.map('map', {
    crs: L.CRS.EPSG3857,
    center: L.latLng(30.577739, 114.357033),
    zoom: 13,
    zoomControl: true,
    layers: [baseTile],
  })
  const baseMaps = {
    ['资源图']: baseTile,
  }
  const layerControl = L.control.layers(baseMaps).addTo(map)
  layerControl.addBaseLayer(secTile, 'secTile')
  const marker = L.marker(L.latLng(30.577739, 114.357033)).addTo(map)
  marker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup()
  const popup = L.popup()

  function onMapClick(e: any) {
    // popup
    //   .setLatLng(e.latlng)
    //   .setContent('You clicked the map at ' + e.latlng.toString())
    //   .openOn(map)
    layerGroup.addLayer(setLPoint(e.latlng))
    layerGroup.addTo(map)
  }

  // map.doubleClickZoom.disable()
  map.on('click', onMapClick)
  map.on('popupopen', (e) => {
    console.log(e)
    console.log(map.getCenter())
  })
})
</script>
<style>
.leaflet-tool {
  position: absolute;
  right: 20px;
  top: 100px;
  z-index: 10000;
}
</style>
