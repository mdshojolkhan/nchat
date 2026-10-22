// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClIPD7vmuJhFKVYn1yDCpK0R1YC_eRnio",
  authDomain: "nchat-2cc6e.firebaseapp.com",
  projectId: "nchat-2cc6e",
  storageBucket: "nchat-2cc6e.firebasestorage.app",
  messagingSenderId: "1030278616296",
  appId: "1:1030278616296:web:9b7e7887a75c870334e55d",
  measurementId: "G-BPPZL87K1H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
