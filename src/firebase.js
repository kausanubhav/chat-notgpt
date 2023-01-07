import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA12lkkGIX4V93WftZzTldstTfPv8jzfoM",
  authDomain: "chat-ngpt-b9302.firebaseapp.com",
  projectId: "chat-ngpt-b9302",
  storageBucket: "chat-ngpt-b9302.appspot.com",
  messagingSenderId: "827947743826",
  appId: "1:827947743826:web:a571e19e22bcd3873e3d8b",
  measurementId: "G-MWR615HHHF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const storage = getStorage();
export const db=getFirestore();