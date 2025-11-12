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
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } 
  from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, push, onChildAdded } 
  from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  // paste your config here
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const loginSection = document.getElementById("login-section");
const chatSection = document.getElementById("chat-section");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");

document.getElementById("signupBtn").onclick = () => {
  createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
    .catch(err => alert(err.message));
};

document.getElementById("loginBtn").onclick = () => {
  signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
    .catch(err => alert(err.message));
};

onAuthStateChanged(auth, user => {
  if (user) {
    loginSection.style.display = "none";
    chatSection.style.display = "block";
    const msgRef = ref(db, "messages");
    onChildAdded(msgRef, data => {
      const msg = data.val();
      messagesDiv.innerHTML += `<p><b>${msg.user}</b>: ${msg.text}</p>`;
    });

    document.getElementById("sendBtn").onclick = () => {
      push(ref(db, "messages"), {
        user: user.email,
        text: messageInput.value
      });
      messageInput.value = "";
    };
  }
});
