import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAKYQxHeQMl2jiL5sg9Rv6AAh6zMuvCHbE",
    authDomain: "gdocs-clone-a93f3.firebaseapp.com",
    projectId: "gdocs-clone-a93f3",
    storageBucket: "gdocs-clone-a93f3.appspot.com",
    messagingSenderId: "671795771825",
    appId: "1:671795771825:web:126a9d4e7149e114232590"
  };

  const app = !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig) 
  : firebase.app();
  
  const db = app.firestore();

  export {
    db
  }