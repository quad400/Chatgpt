import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyBV-ooo61EW1ZaA8-95rmsN_bK93Ec8qaQ",
    authDomain: "chatgpt-56242.firebaseapp.com",
    projectId: "chatgpt-56242",
    storageBucket: "chatgpt-56242.firebasestorage.app",
    messagingSenderId: "548507119151",
    appId: "1:548507119151:web:72225649da6f4aba59a0da",
    measurementId: "G-T0SX3F9XZ6"
  };
  
  

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);