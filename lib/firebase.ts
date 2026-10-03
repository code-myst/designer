import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCs4xJg4Vaa8fWMXKq1yOA5rMr8jff0lbE",
  authDomain: "designersite.firebaseapp.com",
  projectId: "designersite",
  storageBucket: "designersite.firebasestorage.app",
  messagingSenderId: "987866658664",
  appId: "1:987866658664:web:5cc64f40e1620d315248dd",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);