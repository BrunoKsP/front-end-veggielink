// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPSBeZKzrUiz1wtDZ5r0SUWiYFBbEcAyY",
  authDomain: "veggielink-f06d3.firebaseapp.com",
  projectId: "veggielink-f06d3",
  storageBucket: "veggielink-f06d3.appspot.com",
  messagingSenderId: "610244832175",
  appId: "1:610244832175:web:933f2a46c6a20a9f8a1d5a"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage };
