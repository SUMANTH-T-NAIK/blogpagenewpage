// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Firebase configuration
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
const db = getFirestore(app);

// Check user authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User is signed in:', user.uid);
        // Load user details if needed or allow editing
    } else {
        alert('User is not authenticated. Please log in.');
        window.location.href = 'login.html'; // Redirect to login page
    }
});

// Get the current user ID
let currentUserId = null;
onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUserId = user.uid;
    }
});

// Function to handle user details save
document.getElementById('save-button').addEventListener('click', async function() {
    const name = document.getElementById('user-name').value.trim();
    const mobile = document.getElementById('user-mobile').value.trim();
    const email = document.getElementById('user-email').value.trim();
    const dob = document.getElementById('user-dob').value;

    // Validation: Check if all required fields are filled
    if (!name || !mobile || !email || !dob) {
        alert('Please fill in all fields.');
        return; // Exit if validation fails
    }

    try {
        // Prepare user data object
        const userData = {
            name: name,
            mobile: mobile,
            email: email,
            dob: dob,
            createdAt: new Date() // Optional: Add a timestamp
        };

        // Save user data to Firestore only if the user ID is available
        if (currentUserId) {
            await setDoc(doc(db, "users", currentUserId), userData); // Save to the document with user ID
            alert('Profile updated successfully!');
        } else {
            console.error('No user ID available. Cannot save profile.');
        }
    } catch (error) {
        console.error('Error saving profile:', error.message);
        alert('Error saving profile: ' + error.message); // Show error message
    }
});

// Cancel button functionality
document.getElementById('cancel-button').addEventListener('click', function() {
    window.location.href = 'profile.html'; // Redirect to profile page
});
