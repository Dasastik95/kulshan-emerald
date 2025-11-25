import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQFIC0TUkW5gIaCg4U7iE0_Bf7IfJtC1U",
  authDomain: "sagar-77bb1.firebaseapp.com",
  projectId: "sagar-77bb1",
  storageBucket: "sagar-77bb1.firebasestorage.app",
  messagingSenderId: "1044360136200",
  appId: "1:1044360136200:web:8e42d0200d04d4d24033bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;

