import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
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
async function loadUserDetails(user) {
    console.log("Current User:", user); // Log the authenticated user
    if (user) {
        try {
            const userDoc = await getDoc(doc(db, "users", user.uid)); // Fetch user details
            console.log("Fetching user document for UID:", user.uid); // Log the UID
            if (userDoc.exists()) {
                const userData = userDoc.data();
                document.getElementById('user-name').innerText = userData.name || '___________';
                document.getElementById('user-mobile').innerText = userData.mobile || '___________';
                document.getElementById('user-email').innerText = userData.email || '___________';
                document.getElementById('user-dob').innerText = userData.dob || '___________';
            } else {
                console.error('No user data found.');
            }
        } catch (error) {
            console.error("Error fetching user data:", error); // Log any error during fetching
        }
    } else {
        console.error('User not logged in.');
        window.location.href = 'login.html'; // Redirect to login page if not logged in
    }
}

// Load stored users
async function loadStoredUsers() {
    try {
        const userListElement = document.getElementById('user-list');
        const userCollection = collection(db, "users");
        const userSnapshot = await getDocs(userCollection);
        
        userListElement.innerHTML = ''; // Clear existing list
        console.log("Fetching users from Firestore...");
        userSnapshot.forEach((doc) => {
            const userData = doc.data();
            console.log("User Data:", userData); // Log each user data
            const listItem = document.createElement('li');
            listItem.textContent = `${userData.name} (Email: ${userData.email})`;
            userListElement.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error fetching stored users:", error);
    }
}

// Redirect to the edit page when the Edit button is clicked
document.getElementById('edit-button').addEventListener('click', function() {
    window.location.href = 'edit-profile.html'; // Redirect to the edit profile page
});

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
    loadUserDetails(user); // Load user details if authenticated
    loadStoredUsers(); // Load stored users when the page loads
});

// Function to handle logout
document.getElementById('logout').addEventListener('click', function() {
    signOut(auth).then(() => {
        alert('Logged out successfully!'); // Notify user of successful logout
        window.location.href = 'index.html'; // Redirect to login page
    }).catch((error) => {
        console.error('Error logging out:', error.message); // Log any error
    });
});
