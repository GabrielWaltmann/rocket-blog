import { db } from "./firebaseConfig.js"

import { getFirestore, collection, addDoc, setDoc, doc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";

let database = []

onSnapshot(collection(db, "posts"), (doc) => {
    database = []
    doc.forEach(data => database.push(data.data()));
})


function readDatas(database) {

    database.forEach(post => {
        const table = document.querySelector("#posts table")

        const row = table.insertRow(1);

        const id = row.insertCell(0);

        const title = row.insertCell(1);

        id.innerHTML = post.id
        title.innerHTML = post.title

        editDatas(id.parentElement, post)

    })

}

function editDatas(element, post) {
    element.onclick = event => {
        const id = (event.target.parentElement.children[0].innerHTML)
        insertTextArea(post, id)
    }
}

function insertTextArea(post, id) {
    document.body.innerHTML +=
        `<div class="position-absolute p-5 rounded-4" id="editor">
        <h2>Editar Informações:</h2>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Título</label>
            <input type="email" class="form-control" id="inputData" value="${post.title}">
        </div>
        <div class="mb-3">
            <label for="textarea" class="form-label">Conteudo</label>
            <textarea class="form-control" id="textarea" rows="3"  >${post.content}</textarea>
        </div>

        <button class="btn btn-outline-primary rounded-3" id="saveBtn">Salvar</button>
        <button class="btn btn-outline-primary rounded-3" id="cancelBtn">Cancelar</button>
    </div>`
    listener(id)

}

function listener(id) {
    const saveBtn = document.querySelector('#saveBtn')
    const cancelBtn = document.querySelector('#cancelBtn')

    saveBtn.onclick = event => {
        const title = document.querySelector("#inputData").value
        const content = document.querySelector("textarea").value

        updateDatas(title, content, id)
    }

    cancelBtn.onclick = event => document.location.reload(true)


}

async function updateDatas(title, content, id) {
    await setDoc(doc(db, "posts", id), {
        title: title,
        content: content
    }, { merge: true })

    document.location.reload(true)
}

async function addDatas(title, content, id) {
    await setDoc(doc(collection(db, "posts")), {
        title: title,
        content: content,
        id: id
    });

    document.location.reload(true)

}

setTimeout( () => {
    readDatas(database)
    document.querySelector("#createBtn").onclick = event =>{
            document.body.innerHTML +=
        `<div class="position-absolute p-5 rounded-4" id="editor">
        <h2>Editar Informações:</h2>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Título</label>
            <input type="email" class="form-control" id="inputData" value="">
        </div>
        <div class="mb-3">
            <label for="textarea" class="form-label">Conteudo</label>
            <textarea class="form-control" id="textarea" rows="3"  ></textarea>
        </div>

        <button class="btn btn-outline-primary rounded-3" id="saveBtn">Salvar</button>
        <button class="btn btn-outline-primary rounded-3" id="cancelBtn">Cancelar</button>
    </div>`



    const saveBtn = document.querySelector('#saveBtn')
    const cancelBtn = document.querySelector('#cancelBtn')


    saveBtn.onclick = event => {
        const title = document.querySelector("#inputData").value
        const content = document.querySelector("textarea").value
        let id = new Date();
        id = id.getTime();
        addDatas(title, content, id)}

    }



}, 500);