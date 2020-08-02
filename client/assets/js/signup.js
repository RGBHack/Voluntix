var signing = false

var form = document.getElementById("form");
form.onsubmit = (e) => {
  e.preventDefault();
  if (signing) return
  signing = true
  var email = form["name"].value;
  var password = form["password"].value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      window.location.pathname = "/"
    })
    .catch((err) => {
      if (err.code === "auth/email-already-in-use") {
        alert("Email is already in use");
      } else if (err.code === "auth/invalid-email") {
        alert("Invalid Email");
      } else {
        console.log(err.code);
        alert("Insecure password");
      }
      signing = false
    });
};

