var form = document.getElementById("form");
var signing = false
var user = undefined
/*form.onsubmit = (e) => {
  e.preventDefault();
  if (signing) return
  if (!user) return
  signing = true
  firebase.firestore().collection("places").add({
    longitude: 111,
    latitude: 110,
    name: "name",
    description: "description",
    address: "some address",
    link: "https://google.com",
    uid: user.uid
  })
  window.location = window.location
};*/
firebase.auth().onAuthStateChanged((u) => {
  if (!u) {
    window.location.pathname = "/login";
  }
  else {
    user = u
    firebase.firestore().collection("places").where("uid", "==", user.uid).get().then(docs => {
      var places = docs.docs.map(doc => doc.data())
      places.forEach(place => {
        console.log(`da place is ${place.name}`)
      })
    })
  }
});