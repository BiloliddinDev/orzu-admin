import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDEiturXJLwe5Iu45YSCr4rvw_scpltMxI",
  authDomain: "orzu-traval.firebaseapp.com",
  projectId: "orzu-traval",
  storageBucket: "orzu-traval.firebasestorage.app",
  messagingSenderId: "979868148670",
  appId: "1:979868148670:web:ba380ef683fdc1c831cfef",
  measurementId: "G-DF3QD5YHDH",
  databaseURL: "https://orzu-traval.firebaseio.com",
};

const app = initializeApp(firebaseConfig);

const DB = getFirestore(app);
const Auth = getAuth(app);
const RealtimeDB = getDatabase(app);

export { DB, Auth, RealtimeDB };
export default app;
