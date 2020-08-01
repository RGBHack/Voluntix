var speedyPizzaCoordinates = [-121.91595, 37.36729];
tt.setProductInfo('asfdsafdsafsadf', 'asfdasdfsadf')
  var map = tt.map({
      key: '3GL4SKqyqIbhIFJpZwVYTcBCA5DxGHMW',
      container: 'map',
      style: 'tomtom://vector/1/basic-main',
  center: speedyPizzaCoordinates,
  zoom: 15
  });
map.addControl(new tt.NavigationControl())
var marker = new tt.Marker().setLngLat(speedyPizzaCoordinates).addTo(map);
var popupOffsets = {
  top: [0, 0],
  bottom: [0, -40],
  'bottom-right': [0, -70],
  'bottom-left': [0, -70],
  left: [25, -35],
  right: [-25, -35]
}

var popup = new tt.Popup({offset: popupOffsets}).setHTML("<b>Speedy's pizza</b><br/>100 Century Center Ct 210, San Jose, CA 95112, USA");
marker.setPopup(popup)
var geolocate = new tt.GeolocateControl({
   positionOptions: {
     enableHighAccuracy: true
   },
   trackUserLocation: true
})
geolocate.on("geolocate", function(obj) {console.log(`longitude is ${obj.coords.longitude} and latitude is ${obj.coords.latitude}`)})
map.addControl(geolocate);