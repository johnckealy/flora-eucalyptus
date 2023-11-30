import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA0W2uyD8O2L3bcl4NnJrO9rBpOsr7wdVU',
  authDomain: 'flora-plant-tender.firebaseapp.com',
  projectId: 'flora-plant-tender',
  storageBucket: 'flora-plant-tender.appspot.com',
  messagingSenderId: '34277267805',
  appId: '1:34277267805:web:91f9ee30ded421b66230b4'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
