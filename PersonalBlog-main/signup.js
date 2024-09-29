// Import Firebase modules
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

// Firebase configuration (replace with your own)
const firebaseConfig = {
    apiKey: "AIzaSyBYn2rBNT1Lp4v-h2JQIL1yshCEnsuof8c",
    authDomain: "blog-44dcb.firebaseapp.com",
    projectId: "blog-44dcb",
    storageBucket: "blog-44dcb.appspot.com",
    messagingSenderId: "178560684307",
    appId: "1:178560684307:web:95e7ed7d25216ef219cae6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle Sign Up
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent page reload

    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Successful signup
            const user = userCredential.user;

            // Send email verification
            sendEmailVerification(user)
                .then(() => {
                    alert('Sign-up successful! A verification email has been sent to your email address. Please verify your email before logging in.');
                    // Optionally, redirect to the login page or clear the form
                    // window.location.href = 'index.html';
                });
        })
        .catch((error) => {
            // Handle errors
            document.getElementById('signup-error-message').innerText = error.message;
        });
});
