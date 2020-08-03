var form = document.getElementById("form");

var signing = false
var user = undefined
form.onsubmit = (event) => {
  event.preventDefault();
  if (signing) return
  if (!user) return
  signing = true
  var date = undefined
  try {
    date = new Date(form['date'].value)
  }
  catch (err) {
    signing = false
    alert("Invalid date")
    return
  }
  fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=N659j7ox3vSpd81adhphLOKmFafYAAmP&location=${form['address'].value}`,{method: 'POST'}).then(res => {
      res.json().then(res2 => {
        console.log(res2)
        var lat = res2.results[0].locations[0].displayLatLng.lat; 
        var lng = res2.results[0].locations[0].displayLatLng.lng;
        firebase.firestore().collection("places").add({
          longitude: lat,
          latitude: lng,
          name: form['name'].value,
          description: form['description'].value,
          address: form['address'].value,
          link: form['link'].value,
          date: new Date(form['date'].value),
          uid: user.uid
        }).then(() => {
          window.location = window.location
        })
      })
  })
  
};
firebase.auth().onAuthStateChanged((u) => {
  if (!u) {
    window.location.pathname = "/login";
  }
  else {
    user = u
    firebase.firestore().collection("places").where("uid", "==", user.uid).get().then(docs => {
      var places = docs.docs.map(doc => doc.data())
      places.forEach(point => {
        console.log(point.name)
        point.name = point.name.replace(/</g,'&lt;')
        point.name = point.name.replace(/>/g,'&gt;')
    
        point.description = point.description.replace(/</g,'&lt;')
        point.description = point.description.replace(/>/g,'&gt;')
        document.getElementById("your-listings").innerHTML += `
        <div class="flexbox-item">
          <div class="listing">
            <h1>${point.name}</h1>
            <h2>Address: ${point.name}</h2>
            <h2>Date/Time: ${point.date.toDate().toLocaleString()}</h2>
            <h2>Description: ${point.description}</h2>
            <h2><a target="_blank" href="${point.link}">Sign Up Here!</a></h2>
          </div>
        </div>`
      })
    })
  }
});




//code


//now convert this address

