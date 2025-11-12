import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQE5rZ4lrqyfqp7Z1DE2F58YvO4H2prC4",
  authDomain: "clientlisting01.firebaseapp.com",
  projectId: "clientlisting01",
  storageBucket: "clientlisting01.firebasestorage.app",
  messagingSenderId: "589170277063",
  appId: "1:589170277063:web:aae522938f0dbc7c719ce2",
  measurementId: "G-72MFZTYD0W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;

