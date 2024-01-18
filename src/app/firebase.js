// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "food-share-83948.firebaseapp.com",
  projectId: "food-share-83948",
  storageBucket: "food-share-83948.appspot.com",
  messagingSenderId: "154529058280",
  appId: "1:154529058280:web:c008037aed2f84efdfe85d",
  measurementId: "G-2MKXEVM1Q6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();