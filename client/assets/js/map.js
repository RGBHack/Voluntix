var points = undefined
var markers = undefined
var popups = undefined

firebase.firestore().collection("places").get().then(docs => {
  console.log(docs)
  points = docs.docs.map(doc => doc.data())
  markers = []
  popups = []

  var map = tt.map({
      key: '3GL4SKqyqIbhIFJpZwVYTcBCA5DxGHMW',
      container: 'map',
      style: 'tomtom://vector/1/basic-main',
      center: [points[0].latitude,points[0].longitude],
      zoom: 15
  });

  map.addControl(new tt.NavigationControl())

  points.forEach((point, index) => {
    point.id = index;
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

    var popup = new tt.Popup({offset: popupOffsets}).setHTML(`<b>${point.name}</b><br/>Address: ${point.address} <br/>Date/Time: ${point.date.toDate().toLocaleString()}<br/>Description: ${point.description}<br /> <a target="_blank" href="${point.link}">Sign Up Here!</a>`);
    var popup1 = marker.setPopup(popup)
    markers.push(marker)
    popups.push(popup1)

    var div = document.createElement("div")
    div.classList = "listing"
    div.id = `${index}bruh`

    

    div.innerHTML = `<h1 id="${index}">${point.name}</h1><h2>Address: ${point.address}</h2><h2>Date/Time: ${point.date.toDate().toLocaleString()}<h2>Description: ${point.description}</h2> <h2><a target="_blank" href="${point.link}">Sign Up Here!</a></h2>`

    document.getElementById("listings").appendChild(div)

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
    document.getElementById("listings").innerHTML = ""
    var points2 = points.concat()
    points2.sort((a, b) => calculateDistance(a.latitude,a.longitude,obj.coords.longitude,obj.coords.latitude)-calculateDistance(b.latitude,b.longitude,obj.coords.longitude,obj.coords.latitude))
    points2.forEach(point => {
      var index = point.id
      var div = document.createElement("div")
      div.classList = "listing"
      div.id = `${index}bruh`
  
      div.innerHTML = `<h1 id="${index}">${point.name}</h1><h2>Address: ${point.address}</h2><h2>Date/Time: ${point.date.toDate().toLocaleString()}<h2>Description: ${point.description}</h2> <h2><a target="_blank" href="${point.link}">Sign Up Here!</a></h2>`
  
      document.getElementById("listings").appendChild(div)
  
      document.getElementById("location-message").innerHTML = "Volunteer Experiences are ordered by location."

      document.getElementById(index).onclick = function () {
        map.easeTo({center: [points[index].latitude,points[index].longitude], zoom: 15})
        if (!popups[index]._popup.isOpen()) popups[index].togglePopup()
      }
    })
  })
  map.addControl(geolocate);

})

function calculateDistance(lat1, lon1, lat2, lon2) {
  var radlat1 = Math.PI * lat1/180
  var radlat2 = Math.PI * lat2/180
  var theta = lon1-lon2
  var radtheta = Math.PI * theta/180
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist)
  dist = dist * 180/Math.PI
  dist = dist * 60 * 1.1515
  return dist
}

document.getElementById("search").oninput = function () {
  var value = event.target.value
  points.forEach(point => {
    console.log(point.name)
    if (point.name.toLowerCase().includes(value.toLowerCase()) || point.description.toLowerCase().includes(value.toLowerCase())) {
      document.getElementById(point.id+"bruh").style.display = "block"
    }
    else {
      document.getElementById(point.id+"bruh").style.display = "none"
    }
  })
}