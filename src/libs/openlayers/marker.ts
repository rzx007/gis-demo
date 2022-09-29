import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { Icon, Style } from 'ol/style'
import VectorSource from 'ol/source/Vector'
import { Vector as VectorLayer } from 'ol/layer'
import img from '@/assets/marker-icon.png'
import { fromLonLat } from 'ol/proj'

export type Mparams = {
  coordinate: Array<number>
  name?: string
  anchor?: Array<number>
  src?: string
}
// 创建marker
export const setOlMarker = (params: Mparams): VectorLayer<VectorSource<Point>> => {
  const initParams = Object.assign({ src: img }, params)
  const iconFeature = new Feature({
    geometry: new Point(fromLonLat(initParams.coordinate)),
    name: 'marker name',
    population: 4000,
    rainfall: 500,
  })

  const iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: initParams.src,
    }),
  })

  iconFeature.setStyle(iconStyle)
  const vectorSource = new VectorSource({
    features: [iconFeature],
  })

  const vectorLayer = new VectorLayer({
    source: vectorSource,
  })
  return vectorLayer
}
