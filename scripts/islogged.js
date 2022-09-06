import { db } from "./firebaseConfig.js"
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";

function c(data) { console.log(data) }
function reloadPage() {document.location.reload(true)}

const auth = getAuth();
const leftBtn = document.querySelector("#leftBtn") 

leftBtn.onclick = event => {
    left()
}

function left(){
    signOut(auth)
    .then(() => {
        window.location.href = ('admin.html')        })
    .catch((error) => {
        c(error)
    });
}

setInterval(() => {
    getAuth().onAuthStateChanged(user => {
        if(!user && window.location.href.indexOf("login.html") == -1){
                window.location.href = ('index.html')
        } 
    })
}, 500);