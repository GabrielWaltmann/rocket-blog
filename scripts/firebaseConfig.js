// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getFirestore, collection,  arrayRemove, setDoc, doc, arrayUnion, onSnapshot} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBsQrxpuK-feo9og-RR5sf5WAPZN_hJSZU",
  authDomain: "rocketblog.firebaseapp.com",
  databaseURL: "https://rocketblog-default-rtdb.firebaseio.com",
  projectId: "rocketblog",
  storageBucket: "rocketblog.appspot.com",
  messagingSenderId: "684684029769",
  appId: "1:684684029769:web:8941926e31f0f7561ff498"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

