const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./skipli-test-firebase-adminsdk-h2wza-531a6dc02d.json");

// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyDojITAxcXmLiqOIPF7cXnZq0PAxsq5IOM",
  authDomain: "skipli-test.firebaseapp.com",
  projectId: "skipli-test",
  storageBucket: "skipli-test.appspot.com",
  messagingSenderId: "185436079923",
  appId: "1:185436079923:web:868503fb849ec69b286046",
  credential: cert(serviceAccount),
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/**
 * @param {FirebaseFirestore.Firestore} db
 */
const db = getFirestore(app);

module.exports = db;
