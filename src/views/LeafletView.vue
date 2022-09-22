<template>
  <div class="about">
    <div id="map" style="width: 100%; height: 400px"></div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

onMounted(() => {
  const map = L.map('map').setView(L.latLng(31.99875937194732, 118.8720703125), 13)
  L.tileLayer('http://localhost:3001/gistiles/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 11,
  }).addTo(map)
  const marker = L.marker(L.latLng(31.99875937194732, 118.8720703125)).addTo(map)
  marker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup()
  const popup = L.popup()
  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent('You clicked the map at ' + e.latlng.toString())
      .openOn(map)
  }

  map.on('click', onMapClick)
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
