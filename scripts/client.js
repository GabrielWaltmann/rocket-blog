import { db } from "./firebaseConfig.js"

import { collection, deleteDoc, setDoc, doc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";

/* tools */
function c(data) { console.log(data) }
function reloadPage() { document.location.reload(true) }

/* get updated datas*/
let database = []
onSnapshot(collection(db, "posts"), (doc) => {
    database = []
    doc.forEach(data => database.push(data.data()));
})

/* Return new cards */
function createCard(post) {
    const title = post.title
    const content = post.content
    const card = `      
    <div class="card col-md-4 m-0 border border-0">
        <img src="../images/post-1.png" alt="Representação da publicação">
        <h5 class="card-title">${title}</h5>
        <p class="card-text text-justify">${content}</p>
    </div>`

    return card
}

/* Show posts on sreen */
function showPosts() {
    const postsArea = document.querySelector("#cards")
    postsArea.innerHTML = ``

    database.forEach(post => {
        postsArea.innerHTML += createCard(post)
    })
}


function showFirstPost() {

    const postArea = document.getElementById("firstPost")

    database.forEach(post => {
        postArea.innerHTML = `
            <div class="col-md col-12">

                <h1>${post.title}</h1>

                <p>${post.content}</p>

                <a href="https://www.rocketseat.com.br/" class="link d-flex align-items-center my-md-0 gap-1 my-3">
                Veja mais
                <img src="../images/arrow-right.svg">
                </a>

            </div>
            <div class="d-flex col-md col-12 px-0 col-12
                align-items-center">
                    <img src="../images/featured-image.png" id="imgFirstPost" class="w-100" alt="representação de um notbook contendo códigos na tela">
            </div>
        `
    })


}



/* When HTML load */
document.body.onload = event => {
    setTimeout(() => {
        showPosts()
        showFirstPost()
    }, 1000);
}
