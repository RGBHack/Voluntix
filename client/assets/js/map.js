var points = [
  {
    latitude: -121.91595,
    longitude: 37.36729,
    name: "Speedy Pizza",
    description: "Great Pizza. 100 Century Center Ct 210, San Jose, CA 95112, USA",
    link: "https://rgbhack.tk"
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
  var markerElement = document.createElement('div');
  markerElement.classList = 'marker';
  markerElement.innerHTML = "<img src='assets/images/marker.svg'>"
  var marker = new tt.Marker({element: markerElement}).setLngLat([point.latitude,point.longitude]).addTo(map);

  var popupOffsets = {
    top: [0, 0],
    bottom: [0, -70],
    'bottom-right': [0, -70],
    'bottom-left': [0, -70],
    left: [25, -35],
    right: [-25, -35]
  }
  point.name = point.name.replaceAll('<','&lt;')
  point.name = point.name.replaceAll('>','&gt;')

  point.description = point.description.replaceAll('<','&lt;')
  point.description = point.description.replaceAll('>','&gt;')

  var popup = new tt.Popup({offset: popupOffsets}).setHTML(`<b>${point.name}</b><br/>${point.description} <br/> <a target="_blank" href="${point.link}">Sign Up Here!</a>`);
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

function goToLocation (id) {
  map.easeTo({center: [points[id].latitude,points[id].longitude], zoom: 15})
}
