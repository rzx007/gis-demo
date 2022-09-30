<template>
  <div id="cesiumContainer"></div>
</template>

<script lang="ts" setup>
import { createWorldTerrain, Rectangle, Viewer } from 'cesium'
import WebMapServiceImageryProvider from 'cesium/Source/Scene/WebMapServiceImageryProvider'
import { onMounted } from 'vue'
onMounted(() => {
  const viewer = new Viewer('cesiumContainer', {
    infoBox: false, // 是否显示点击元素之后显示的信息
    animation: false, // 是否显示动画空间
    fullscreenButton: false, // 是否显示全屏按钮
    geocoder: false, // 是否显示地名查找控件
    homeButton: false, // 是否显示home键
    navigationHelpButton: false, // 是否显示帮助信息控件
    sceneModePicker: false, // 是否显示投影方式
    timeline: false, // 是否显示时间线控件
    baseLayerPicker: false, // 是否显示图层选择控件
    selectionIndicator: false, // 是否显示指示器组件
    // terrainProvider: createWorldTerrain(),
    imageryProvider: new WebMapServiceImageryProvider({
      url: '/geoserver/cite/wms?service=WMS&tiled=true',
      layers: 'cite:china_map',
      parameters: {
        service: 'WMS',
        transparent: true,
      },
    }),
  })
  viewer.camera.flyTo({
    destination: Rectangle.fromDegrees(80, 26, 140.0, 35.5)
  })
  // @ts-ignore
  viewer._cesiumWidget._innerCreditContainer.style.display = 'none' // 去除logo信息
})
</script>

<style>
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
