
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Replace with your actual Firebase project configuration
// You can find this in your Firebase Console -> Project Settings -> General -> "Your apps"
const firebaseConfig = {
  apiKey: "AIzaSyCCQpk67UVOvm4kawODxUWB1VOo8xSwX6c",
  authDomain: "ccfm-ai-studio-f905a.firebaseapp.com",
  projectId: "ccfm-ai-studio-f905a",
  storageBucket: "ccfm-ai-studio-f905a.firebasestorage.app",
  messagingSenderId: "690797959776",
  appId: "1:690797959776:web:ca50492a1b0e2ee14d8105",
  measurementId: "G-MZ6F92SKQ0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
