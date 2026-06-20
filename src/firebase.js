import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLCBp8L2GrYHvhEzYOkdtmpdsmzgmhTm8",
  authDomain: "tabungan-digital-42064.firebaseapp.com",
  projectId: "tabungan-digital-42064",
  storageBucket: "tabungan-digital-42064.firebasestorage.app",
  messagingSenderId: "491914562952",
  appId: "1:491914562952:web:4fcec63b1447604171fe3d",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);