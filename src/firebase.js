import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAn04_DUg1hEuQuJIN-28csIg1dKa4s1No",
  authDomain: "quickchat-9fb25.firebaseapp.com",
  projectId: "quickchat-9fb25",
  storageBucket: "quickchat-9fb25.appspot.com",
  messagingSenderId: "515368390566",
  appId: "1:515368390566:web:6631804c72c1c5fd72c967",
  measurementId: "G-7KEP4JRVYB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()