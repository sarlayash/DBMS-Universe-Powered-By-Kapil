// Firebase Configuration & Google Authentication Service
// Powered By Kapil | SarlaYash Mission Productions
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAstcnj56SBaIsdtXhUJBpssCRyQeyE19o",
  authDomain: "dbms-universe-powered-by-37c90.firebaseapp.com",
  projectId: "dbms-universe-powered-by-37c90",
  storageBucket: "dbms-universe-powered-by-37c90.firebasestorage.app",
  messagingSenderId: "723719584835",
  appId: "1:723719584835:web:a86d732e919951021828f6",
  measurementId: "G-PWXVDXZ6JJ"
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Google Sign-In with Popup
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return {
      success: true,
      user: {
        name: user.displayName || 'Google Learner',
        email: user.email || 'learner@gmail.com',
        photoURL: user.photoURL || null,
        uid: user.uid,
        learningId: `SY-DBMS-${user.uid.slice(0, 8).toUpperCase()}`,
        isGoogleAuth: true
      }
    };
  } catch (error) {
    console.error('Firebase Google Sign-In Error:', error);
    return {
      success: false,
      error: error.message,
      code: error.code
    };
  }
}

// Sign Out
export async function logoutUser() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Firebase Sign-Out Error:', error);
    return { success: false, error: error.message };
  }
}

// Subscribe to Auth State Changes
export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      callback({
        name: user.displayName || 'Google Learner',
        email: user.email || 'learner@gmail.com',
        photoURL: user.photoURL || null,
        uid: user.uid,
        learningId: `SY-DBMS-${user.uid.slice(0, 8).toUpperCase()}`,
        isGoogleAuth: true
      });
    } else {
      callback(null);
    }
  });
}
