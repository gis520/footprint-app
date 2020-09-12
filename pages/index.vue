<template>
  <div id="map-wrap" style="height: 100vh">
    <client-only>
      <l-map
        style="width: 100%"
        :zoom="zoom"
        :center="center"
        :minZoom="minZoom"
        :maxZoom="maxZoom"
      >
        <l-tile-layer :url="url"></l-tile-layer>
        <!-- 这里 -->
        <template v-for="p of footprintList">
          <l-marker :lat-lng="[p.latitude,p.longitude]" :icon="icon" :key="p._id">
            <l-popup>
              <h3 v-text="p.place"></h3>
              <p v-text="p.travelDate"></p>
              <p v-text="p.description"></p>
              <div class="photos">
                <img v-for="url of p.photos" :src="url" :key="url" width="120px" />
              </div>
            </l-popup>
          </l-marker>
        </template>
      </l-map>
    </client-only>
  </div>
</template>

<script>
import L from 'leaflet'
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'
import { post } from '@/shared/request'
export default {
  components: { LMap, LTileLayer, LMarker, LPopup },
  data() {
    return {
      url:
        'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
      zoom: 4,
      minZoom: 3,
      maxZoom: 16,
      center: [35.63452, 109.132287],
      listLoading: false,
      footprintList: [],
      icon: L.icon({
        iconUrl: './images/foot.png',
        iconSize: [28, 28],
        iconAnchor: [10, 10],
      }),
    }
  },
  mounted() {
    this.getFootprints()
  },
  methods: {
    getFootprints() {
      this.listLoading = true
      // 查询所有足迹点
      post('/footprint/pageList', { page: 1, size: 9999 }).then((response) => {
        response.data.forEach((item) => {
          item.travelDate =
            item.travelDate && item.travelDate.length === 2
              ? item.travelDate.join(' ~ ')
              : item.travelDate.join('')
        })
        this.footprintList = response.data
        this.listLoading = false
      })
    },
  },
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
