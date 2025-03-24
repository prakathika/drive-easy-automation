
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA43LUPb5Kkpmlyrm4iaghfJZeZMrRNKE0",
  authDomain: "driver-90447.firebaseapp.com",
  projectId: "driver-90447",
  storageBucket: "driver-90447.firebasestorage.app",
  messagingSenderId: "150961726312",
  appId: "1:150961726312:web:ad93b0d9926d78f5a6ecdd",
  measurementId: "G-ZJN5KNKWTN"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
