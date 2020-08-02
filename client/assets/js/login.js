var form = document.getElementById("form");
form.onsubmit = (e) => {
  e.preventDefault();
  var email = form["name"].value;
  var password = form["password"].value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((err) => {
      alert("Please check your username and password");
    });
};
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    window.location.pathname = "/";
  }
});