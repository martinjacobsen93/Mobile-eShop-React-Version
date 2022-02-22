import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyC4gQlrriPg29ds6F6oIPPm7H9tXhGlGe4",
  authDomain: "mobile-sales-600cc.firebaseapp.com",
  projectId: "mobile-sales-600cc",
  storageBucket: "mobile-sales-600cc.appspot.com",
  messagingSenderId: "1035493164601",
  appId: "1:1035493164601:web:5554b7cb229a978ce46fe8"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const storage = getStorage(app);
export default db;