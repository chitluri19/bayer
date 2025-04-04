import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDsMhBUd_8i4kH4vjCcPa9VF8anWV4nEe4",
    authDomain: "test-791bf.firebaseapp.com",
    databaseURL: "https://test-791bf-default-rtdb.firebaseio.com",
    projectId: "test-791bf",
    storageBucket: "test-791bf.firebasestorage.app",
    messagingSenderId: "430670891744",
    appId: "1:430670891744:web:8c74c5687f9719cf175e85",
    measurementId: "G-FGZDMDXP9G"
  };
  

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
