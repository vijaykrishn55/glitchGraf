import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your Firebase config (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyCmO4gLIXiXAHSHEjEuriJgwfDANQt7PHY",
  authDomain: "ar-glitch.firebaseapp.com",
  projectId: "ar-glitch",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const db = getFirestore(app);
export const auth = getAuth(app);

// Optional: Enable Firestore emulator for local testing (delete in production)
import { connectFirestoreEmulator } from "firebase/firestore";
if (window.location.hostname === "localhost") {
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
}