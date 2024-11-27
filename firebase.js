import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://carrot-market-37bfd-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: 'gs://carrot-market-37bfd.firebasestorage.app',
  apiKey: "AIzaSyCxburIfsiR6d2M0t2pl33IBj8WpcBN8qY",
  authDomain: "carrot-market-37bfd.firebaseapp.com",
  projectId: "carrot-market-37bfd",
  messagingSenderId: "716390012988",
  appId: "1:716390012988:web:2f2afcd207d3bf4ca90b39",
  measurementId: "G-906DP9Y41D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

const auth = getAuth(app)