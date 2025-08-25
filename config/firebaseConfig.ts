// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { getAuth, initializeAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkbO3h3gP_6RBpgl7jcVd9poF53gL-g4A",
  authDomain: "chatgpt-64415.firebaseapp.com",
  projectId: "chatgpt-64415",
  storageBucket: "chatgpt-64415.firebasestorage.app",
  messagingSenderId: "348621128135",
  appId: "1:348621128135:web:d2d523a5f05794bde719e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
