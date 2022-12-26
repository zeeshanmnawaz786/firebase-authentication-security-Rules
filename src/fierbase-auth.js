import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTEMUgeHPmQdebUfJ_e5w5BY6chgGVF-U",
  authDomain: "fir-post-9537e.firebaseapp.com",
  projectId: "fir-post-9537e",
  storageBucket: "fir-post-9537e.appspot.com",
  messagingSenderId: "886096334362",
  appId: "1:886096334362:web:20d8cce89bcf078186cba3",
  measurementId: "G-B6WX5Z1XYC",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { app, auth, db, signOut };
