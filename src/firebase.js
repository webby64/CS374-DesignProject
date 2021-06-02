import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAmWzB_oCutlS86ZZNKVQSA_TVSQmc8H5c",
    authDomain: "web-dev-simp-1ef96.firebaseapp.com",
    projectId: "web-dev-simp-1ef96",
    storageBucket: "web-dev-simp-1ef96.appspot.com",
    messagingSenderId: "288514372783",
    appId: "1:288514372783:web:e0927936859aae2028505a"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const db = firebase.firestore();


export default app;