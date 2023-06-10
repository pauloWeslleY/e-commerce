// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyD1XVSV6mdFhAlg8Uez5nTwph_Wg8bjqog',
  authDomain: 'e-commerce-9ad1c.firebaseapp.com',
  projectId: 'e-commerce-9ad1c',
  storageBucket: 'e-commerce-9ad1c.appspot.com',
  messagingSenderId: '319648510361',
  appId: '1:319648510361:web:394d7a039e835f37f26308',
  measurementId: 'G-FL9MEL83HK',
}

// Initialize Firebase
// const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
