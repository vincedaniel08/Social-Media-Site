import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDB_qty58LORVAm2bB7lih1cs229ExV8IE",
    authDomain: "impulse-social-media-2021.firebaseapp.com",
    projectId: "impulse-social-media-2021",
    storageBucket: "impulse-social-media-2021.appspot.com",
    messagingSenderId: "842876997291",
    appId: "1:842876997291:web:63dbf06a1476528cc731ee"

});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

export default firebase;