var points = [
  {
    latitude: -121.91595,
    longitude: 37.36729,
    name: "Speedy Pizza",
    description: "Great Pizza. 100 Century Center Ct 210, San Jose, CA 95112, USA"
  }
]

var map = tt.map({
    key: '3GL4SKqyqIbhIFJpZwVYTcBCA5DxGHMW',
    container: 'map',
    style: 'tomtom://vector/1/basic-main',
    center: [points[0].latitude,points[0].longitude],
    zoom: 15
});

map.addControl(new tt.NavigationControl())

points.forEach(point => {
  var marker = new tt.Marker().setLngLat([point.latitude,point.longitude]).addTo(map);

  var popupOffsets = {
    top: [0, 0],
    bottom: [0, -40],
    'bottom-right': [0, -70],
    'bottom-left': [0, -70],
    left: [25, -35],
    right: [-25, -35]
  }
  var popup = new tt.Popup({offset: popupOffsets}).setHTML(`<b>${point.name}</b><br/>${point.description}`);
  marker.setPopup(popup)
})

var geolocate = new tt.GeolocateControl({
   positionOptions: {
     enableHighAccuracy: true
   },
   trackUserLocation: true
})
geolocate.on("geolocate", function(obj) {
  console.log(`longitude is ${obj.coords.longitude} and latitude is ${obj.coords.latitude}`)
})
map.addControl(geolocate);