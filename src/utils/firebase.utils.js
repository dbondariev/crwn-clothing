import { initializeApp } from "firebase/app"; // Importing the functions you need from the SDKs you need
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword, // the native provider for sign-up
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged, // this returns a listener so that it can be used with context
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// // My web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9IodBpoAIG5UM3ko313DDfaVVhocKuR4",
  authDomain: "crwn-clothing-db-6749f.firebaseapp.com",
  projectId: "crwn-clothing-db-6749f",
  storageBucket: "crwn-clothing-db-6749f.appspot.com",
  messagingSenderId: "37029458171",
  appId: "1:37029458171:web:68a72afcf39bc010bdc05e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inintializing google provider instance
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  promt: "select_account", // forcing the user to select google account
});

export const auth = getAuth(); // keep track of users inside the entire Application

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
// or it can be used with GoogleRedirect

// -----------FireStore----------- //
// using getFireStore() to access the database
export const db = getFirestore();
// creating data collection

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db); // creating a batch instance in the database to insure that the transaction is [ACID]

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase()); // creating a document Ref(key) for each object in the shop-data
    batch.set(docRef, object); // connecting the ref with the object
  });

  await batch.commit();
  console.log("done");
};

// steps are from firebase
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");

  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

// GOOGLE SIGN-UP (CREATING A NEW USER )
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {} // to add displayName or other info if not added or null
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  // check if the user is in the database or not
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      // setting a document for the new user
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userSnapshot; // if user already exists
};

// NATIVE SIGN-UP (CREATING A NEW USER )
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// NATIVE SIGN-in
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// SIGN OUT
export const signOutUser = async () => await signOut(auth);

// OBSERVER PATTERN
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};

// -------------------------------------------------------

// Converting AuthChanged Listener into a Promise
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    // method from firebase-auth
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        // now we have the value of userAuth status
        unsubscribe(); // anyway we first unsubscribe -> to close the listener (fix memory-leak)
        resolve(userAuth);
      },
      reject
    );
  });
};
