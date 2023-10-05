import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZmbSBtGRaC-AFfwyWS4lseUSup6EXi3Q",
  authDomain: "crwn-clothing-db-76ee9.firebaseapp.com",
  projectId: "crwn-clothing-db-76ee9",
  storageBucket: "crwn-clothing-db-76ee9.appspot.com",
  messagingSenderId: "971169406118",
  appId: "1:971169406118:web:e07aed34636e756f95a867",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const auth = getAuth();
export const signWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  // console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef);
  // console.log(userSnapShot);
  // console.log(userSnapShot.exists());

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error while creating user", error.message);
    }
  } else {
    console.log("user already exits");
  }
};
