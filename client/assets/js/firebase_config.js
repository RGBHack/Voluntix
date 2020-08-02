var firebaseConfig = {
  apiKey: "AIzaSyAnalYVk1kYKhi5A4ayvJgsiRbcBcm6DR0",
  authDomain: "voluntix.firebaseapp.com",
  databaseURL: "https://voluntix.firebaseio.com",
  projectId: "voluntix",
  storageBucket: "voluntix.appspot.com",
  messagingSenderId: "71072388005",
  appId: "1:71072388005:web:6843c83653700e4ed98e4c"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}