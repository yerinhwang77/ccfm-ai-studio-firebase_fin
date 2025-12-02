
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your actual Firebase project configuration
// You can find this in your Firebase Console -> Project Settings -> General -> "Your apps"
const firebaseConfig = {
  apiKey: "AIzaSyBobZ7IRwLdg-G_5xFdY1gJxC2ILkSstLE",
  authDomain: "ccfm-tool-studio.firebaseapp.com",
  projectId: "ccfm-tool-studio",
  storageBucket: "ccfm-tool-studio.firebasestorage.app",
  messagingSenderId: "1027814350458",
  appId: "1:1027814350458:web:bf601c037b4ca78e5ce5c3",
  measurementId: "G-TV5T3RMH93"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
