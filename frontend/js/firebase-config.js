// Firebase Configuration
// Using COMPAT version (works in browser without build tools)
const firebaseConfig = {
  apiKey: "AIzaSyCH6JM_VTsSv9noR3DuRdmiNl9U6AP3pJ4",
  authDomain: "wellness-platform-a0297.firebaseapp.com",
  projectId: "wellness-platform-a0297",
  storageBucket: "wellness-platform-a0297.firebasestorage.app",
  messagingSenderId: "686403619858",
  appId: "1:686403619858:web:a1082f41c2328b46445ccb",
  measurementId: "G-EVS8G0C330"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Services
const auth = firebase.auth();
const db = firebase.firestore();

console.log('Firebase initialized successfully');
console.log('Auth and Firestore ready');

// Check Authentication State
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log('User logged in:', user.email);
        localStorage.setItem('userId', user.uid);
        localStorage.setItem('userEmail', user.email);
    } else {
        console.log('No user logged in');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        
        // Redirect to login if on protected page
        const publicPages = ['index.html', ''];
        const currentPage = window.location.pathname.split('/').pop();
        if (!publicPages.includes(currentPage)) {
            window.location.href = 'index.html';
        }
    }
});