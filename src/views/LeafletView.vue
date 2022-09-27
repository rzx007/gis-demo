<template>
  <div class="about">
    <div id="map" style="width: 100%; height: 95vh"></div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

onMounted(() => {
  const map = L.map('map', {
    crs: L.CRS.EPSG4326,
  }).setView(L.latLng(30.58203, 114.02919), 6)
  const baseTile = L.tileLayer.wms('http://10.172.246.234:7070/geoserver/cite/wms?service=WMS', {
    layers: '	cite:china_buildings,cite:china_water,cite:china_railways',
    transparent: true,
    minZoom: 3,
  })
  const secTile = L.tileLayer.wms('http://localhost:4003/geoserver/cite/wms?service=WMS', {
    layers: 'cite:gis_osm_roads',
    transparent: true,
    minZoom: 3,
  })
  L.layerGroup([baseTile]).addTo(map)
  const marker = L.marker(L.latLng(30.58203, 114.02919)).addTo(map)
  marker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup()
  const popup = L.popup()
  function onMapClick(e: any) {
    popup
      .setLatLng(e.latlng)
      .setContent('You clicked the map at ' + e.latlng.toString())
      .openOn(map)
  }

  map.on('click', onMapClick)
})
</script>
<style></style>
