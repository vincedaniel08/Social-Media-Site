import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAShFrPgYC9hNj-Gdu0DomOFYPsH4dOmxE",
  authDomain: "impulse-social-media.firebaseapp.com",
  projectId: "impulse-social-media",
  storageBucket: "impulse-social-media.appspot.com",
  messagingSenderId: "948398783344",
  appId: "1:948398783344:web:42b3d0fdf0e840e1abedb5"

});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

export default firebase;


