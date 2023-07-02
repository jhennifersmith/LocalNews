// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYO3AdUfpA4ew_Y1bALlP3UBWYQFp2Pak",
  authDomain: "noticiasapp-7fdb4.firebaseapp.com",
  projectId: "noticiasapp-7fdb4",
  storageBucket: "noticiasapp-7fdb4.appspot.com",
  messagingSenderId: "1004035879470",
  appId: "1:1004035879470:web:44e9694553ef1951db25bf",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
const analytics = getAnalytics(FIREBASE_APP);