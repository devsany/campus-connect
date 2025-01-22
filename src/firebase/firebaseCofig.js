// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkPx6g_w4-gBVlIwB2Hk2L2GxsSHFx4qs",
  authDomain: "react-firebase-300ff.firebaseapp.com",
  databaseURL:
    "https://react-firebase-300ff-default-rtdb.asia-southeast1.firebasedatabase.app/", // Add the Realtime Database URL
  projectId: "react-firebase-300ff",
  storageBucket: "react-firebase-300ff.firebasestorage.app",
  messagingSenderId: "1042617267499",
  appId: "1:1042617267499:web:523b8afdd2878bd6fc416e",
  measurementId: "G-3MPV62XRXV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
