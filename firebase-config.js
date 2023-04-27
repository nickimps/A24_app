// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqtltNbg9b64i_OWsVn6S1DL2-MmypH8I",
  authDomain: "a24-checklist-5bb71.firebaseapp.com",
  projectId: "a24-checklist-5bb71",
  storageBucket: "a24-checklist-5bb71.appspot.com",
  messagingSenderId: "233478655935",
  appId: "1:233478655935:web:c2f2965746d92eb92f1b0a",
  measurementId: "G-TPP1B1118Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);
