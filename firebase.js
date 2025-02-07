import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBDwCt973qhUxk1_5UqTNDy82pef2GQFcc",
  authDomain: "horaireurgence-a488f.firebaseapp.com",
  projectId: "horaireurgence-a488f",
  storageBucket: "horaireurgence-a488f.firebasestorage.app",
  messagingSenderId: "596792304337",
  appId: "1:596792304337:web:0dcd3e0b77b374343a9bf0",
  measurementId: "G-Z67Y8T809L"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
