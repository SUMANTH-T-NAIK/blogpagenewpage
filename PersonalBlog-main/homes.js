// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

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

// Function to load posts from Firestore
async function loadPosts() {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = ''; // Clear existing posts

    try {
        const querySnapshot = await getDocs(collection(db, "posts")); // Fetch posts from the "posts" collection
        console.log('Loading posts from Firestore:', querySnapshot.size); // Log number of posts found

        if (querySnapshot.empty) {
            console.log('No posts found.');
            postsContainer.innerHTML = '<p>No posts available.</p>';
            return;
        }

        querySnapshot.forEach((doc) => {
            const post = doc.data();
            console.log('Post loaded:', post); // Log each post

            // Create an HTML element for each post
            const postElement = document.createElement('div');
            postElement.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
            postsContainer.appendChild(postElement); // Add post to container
        });
    } catch (error) {
        console.error('Error loading posts:', error.message); // Log error message
    }
}

// Call loadPosts when the page loads
window.onload = loadPosts;



