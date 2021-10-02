import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyACP1WiftqdhU3aKmXDNJN8QVwXOi5qGJw",
    authDomain: "orh-storage12g.firebaseapp.com",
    databaseURL: "https://orh-storage12g-default-rtdb.firebaseio.com",
    projectId: "orh-storage12g",
    storageBucket: "orh-storage12g.appspot.com",
    messagingSenderId: "182342108421",
    appId: "1:182342108421:web:bea5bc43f9c49a57bf636c"
  };
const firebase = initializeApp(firebaseConfig) 
export default firebase