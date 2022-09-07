import { db } from "./firebaseConfig.js"
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";

/* Tools */
function c(data) { console.log(data) }
function reloadPage() {document.location.reload(true)}

/* Variables */
const auth = getAuth();
const leftBtn = document.querySelector("#leftBtn") 

/* hear click on button */
function listenerBtn(){
    leftBtn.onclick = event => left()
}

/* Disconnect user */
function left(){
    signOut(auth)
    .then(() => window.location.href = ('login.html'))
    .catch((error) => c(error));
}

/* redirect if user isn't logged */
function isLogged(){
    setInterval(() => {
        getAuth()
        .onAuthStateChanged(user => {
            if(!user && window.location.href.indexOf("login.html") == -1){
                    window.location.href = ('login.html')
            }
        })
    }, 500);
}

/* When HTML load */
document.body.onload = event => {
    listenerBtn()
    isLogged()
}
