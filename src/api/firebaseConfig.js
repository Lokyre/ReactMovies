// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCVhXtUK9Ah1jZMZQHZb0WIzFvIW1htDFo",
    authDomain: "moviepage-36f00.firebaseapp.com",
    projectId: "moviepage-36f00",
    storageBucket: "moviepage-36f00.appspot.com",
    messagingSenderId: "784839241853",
    appId: "1:784839241853:web:7e767aec719ee20facc114",
    measurementId: "G-CC7NVDY85F"
  };

// Inicializa Firebase
    const app = initializeApp(firebaseConfig);


export const firestore = getFirestore(app);
export const auth = getAuth(app);
