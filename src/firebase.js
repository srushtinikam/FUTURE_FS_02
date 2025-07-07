// Import firebase functions
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';


// Paste your Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyAE2V_P0yO2cxBJpQBk8Z16ezO8ogtfcSo",
  authDomain: "mini-store-fs02.firebaseapp.com",
  projectId: "mini-store-fs02",
  storageBucket: "mini-store-fs02.firebasestorage.app",
  messagingSenderId: "47337791438",
  appId: "1:47337791438:web:3b2d530dd6a46ba793d59f",
  measurementId: "G-Z7W1QCP9CZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

