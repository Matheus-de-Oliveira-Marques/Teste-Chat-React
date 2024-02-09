// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDei4oGmdW326zVKHU_U0F_uqqmvgUUOhM",
  authDomain: "live-chat-334a5.firebaseapp.com",
  projectId: "live-chat-334a5",
  storageBucket: "live-chat-334a5.appspot.com",
  messagingSenderId: "470226960739",
  appId: "1:470226960739:web:2a1a123318697a9ad11356",
  measurementId: "G-QRLNNTXYPG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
