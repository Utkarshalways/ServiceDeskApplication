// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-F70T_xFDv6ChUPCWd0_YJyxS9YGqQlc",
  authDomain: "service-deskapplication.firebaseapp.com",
  projectId: "service-deskapplication",
  storageBucket: "service-deskapplication.appspot.com",
  messagingSenderId: "290297060658",
  appId: "1:290297060658:web:7d05c246c6cdded2968b2b",
  measurementId: "G-T3K0VGTDPN",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);