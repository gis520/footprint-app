<template>
  <div id="map-wrap" style="height: 100vh">
    <l-map style="width: 100%" :zoom="zoom" :center="center" :minZoom="minZoom" :maxZoom="maxZoom">
      <l-tile-layer :url="url"></l-tile-layer>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer } from 'vue2-leaflet'
export default {
  components: { LMap, LTileLayer },
  data() {
    return {
      url:
        'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
      zoom: 4,
      minZoom: 3,
      maxZoom: 16,
      center: [35.63452, 109.132287]
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
