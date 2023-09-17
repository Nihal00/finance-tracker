// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALGZpbo82tCUaaINSoT-gkXiimfuPl0Jk",
  authDomain: "financetrako.firebaseapp.com",
  projectId: "financetrako",
  storageBucket: "financetrako.appspot.com",
  messagingSenderId: "995983930373",
  appId: "1:995983930373:web:be0884b06e2b3ada1d986c",
  measurementId: "G-8HHSTBZJ8Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };