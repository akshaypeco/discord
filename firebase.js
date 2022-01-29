// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGjmUPLzq-16HDxP3wBsi-w7uDSfttcn4",
  authDomain: "discord-239f2.firebaseapp.com",
  projectId: "discord-239f2",
  storageBucket: "discord-239f2.appspot.com",
  messagingSenderId: "1002507681263",
  appId: "1:1002507681263:web:fa7eb8ed5d06057203ca1a",
  measurementId: "G-76P35LQ61W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export async function addClass(data) {
  try {
    await setDoc(
      doc(db, "classes", data.classname),
      {
        classname: data.classname.toUpperCase(),
        isBroken: false,
        lastUpdated: "Spring 2022",
      },
      { merge: true }
    );
  } catch (e) {
    console.error("Error adding class: ", e);
  }
}

export async function addMainLink(className, discord) {
  try {
    await setDoc(
      doc(db, "classes", className),
      {
        discordMainLink: discord,
      },
      { merge: true }
    );
  } catch (e) {
    console.error("Error adding main discord link: ", e);
  }
}

export async function getAllClasses() {
  const classes = [];
  const querySnapshot = await getDocs(collection(db, "classes"));
  querySnapshot.forEach((doc) => {
    classes.push(doc.data());
  });
  return classes;
}

export async function getClassData(className) {
  const classdets = [];
  const docRef = doc(db, "classes", className);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    classdets.push(docSnap.data());
  }
  return classdets;
}

export async function reportIssue(txt) {
  try {
    await addDoc(
      collection(db, "issues"),
      {
        issueMsg: txt,
      },
      { merge: false }
    );
  } catch (e) {
    console.error("Error adding issue:", e);
  }
}

export async function reportLink(className) {
  try {
    await setDoc(
      doc(db, "classes", className),
      {
        isBroken: true,
      },
      { merge: true }
    );
  } catch (e) {
    console.error("Error setting broken link: ", e);
  }
}
