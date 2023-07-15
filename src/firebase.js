// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyA8dcRupd9jhX9C4ktYaz8cBx2bjKr3HuQ',
    authDomain: 'ego-baby.firebaseapp.com',
    projectId: 'ego-baby',
    storageBucket: 'ego-baby.appspot.com',
    messagingSenderId: '244423620870',
    appId: '1:244423620870:web:b1864e4142837ac0630687',
    measurementId: 'G-Q475ZXKWJQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default analytics;
