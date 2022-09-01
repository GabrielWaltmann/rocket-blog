import { db } from "./firebaseConfig.js"

import { collection, deleteDoc, setDoc, doc, updateDoc, onSnapshot, getDocs, query } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";

/* Global variables */
/* get  datas */
let database = []
onSnapshot(collection(db, "posts"), (doc) => {
    database = []
    doc.forEach(data => database.push(data.data()));
})

function c(data) { console.log(data) }

/* Show posts on screen */

function showDatas(database) {
    function showDatabase(){
        database.forEach(post => {
            const table = document.querySelector("#posts table tbody")
        
            function createRow() { return table.insertRow(1) }
            const row = createRow()
            const id = row.insertCell(0);
            const title = row.insertCell(1);

            id.innerHTML = post.id
            id.parentElement.id = post.id
            id.parentElement.className = "cell"
            title.innerHTML = post.title
        })
    }
    function cellListener(){
        let cells = document.querySelectorAll(".cell")
        cells = [...cells]

        for(let cell of cells){ cell.onclick = event => showeditor(cell.id) }
    }

    showDatabase()
    cellListener()
}

function showeditor(cellId){
    function findObject(cellId) {
        let obj = undefined
        database.forEach(object => {if(object.id == cellId){ obj = object}}) 
        return obj

    }

    function insertEditor(post){
        try {
            let post = findObject(cellId)
        
            document.body.innerHTML += `<div class="position-absolute p-5 rounded-4" id="editor"> <h2>Editar Informações =</h2> <div class="mb-3"> <label for="exampleFormControlInput1" class="form-label">Título</label> <input type="email" class="form-control" id="inputData" value="${post.title}"> </div> <div class="mb-3"> <label for="textarea" class="form-label">Conteudo</label> <textarea class="form-control" id="textarea" rows="3"  >${post.content}</textarea> </div> <button class="btn btn-outline-primary rounded-3" id="saveBtn">Salvar</button> <button class="btn btn-outline-primary rounded-3" id="cancelBtn">Cancelar</button> <button class="btn btn-outline-primary rounded-3" id="removeBtn">remover</button> </div>`
            const saveBtn = document.querySelector('#saveBtn')
            const cancelBtn = document.querySelector('#cancelBtn')
            const removeBtn = document.querySelector('#removeBtn')
            removeBtn.onclick = e => c(e)
        } catch {
            document.body.innerHTML += `<div class="position-absolute p-5 rounded-4" id="editor"> <h2>Editar Informações:</h2> <div class="mb-3"> <label for="exampleFormControlInput1" class="form-label">Título</label> <input type="email" class="form-control" id="inputData" value=""> </div> <div class="mb-3"> <label for="textarea" class="form-label">Conteudo</label> <textarea class="form-control" id="textarea" rows="3"  ></textarea> </div> <button class="btn btn-outline-primary rounded-3" id="saveBtn">Salvar</button> <button class="btn btn-outline-primary rounded-3" id="cancelBtn">Cancelar</button> <button class="btn btn-outline-primary rounded-3" id="removeBtn">remover</button> </div>` 
        }
    }

    insertEditor(findObject(cellId))
}

function editDatas(element, post) {
    element.onclick = event => {
        const id = (event.target.parentElement.children[0].innerHTML)
        insertTextArea(post, id)
    }
}


/*     document.querySelector('#createBtn').onclick = e =>  c("terdt")
 */ 


async function updateDatas(title, content, id) {
    await setDoc(doc(collection(db, "post")), {
        title: title
    });

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




setTimeout(() => {
    showDatas(database)


}, 500);


/* function insertTextArea(post, id) {

    listener(id)

} */

/* function listener(id) {
    const saveBtn = document.querySelector('#saveBtn')
    const cancelBtn = document.querySelector('#cancelBtn')
    const removeBtn = document.querySelector('#removeBtn')

    saveBtn.onclick = event => {
        const title = document.querySelector("#inputData").value
        const content = document.querySelector("textarea").value

        updateDatas(title, content, id)
    }

    cancelBtn.onclick = event => document.location.reload(true)

    removeBtn.onclick = event => {
        const title = document.querySelector("#inputData").value
        const content = document.querySelector("textarea").value

        removeData(title, content, id)
    }
} */
    /*     
        document.querySelector("#createBtn").onclick = event => {
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
                addDatas(title, content, id)
            }
    
        } */

/*     function findDataOnFirebase(find) {
        for (let data of database) {
            if (data.id == find.id) return (data)
        }
    } */
    /* If post exist */
    
/*     try {
    	c("test")

        findDataOnFirebase(child)
        document.body.innerHTML += `<div class="position-absolute p-5 rounded-4" id="editor"> <h2>Editar Informações =</h2> <div class="mb-3"> <label for="exampleFormControlInput1" class="form-label">Título</label> <input type="email" class="form-control" id="inputData" value="${findDataOnFirebase(child).title}"> </div> <div class="mb-3"> <label for="textarea" class="form-label">Conteudo</label> <textarea class="form-control" id="textarea" rows="3"  >${findDataOnFirebase(child).content}</textarea> </div> <button class="btn btn-outline-primary rounded-3" id="saveBtn">Salvar</button> <button class="btn btn-outline-primary rounded-3" id="cancelBtn">Cancelar</button> <button class="btn btn-outline-primary rounded-3" id="removeBtn">remover</button> </div>`
        const saveBtn = document.querySelector('#saveBtn')
        const cancelBtn = document.querySelector('#cancelBtn')
        const removeBtn = document.querySelector('#removeBtn')
        removeBtn.onclick = e => c(e)

    } catch {
        document.body.innerHTML += `<div class="position-absolute p-5 rounded-4" id="editor"> <h2>Editar Informações:</h2> <div class="mb-3"> <label for="exampleFormControlInput1" class="form-label">Título</label> <input type="email" class="form-control" id="inputData" value=""> </div> <div class="mb-3"> <label for="textarea" class="form-label">Conteudo</label> <textarea class="form-control" id="textarea" rows="3"  ></textarea> </div> <button class="btn btn-outline-primary rounded-3" id="saveBtn">Salvar</button> <button class="btn btn-outline-primary rounded-3" id="cancelBtn">Cancelar</button> <button class="btn btn-outline-primary rounded-3" id="removeBtn">remover</button> </div>`

    };


}

async function removeData(post){
    returnDocId(post)

    function returnDocId(post){
        c(opst)
    } */
/* 
    const q = query(collection(db, "posts"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        c(doc.id + "+" + post.id + "d")
        if(doc.id == post.id) {c(doc.id + "+" + post.id)}
    }); */