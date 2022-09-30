import L from 'leaflet'
export const setLPoint = (latLng: L.LatLngExpression) => {
  const circle = L.circle(latLng, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 400,
  })
  return circle
}
