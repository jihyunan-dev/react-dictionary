import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_hU1WTPzN-iuY7xJ93Dwl0MrPUyNynZI",
  authDomain: "dictionary-5f7af.firebaseapp.com",
  projectId: "dictionary-5f7af",
  storageBucket: "dictionary-5f7af.appspot.com",
  messagingSenderId: "175760750739",
  appId: "1:175760750739:web:5ce9c69721b54c1e9d3566",
  measurementId: "G-RHT4Z534LY",
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };
