import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection, getDoc, setDoc } from 'firebase/firestore';

const FBapp = initializeApp({
  apiKey : process.env.apiKey,
  authDomain : process.env.authDomain,
  databaseURL : process.env.databaseURL,
  projectId : process.env.projectId,
  storageBucket : process.env.storageBucket,
  messagingSenderId : process.env.messagingSenderId,
  appId : process.env.appId,
});

const db = getFirestore(FBapp);

export {
  db,
  collection,
  getDoc,
  setDoc,
  doc
}