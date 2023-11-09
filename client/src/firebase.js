// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "smptti.firebaseapp.com",
  projectId: "smptti",
  storageBucket: "smptti.appspot.com",
  messagingSenderId: "387211582874",
  appId: "1:387211582874:web:51eaea7dafa954057b2e23"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);