import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDt9DWh6ybZYVfe6I0F48agsk9ze3lSLJE",
  authDomain: "clone-262dc.firebaseapp.com",
  projectId: "clone-262dc",
  storageBucket: "clone-262dc.appspot.com",
  messagingSenderId: "112326039792",
  appId: "1:112326039792:web:f557de5a633037d00e4a35"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };