

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXLwTleKGf0CPGie4euFV5oTtkdNfQwNU",
  authDomain: "sellzone-62a94.firebaseapp.com",
  projectId: "sellzone-62a94",
  storageBucket: "sellzone-62a94.appspot.com",
  messagingSenderId: "822814816871",
  appId: "1:822814816871:web:b1b39acd908243718b32c2"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); 
const firestore = getFirestore(app);
const storage = getStorage(app);
const db = getFirestore(app);


onAuthStateChanged(auth, (user) => {
  if (user) {
    // console.log('User is logged in:', user.uid);
  } else {
    // console.log('User is logged out');
  }
});

export { app, analytics, auth, firestore, storage, getAuth, db, onAuthStateChanged };