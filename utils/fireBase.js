import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYkMNoQJm0L_AbLzz6h5qklpXuJ7oQRd0",
  authDomain: "ecomm-4f1f2.firebaseapp.com",
  projectId: "ecomm-4f1f2",
  storageBucket: "ecomm-4f1f2.appspot.com",
  messagingSenderId: "1056472236370",
  appId: "1:1056472236370:web:44af783c0d1c683d14fa8b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp