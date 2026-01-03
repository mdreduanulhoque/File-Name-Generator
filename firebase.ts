// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBYxSTJqLfR169RwNejT6LlOWH-ZCKLHpk",
    authDomain: "filenamegenerator-74e8b.firebaseapp.com",
    projectId: "filenamegenerator-74e8b",
    storageBucket: "filenamegenerator-74e8b.firebasestorage.app",
    messagingSenderId: "421262765354",
    appId: "1:421262765354:web:9be6e371217a2871910253",
    measurementId: "G-CRRKJMJ0MC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Firebase instances
export { app, analytics };
