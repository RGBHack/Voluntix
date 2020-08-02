alert("Please click on the location icon to find the volunteering oppurtunities nearest you!")

firebase.firestore().collection("places").get().then(docs => {
  console.log(docs)
  var points = docs.docs.map(doc => doc.data())
  var markers = []
  var popups = []

  var map = tt.map({
      key: '3GL4SKqyqIbhIFJpZwVYTcBCA5DxGHMW',
      container: 'map',
      style: 'tomtom://vector/1/basic-main',
      center: [points[0].latitude,points[0].longitude],
      zoom: 15
  });

  map.addControl(new tt.NavigationControl())

  points.forEach((point, index) => {
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

    var popup = new tt.Popup({offset: popupOffsets}).setHTML(`<b>${point.name}</b><br/>${point.description} <br/>${point.address}<br/> <a target="_blank" href="${point.link}">Sign Up Here!</a>`);
    var popup1 = marker.setPopup(popup)
    markers.push(marker)
    popups.push(popup1)
    document.getElementById(index).onclick = function () {
      map.easeTo({center: [points[index].latitude,points[index].longitude], zoom: 15})
      if (!popups[index]._popup.isOpen()) popups[index].togglePopup()
    }
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

})

