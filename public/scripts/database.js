import { db } from "./firebaseConfig.js"

import { collection, deleteDoc , setDoc, doc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";


/* get updated datas*/
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

    /* Create header on table */
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

    /* Add posts on table */
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

    /* Hear click on posts */
    function cellListener(){
        let cells = document.querySelectorAll(".cell")
        cells = [...cells]

        for(let cell of cells){ cell.onclick = event => showeditor(cell.id) }
    }

    /* Hear click on create post button */
    function createPostlistener(){
        const createBtn = document.querySelector("#createBtn")
        createBtn.onclick = event => showeditor()
    }
    
    /* Run functions */
    createHeader()
    showDatabase()
    cellListener()
    createPostlistener()
}

/* Show editor when click in a button */
function showeditor(cellId){

    /* Get input datas */
    function getDatas(){
        const title = document.querySelector("#inputData").value
        const content = document.querySelector("#textarea").value
        const object = {title: title, content: content, id: cellId}
        return object
    }

    /* Hear click on editor buttons */
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

    /* Find post on database */
    function findObject(cellId) {
        let obj = undefined
        database.forEach(object => {if(object.id == cellId){ obj = object}}) 
        return obj
    }

    /* Insert editon on HTML */
    function insertEditor(post){
        const boxs = {
            creator: (post)=> 
                document.body.innerHTML += `<div class="position-absolute p-5 rounded-4" id="editor"> <h2>Editar Informações </h2> <div class="mb-3"> <label for="exampleFormControlInput1" class="form-label">Título</label> <input type="email" class="form-control" id="inputData" value="${post.title}"> </div> <div class="mb-3"> <label for="textarea" class="form-label">Conteudo</label> <textarea class="form-control" id="textarea" rows="3"  >${post.content}</textarea> </div> <button class="btn btn-outline-primary rounded-3" id="saveBtn">Salvar</button> <button class="btn btn-outline-primary rounded-3" id="cancelBtn">Cancelar</button> <button class="btn btn-outline-primary rounded-3" id="removeBtn">remover</button> </div>`,

            editor: ()=>
                document.body.innerHTML += `<div class="position-absolute p-5 rounded-4" id="editor"> <h2>Editar Informações:</h2> <div class="mb-3"> <label for="exampleFormControlInput1" class="form-label">Título</label> <input type="email" class="form-control" id="inputData" value=""> </div> <div class="mb-3"> <label for="textarea" class="form-label">Conteudo</label> <textarea class="form-control" id="textarea" rows="3"  ></textarea> </div> <button class="btn btn-outline-primary rounded-3" id="addBtn">Adicionar</button> <button class="btn btn-outline-primary rounded-3" id="cancelBtn">Cancelar</button>  </div>` 
        }

        if(post != undefined) {
            let post = findObject(cellId)
    
            boxs.creator(post)

        } else boxs.editor()
            

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

    /* Create new Id use the hours */
    function newId(){
        let id = new Date();
        id = id.getTime().toString()
        return id
    }

    const currentId = newId()
    await setDoc(doc(db, "posts", currentId), {
        title: object.title,
        content: object.content,
        id: currentId
    });
    reloadPage()
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
}, 1000);

