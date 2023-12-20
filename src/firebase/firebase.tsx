import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAl-G9XIYeKZRiP8lAAjal5GNLtXQj4ZCs",
  authDomain: "education-dbe41.firebaseapp.com",
  projectId: "education-dbe41",
  storageBucket: "education-dbe41.appspot.com",
  messagingSenderId: "524763006603",
  appId: "1:524763006603:web:3cc615c25ea5e8424cb68e",
  measurementId: "G-V6LE37NRTX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };