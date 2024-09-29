// Import Firebase modules
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
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

/// Handle Login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent page reload

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Check if the user's email is verified
            if (user.emailVerified) {
                // Successful login
                alert('Login successful!');
                window.location.href = 'home.html';  // Redirect to homepage
            } else {
                alert('Please verify your email before logging in.');
                // Optionally, sign out the user
                auth.signOut();
            }
        })
        .catch((error) => {
            // Handle errors
            document.getElementById('login-error-message').innerText = error.message;
        });
});

// Function to map Firebase error codes to user-friendly messages
function mapErrorMessage(errorCode) {
    switch (errorCode) {
        case 'auth/invalid-email':
            return 'Please enter a valid email address.';
        case 'auth/user-disabled':
            return 'This user has been disabled.';
        case 'auth/user-not-found':
            return 'No user found with this email address.';
        case 'auth/wrong-password':
            return 'Incorrect password. Please try again.';
        case 'auth/invalid-credential':
            return 'Invalid credentials. Please check your details.';
        default:
            return 'Invalid credentials. Please check your details.';
    }
}


// Handle Forgot Password
document.getElementById('forgot-password').addEventListener('click', function(event) {
    event.preventDefault();  // Prevent page reload

    const email = document.getElementById('login-email').value;

    if (email) {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent
                alert('Password reset email sent! Please check your inbox.');
            })
            .catch((error) => {
                // Handle errors
                const errorCode = error.code;
                const errorMessage = error.message;
                document.getElementById('login-error-message').innerText = errorMessage;

                // Optionally log the error code for debugging
                console.error(`Error Code: ${errorCode}`, errorMessage);
            });
    } else {
        alert('Please enter your email address to reset your password.');
    }
});

// Toggle password visibility
document.getElementById('toggle-password').addEventListener('click', function() {
    const passwordInput = document.getElementById('login-password');
    const inputType = passwordInput.getAttribute('type');
    
    // Toggle the input type between 'password' and 'text'
    if (inputType === 'password') {
        passwordInput.setAttribute('type', 'text');
        this.textContent = '👁️'; // Change icon to open eye
    } else {
        passwordInput.setAttribute('type', 'password');
        this.textContent = '👁️'; // Change icon to closed eye
    }
});
