import firebase from 'firebase';


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBOS1XSrW4rqVk2VIJxS_VK7P4pW-RU474",
    authDomain: "weatherwardrobe-3afc4.firebaseapp.com",
    databaseURL: "https://weatherwardrobe-3afc4.firebaseio.com",
    projectId: "weatherwardrobe-3afc4",
    storageBucket: "weatherwardrobe-3afc4.appspot.com",
    messagingSenderId: "566208856852"
  };
  const fire = firebase.initializeApp(config);
  export default fire;
