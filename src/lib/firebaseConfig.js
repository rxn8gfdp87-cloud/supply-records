import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAODt6bUbWPPlXzgwNXsPYwT00yCcLZ4Y0",
  authDomain: "supply-records-61842.firebaseapp.com",
  databaseURL: "https://supply-records-61842-default-rtdb.firebaseio.com",
  projectId: "supply-records-61842",
  storageBucket: "supply-records-61842.firebasestorage.app",
  messagingSenderId: "510161158069",
  appId: "1:510161158069:web:41b963e3b620365acee3fc",
  measurementId: "G-S3VGD01QT5"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export { db }
