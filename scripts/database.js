import { db } from "./firebaseConfig.js"

import { collection, deleteDoc , setDoc, doc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";


/* get  datas */
let database = []
onSnapshot(collection(db, "posts"), (doc) => {
    database = []
    doc.forEach(data => database.push(data.data()));
})

/* tools */
function c(data) { console.log(data) }
function reloadPage() {document.location.reload(true)}

/* Show posts on screen */
function showPosts(database) {
    const table = document.querySelector("#posts table")

    function createHeader(){

        const titleHeader = document.createElement('th')
        const contentHeader = document.createElement('th')

        titleHeader.id = "tableTitle"
        contentHeader.id = "tableContent"

        titleHeader.innerHTML = "Title"
        contentHeader.innerHTML = "Content"
        
        table.appendChild(titleHeader)
        table.appendChild(contentHeader)
    }

    function showDatabase(){
        database.forEach(post => {
            const newRow = table.insertRow();
            const title = newRow.insertCell();
            const content = newRow.insertCell();
            const newTitle = document.createTextNode(post.title);
            const newContent = document.createTextNode(post.content);
            title.appendChild(newTitle);
            content.appendChild(newContent);
            newRow.className = "cell"
            newRow.id = post.id
        })
    }
    function cellListener(){
        let cells = document.querySelectorAll(".cell")
        cells = [...cells]

        for(let cell of cells){ cell.onclick = event => showeditor(cell.id) }
    }

    function createPostlistener(){
        const createBtn = document.querySelector("#createBtn")
        createBtn.onclick = event => {showeditor()}
    }
    
    createHeader()
    showDatabase()
    cellListener()
    createPostlistener()
}
/* Show editor when click in a button */
function showeditor(cellId){

    function getDatas(){
        const title = document.querySelector("#inputData").value
        const content = document.querySelector("#textarea").value
        return {title: title, content: content, id: cellId}
    }

    function buttonsListeners(post){
        const buttons = {
            save: document.querySelector("#saveBtn"),
            cancel: document.querySelector("#cancelBtn"),
            remove: document.querySelector("#removeBtn"),
            add: document.querySelector("#addBtn"),
        }


        if(post != undefined){
            buttons.remove.onclick = event => removePost(getDatas())
            buttons.save.onclick = event => updatePost(getDatas())
            buttons.cancel.onclick = event => reloadPage()
        }else{
            buttons.cancel.onclick = event => reloadPage()
            buttons.add.onclick = event => addPost(getDatas())
        }
    }

    function findObject(cellId) {
        let obj = undefined
        database.forEach(object => {if(object.id == cellId){ obj = object}}) 
        return obj

    }

    function insertEditor(post){
        if(post != undefined) {
            let post = findObject(cellId)
        
            document.body.innerHTML += `<div class="position-absolute p-5 rounded-4" id="editor"> <h2>Editar Informações </h2> <div class="mb-3"> <label for="exampleFormControlInput1" class="form-label">Título</label> <input type="email" class="form-control" id="inputData" value="${post.title}"> </div> <div class="mb-3"> <label for="textarea" class="form-label">Conteudo</label> <textarea class="form-control" id="textarea" rows="3"  >${post.content}</textarea> </div> <button class="btn btn-outline-primary rounded-3" id="saveBtn">Salvar</button> <button class="btn btn-outline-primary rounded-3" id="cancelBtn">Cancelar</button> <button class="btn btn-outline-primary rounded-3" id="removeBtn">remover</button> </div>`
            const saveBtn = document.querySelector('#saveBtn')
            const cancelBtn = document.querySelector('#cancelBtn')
            const removeBtn = document.querySelector('#removeBtn')

        } else {
            document.body.innerHTML += `<div class="position-absolute p-5 rounded-4" id="editor"> <h2>Editar Informações:</h2> <div class="mb-3"> <label for="exampleFormControlInput1" class="form-label">Título</label> <input type="email" class="form-control" id="inputData" value=""> </div> <div class="mb-3"> <label for="textarea" class="form-label">Conteudo</label> <textarea class="form-control" id="textarea" rows="3"  ></textarea> </div> <button class="btn btn-outline-primary rounded-3" id="addBtn">Adicionar</button> <button class="btn btn-outline-primary rounded-3" id="cancelBtn">Cancelar</button>  </div>` 
        }

        buttonsListeners(post)
    }

    insertEditor(findObject(cellId))
}
/* Add infos in a post */
async function updatePost(object) {
    await updateDoc(doc(db, "posts", object.id), {
        title: object.title,
        content: object.content
    }, { merge: true });
    reloadPage()
}

/* remove post on Firebase  */
async function removePost(object){
    await deleteDoc(doc(db, "posts", object.id));
    reloadPage()
}

/* Create a new post */
async function addPost(object) {
    let id = new Date();
    id = id.getTime().toString()

    c(typeof id)

    await setDoc(doc(db, "posts", id), {
        title: object.title,
        content: object.content,
        id: id
    });

    document.location.reload(true)

}

/* Update counter on screen */
function updateCounter(){
    const number = document.querySelector("#postLength")
    return number.children[1].innerHTML = database.length
}

/* when started */
setTimeout(() => {
    showPosts(database)
    updateCounter()
}, 500);

