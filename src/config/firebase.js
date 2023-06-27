import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API,
  authDomain: "itrade-a9aa1.firebaseapp.com",
  projectId: "itrade-a9aa1",
  storageBucket: "itrade-a9aa1.appspot.com",
  messagingSenderId: "333360988249",
  appId: "1:333360988249:web:c4c03faee5ed0bd8a87148"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);