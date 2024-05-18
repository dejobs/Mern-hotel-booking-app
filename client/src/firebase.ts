// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export type FirebaseType = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

const firebaseConfig: FirebaseType = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-hotel-booking-app-85285.firebaseapp.com",
  projectId: "mern-hotel-booking-app-85285",
  storageBucket: "mern-hotel-booking-app-85285.appspot.com",
  messagingSenderId: "241316512126",
  appId: "1:241316512126:web:d798b136010b3eee6ff32f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
