import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

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

// Load user details
async function loadUserDetails() {
    const user = auth.currentUser;
    if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid)); // Fetch user details
        if (userDoc.exists()) {
            const userData = userDoc.data();
            document.getElementById('user-name').innerText = userData.name;
            document.getElementById('user-mobile').innerText = userData.mobile;
            document.getElementById('user-email').innerText = userData.email;
            document.getElementById('user-dob').innerText = userData.dob;
            document.getElementById('user-image').src = userData.image || 'default-image-url';
        } else {
            console.error('No user data found.');
        }
    } else {
        console.error('User not logged in.');
    }
}

// Redirect to the edit page when the Edit button is clicked
document.getElementById('edit-button').addEventListener('click', function() {
    window.location.href = 'edit-profile.html'; // Redirect to the edit profile page
});

// Load user details when the page loads
loadUserDetails();

// Function to handle logout
document.getElementById('logout').addEventListener('click', function() {
    signOut(auth).then(() => {
        alert('Logged out successfully!'); // Notify user of successful logout
        window.location.href = 'index.html'; // Redirect to login page
    }).catch((error) => {
        console.error('Error logging out:', error.message); // Log any error
    });
});
