
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCkQKa2opnixCJpzXPL-VNx_BdHCDDvX3U",
  authDomain: "car-rental-50277.firebaseapp.com",
  projectId: "car-rental-50277",
  storageBucket: "car-rental-50277.appspot.com", // Corrected storage bucket URL
  messagingSenderId: "570520746497",
  appId: "1:570520746497:web:3947f5a5833fc6ff5e9e00",
  measurementId: "G-2FJV0S37F1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
