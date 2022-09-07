import { db } from "./firebaseConfig.js"
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";

/* Variables */
const googleBtn = document.querySelector("#loginWithGoogle")
const loginBtn = document.querySelector("#loginWithEmail")
const auth = getAuth();
const messages = {
    islogged:  ()=>  c(alert("Usuário logado com suceso!")),
    isntlogged:  ()=>  c(alert("Usuario não autorizado! Por favor tente novamente ou entre em contato com o suporte")),
    noDatas: ()=> c(alert(`Favor informar um email e senha!`))
}
function noRedirect(event) {
    event.preventDefault()
    event.stopPropagation()
}

/* tools */
function c(data) { console.log(data) }
function reloadPage() {document.location.reload(true)}

/* hear click on button */
function buttonsListeners(){
    function haveDatas(){
        const emailData = document.querySelector("#emailInput").value
        const passwordData = document.querySelector("#passwordInput").value

        if(emailData == "" && passwordData == ""){
            messages.noDatas()
            return false
        }else{
            return true
        }
    }

    loginBtn.onclick = event => {
        noRedirect(event)
        if(haveDatas() == true){
            const email = document.querySelector("#emailInput").value
            const password = document.querySelector("#passwordInput").value

            loginWithEmail(email, password)
        }
    }

    googleBtn.onclick = event => {
        noRedirect(event)
        loginWithGoogle()
    }
}

function findUser(userId){
    if(userId == "AXBJ1RgBghVZHxi40AgeFJeWBFA2"){
        return true
    }else if(userId == "3HMoMBE0xwMrsFfRwnTwRsk93wJ2"){
        return true
    }else{
        return false
    }
}

/* login with email */
function loginWithEmail(email, password){
    signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
        const userId = result.user.uid
        
        if(findUser(userId) === true){
            messages.islogged()
            window.location.href = ('admin.html')
        }else{
            c(userId)
            messages.isntlogged()
        }
        
    })
    .catch(()=> messages.isntlogged()); 
}

function loginWithGoogle(){
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
        const userId = result.user.uid
        
        if(findUser(userId) === true){
            messages.islogged()
            window.location.href = ('admin.html')
        }else{
            c(userId)
            messages.isntlogged()
        }
        
    })
    .catch(()=> messages.isntlogged()); 
}

/* redirect if user is logged */
function isLogged(){
    setInterval(() => {
        getAuth().onAuthStateChanged(user => {
            try{
                if(findUser(user.uid) === true && window.location.href.indexOf("admin.html") == -1) {window.location.href = ('admin.html')}
            }catch{}
        })
    }, 500);
}

/* When HTML load */
document.body.onload = event => {
    buttonsListeners()
    isLogged()
}