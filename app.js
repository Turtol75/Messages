// Import Firebase modules from CDN (browser-compatible)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } 
  from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, push, onChildAdded } 
  from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBNG87htpHqMe3HRM-F9ftl5z01HHiwMJQ",
  authDomain: "messages-acce7.firebaseapp.com",
  databaseURL: "https://messages-acce7-default-rtdb.firebaseio.com",
  projectId: "messages-acce7",
  storageBucket: "messages-acce7.firebasestorage.app",
  messagingSenderId: "471730472939",
  appId: "1:471730472939:web:2c64f611e6a0d96b57bbae",
  measurementId: "G-B0EZ3WYCRF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const analytics = getAnalytics(app);
