var form = document.getElementById("form");
var signing = false
form.onsubmit = (e) => {
  e.preventDefault();
  if (signing) return
  signing = true
  var email = form["name"].value;
  var password = form["password"].value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((err) => {
      signing = false
      alert("Please check your username and password");
    });
};
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    window.location.pathname = "/listings";
  }
});