// 🔹 Import Firebase modules from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
  getDatabase, ref, push, onChildAdded, onChildRemoved 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

// 🔹 Firebase configuration
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

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const analytics = getAnalytics(app);

// 🔹 DOM elements
const loginSection = document.getElementById("login-section");
const chatSection = document.getElementById("chat-section");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");

// 🔹 Sign Up
document.getElementById("signupBtn").onclick = () => {
  createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
    .catch(err => alert(err.message));
};

// 🔹 Login
document.getElementById("loginBtn").onclick = () => {
  signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
    .catch(err => alert(err.message));
};

// 🔹 Logout
document.getElementById("logoutBtn").onclick = () => {
  signOut(auth).catch(err => alert(err.message));
};

// 🔹 Listen for auth state changes
onAuthStateChanged(auth, user => {
  if (user) {
    loginSection.style.display = "none";
    chatSection.style.display = "block";

    const msgRef = ref(db, "messages");

    // 🔹 Display messages
    onChildAdded(msgRef, data => {
      const msg = data.val();
      const msgElement = document.createElement("p");
      msgElement.innerHTML = `<b>${msg.user}</b>: ${msg.text}`;
      msgElement.id = data.key;
      messagesDiv.appendChild(msgElement);
      messagesDiv.scrollTop = messagesDiv.scrollHeight; // auto-scroll
    });

    // 🔹 Remove messages from DOM when deleted
    onChildRemoved(msgRef, data => {
      const removedMsg = document.getElementById(data.key);
      if (removedMsg) removedMsg.remove();
    });

    // 🔹 Send message
    document.getElementById("sendBtn").onclick = () => {
      if (messageInput.value.trim() === "") return;

      const newMsgRef = push(msgRef, {
        user: user.email,
        text: messageInput.value
      });

      messageInput.value = "";

      // 🔹 Delete after 15 seconds
      setTimeout(() => {
        newMsgRef.remove().catch(err => console.error("Failed to delete message:", err));
      }, 15000);
    };

  } else {
    // Not logged in
    loginSection.style.display = "block";
    chatSection.style.display = "none";
  }
});
