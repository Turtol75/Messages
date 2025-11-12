// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNG87htpHqMe3HRM-F9ftl5z01HHiwMJQ",
  authDomain: "messages-acce7.firebaseapp.com",
  projectId: "messages-acce7",
  storageBucket: "messages-acce7.firebasestorage.app",
  messagingSenderId: "471730472939",
  appId: "1:471730472939:web:e697627c13b4374457bbae",
  measurementId: "G-PGDEMTSELF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
