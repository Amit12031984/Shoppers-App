
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import {getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD2Ug2fgiy_YTfo2Iu15PGjGbQj6jyE75U",
  authDomain: "shoppers-app-61b70.firebaseapp.com",
  projectId: "shoppers-app-61b70",
  storageBucket: "shoppers-app-61b70.appspot.com",
  messagingSenderId: "387293624931",
  appId: "1:387293624931:web:7ed0852a41439a84469656"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

//connect firestore
export const myDatabase = firebase.firestore();

export const auth = getAuth(app);
export const provider = new  GoogleAuthProvider();
