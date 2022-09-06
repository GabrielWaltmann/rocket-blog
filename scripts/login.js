import { db } from "./firebaseConfig.js"
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";

const googleBtn = document.querySelector("#loginWithGoogle")
const emailBtn = document.querySelector("#loginWithEmail")
const auth = getAuth();

/* tools */
function c(data) { console.log(data) }
function reloadPage() {document.location.reload(true)}

buttonsListeners()

function buttonsListeners(){

    function haveDatas(){
        const emailData = document.querySelector("#emailInput").value
        const passwordData = document.querySelector("#passwordInput").value

        if(emailData == "" && passwordData == ""){
            return false
            alert(`Favor informar um email e senha!`)
        }else{
            return true
        }
    }

    emailBtn.onclick = event => {
        event.preventDefault()
        event.stopPropagation()
        

        if(haveDatas() == true){
            const email = document.querySelector("#emailInput").value
            const password = document.querySelector("#passwordInput").value

            login(email, password)
        }
        
    }
}

function login(email, password){
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        alert("Usuário logado com suceso!")
        window.location.href = ('admin.html')
    })
    .catch((error) => {
        console.log(error)
    }); 
}




