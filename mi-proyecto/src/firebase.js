import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"; //autentificacion

//esto lo traigo de firebase:
const firebaseConfig = {
  apiKey: "AIzaSyClzGL0VMbTfkfyDnmubo7z1aScX8wkMl4",
  authDomain: "proyecto-prueba-c30ba.firebaseapp.com",
  projectId: "proyecto-prueba-c30ba",
  storageBucket: "proyecto-prueba-c30ba.appspot.com",
  messagingSenderId: "458121042286",
  appId: "1:458121042286:web:a4d0a21bb2c93bdf57897f",
};
//---------

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Exporta la funcionalidad de la DB
export const firestore = firebase.firestore();

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const loginConGoogle = () => auth.signInWithPopup(provider);
export const logout = () => auth.signOut();

// exporta el paquete de firebase para poder usarlo
export default firebase;
