// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIiPD7vmuJHFKYVn1yDCpK0R1YC_cRnio",
  authDomain: "nchat-2cc6e.firebaseapp.com",
  projectId: "nchat-2cc6e",
  storageBucket: "nchat-2cc6e.firebasestorage.app",
  messagingSenderId: "1030278616296",
  appId: "1:1030278616296:web:9b7e7887a75c870334e55d",
  measurementId: "G-BPPZL87K1H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
