// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
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
const db = getFirestore(app);

// Handle new post submission
document.getElementById('newPostForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form from reloading the page

    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();

    // Check if title or content is empty
    if (title === '' || content === '') {
        alert('Title and content cannot be empty.');
        return;
    }

    // Generate a unique ID based on the title and timestamp
    const uniqueId = title.replace(/\s+/g, '-').toLowerCase() + "_" + Date.now();

    try {
        // Add new post to Firestore with a custom document ID
        await setDoc(doc(db, "posts", uniqueId), {
            title: title,
            content: content,
        });
        alert('Post published!'); // Notify user
        document.getElementById('newPostForm').reset(); // Reset form
    } catch (error) {
        console.error('Error adding post:', error.message);  // Log error if the post fails to add
    }
});
