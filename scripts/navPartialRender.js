let btn = document.querySelectorAll(".btnNav");
for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", (event) => push(event));
}

let btn_title = document.querySelector(".btntitleindex");
btn_title.addEventListener("click", (event) => push(event));

const text = "mundiViajes";
const apiEndpoint = 'https://6675d4f5a8d2b4d072f19c6b.mockapi.io/web/tp/userExperiences';

let cont = document.querySelector(".mainContainer");

// const de html
const inicio = "inicio";
const sobreNosotros = "sobre_nosotros";
const registro = "registro";
const tuExperiencia = "Tu_experiencia";
const blogEntradas = "blogEntriesList";
const blogUsuario = "NoeliaHildera-Spain";


load_content(text);

function push(event) {
    let id = event.target.id;
    if (id != "mundiViajes") {
        selec_tab(id);
    } else {
        delete_tab();
    }
    load_content(id);
    window.history.pushState({ id }, `${id}`, `/page/${id}`);
}

function selec_tab(id) {
    btn.forEach((item) => item.classList.remove("selected"));
    document.querySelectorAll("#" + id)
        .forEach((item) => item.classList.add("selected"));
}

function delete_tab() {
    let i = 0;
    for (let i = 0; i < btn.length; i++) {
        btn.forEach((i) => i.classList.remove("selected"));
    }
}

async function load_content(id) {
    try {
        let response = await fetch(`${window.location.origin}/pages/${id}.html`);
        let responseTitle = await fetch(`${window.location.origin}/pages/${inicio}.html`);
        if (response.ok) {
            response.text().then(processText);
            addCss(id);
        } else {
            if (responseTitle.ok) {
                responseTitle.text().then(processText);
                addCss(inicio);
            } else {
                if (id != "mundiViajes") {
                    cont.innerHTML = `error loading for /${id} ...`;
                } else {
                    cont.innerHTML = `error loading for ${inicio}...`;
                }
            }
        }
    } catch (error) {
        cont.innerHTML = "Error";
    }
}

function addCss(id) {
    const linkRemplace = document.getElementById("linkCss");
    console.log(id);
    if (id === inicio) {
        linkRemplace.href = "/style/indexStyle.css";
    } else {
        if (id === sobreNosotros) {
            linkRemplace.href = "/style/quinesSomosStyle.css";
        } else {
            if (id === tuExperiencia) {
                linkRemplace.href = "/style/tuExperienciaStyle.css";
            } else {
                if (id === registro) {
                    linkRemplace.href = "/style/registerStyle.css";
                } else {
                    if (id == blogEntradas) {
                        linkRemplace.href = "/style/blogEntriesListStyle.css";
                    } else {
                        if (id === blogUsuario) {
                            linkRemplace.href = "/style/blogEntryStyle.css";
                        }
                    }
                }
            }
        }
    }
}




function processText(t) {
    cont.innerHTML = t;
    //section slide
    cont.querySelectorAll("#slide1")
        .forEach(b => b.addEventListener("click", () => {
            switchSlide(slide2.id)
        }))

    cont.querySelectorAll("#slide2")
        .forEach(b => b.addEventListener("click", () => {
            switchSlide(slide3.id)
        }))

    cont.querySelectorAll("#slide3")
        .forEach(b => b.addEventListener("click", () => {
            switchSlide(slide1.id)
        }))

    //seccion linkIndex
    let btnLink = cont.querySelectorAll(".btnLink");
    for (let i = 0; i < btnLink.length; i++) {
        btnLink[i].addEventListener("click", (event) => push(event));
    }
    //section blog
    cont.querySelectorAll(".entry")
        .forEach(b => b.addEventListener("click", (event) => pushBlog(event)));

    //seccion api
    fetchData()

    //section register
    displayCaptcha()
    cont.querySelectorAll("#TextCaptcha")
        .forEach(b => b.addEventListener("none", displayCaptcha));
    cont.querySelectorAll("#form")
        .forEach(b => b.addEventListener("submit", agregar));
    cont.querySelectorAll("#refreshButton")
        .forEach(b => b.addEventListener('click', function () {
            displayCaptcha();
            ResetInput();
        }))
    cont.querySelectorAll("#ConfirmButton")
        .forEach(b => b.addEventListener('click', function () {
            ValueInput();
            CompararArreglos();
        }))

}

//seccion slide
function switchSlide(slide) {
    if (slide == 'slide1') {
        slide3.classList.remove('shown')
        slide1.classList.add('shown')
    }
    if (slide == 'slide2') {
        slide1.classList.remove('shown')
        slide2.classList.add('shown')
    }
    if (slide == 'slide3') {
        slide2.classList.remove('shown')
        slide3.classList.add('shown')
    }
}

slide1.addEventListener('click', () => {
    switchSlide(slide2.id)
})

slide2.addEventListener('click', () => {
    switchSlide(slide3.id)
})

slide3.addEventListener('click', () => {
    switchSlide(slide1.id)
})


//seccion blog
function pushBlog(event) {
    let id = event.target.id;
    if (id != "mundiViajes") {
        selec_tab(id);
    } else {
        delete_tab();
    }
    load_blog(id);
    window.history.pushState({ id }, `${id}`, `/page/blogEntries/${id}`);
}

async function load_blog(id) {
    try {
        let response = await fetch(`${window.location.origin}/pages/blogEntries/${id}.html`);
        if (response.ok) {
            response.text().then(actionBlog);
            addCss(id);
        } else {
            cont.innerHTML = "error loading for /" + id + "...";
        }
    } catch (error) {
        cont.innerHTML = "Error";
    }
}

function actionBlog(t) {
    cont.innerHTML = t;
    cont.querySelectorAll(".returnButton")
        .forEach(b => b.addEventListener("click", returnPage));
}

async function returnPage() {
    try {
        let response = await fetch(`${window.location.origin}/pages/blogEntriesList.html`);
        if (response.ok) {
            response.text().then(processText);
            addCss(blogEntradas);
        } else {
            cont.innerHTML = "error loading for blogEntriesList...";
        }
    } catch (error) {
        cont.innerHTML = "Error";
    }
}

//seccion register
function agregar(e) {
    e.preventDefault();
}

function displayCaptcha() {
    const captchaElement = document.getElementById('TextCaptcha');
    const captcha = generateCaptcha();
    captchaElement.innerHTML = captcha;
    ValueCaptcha();
}

function generateCaptcha() {
    let captcha = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 6; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captcha;
}

function ValueCaptcha() {
    const StringArray = document.getElementById('TextCaptcha').innerHTML;
    ArrayCaptcha = StringArray.split(""); //el split es para que de un string pase a un arreglo y me lo separe
    return ArrayCaptcha;
}

function ValueInput() {
    const InputCaptcha = document.getElementById('inputCaptcha').value;
    ArrayInput = InputCaptcha.split("");
    return ArrayInput;
}

// seccion comparar
function CompararArreglos() {
    let array1 = ValueCaptcha();
    let array2 = ValueInput();
    let cont = 0;
    let Result = document.querySelector('.menssage');
    for (i = 0; i <= array1.length; i++) {
        if (array1[cont] == array2[cont]) {
            Result.innerHTML = '- Captcha Correcto -';
            cont++;
        } else {
            Result.innerHTML = '- Captcha Incorrecto -';
            Result.classList.remove("textRed");
            Result.classList.add("textRed");
            i == array1.length;
        }
    }
}

function ResetInput() {
    document.getElementById("inputCaptcha").value = '';
    document.getElementById("menssage").innerHTML = '';
}



async function fetchData() {
    console.log("entre en la funcion de tabala");
    try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
            throw new Error(`Error! Estado de respuesta: ${response.status}`);
        }
        const data = await response.json();
        let table = document.getElementById('apiTableBody');
        if (table) {
            data.forEach(item => {
                addEditableRow(item.id, item.Destiny, item.Companion, item.Date, table)
            });
        }
    } catch (e) {
        console.log(e);
    }
}

function addEditableRow(id, destiny, companion, date, table) {
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);

    cell1.classList = "tertiaryColor"
    cell1.innerText = id;

    cell2.classList = "tertiaryColor"
    cell2.innerText = destiny;

    cell3.classList = "tertiaryColor";
    cell3.innerText = companion;

    cell4.classList = "tertiaryColor";
    cell4.innerText = date;

    cell5.innerHTML = '<button onclick="editRow(this)" class="rowButton backgroundPrimary tertiaryColor">Editar</button> <button onclick="deleteRow(this)" class="rowButton backgroundPrimary tertiaryColor">Borrar</button> <button onclick="sendToApi(this)" class="rowButton backgroundPrimary tertiaryColor">Enviar</button>';
}

async function addFromInputs() {
    let destiny = document.getElementById("destinyInput").value
    let companion = document.getElementById("companionInput").value
    let date = document.getElementById("dateInput").value
    let table = document.getElementById('apiTableBody');
    if (table && destiny && companion && date) {
        const data = {
            Destiny: destiny,
            Companion: companion,
            Date: date
        };
        await postToApi(data)
        addEditableRow(data.id, data.Destiny, data.Companion, data.Date, table)
    }
}


async function sendToApi(button) {
    try {
        const row = button.parentNode.parentNode;
        const cell1 = row.cells[0].innerText;
        const cell2 = row.cells[1].innerText;
        const cell3 = row.cells[2].innerText;
        const cell4 = row.cells[3].innerText;

        const data = {
            id: cell1,
            Destiny: cell2,
            Companion: cell3,
            Date: cell4
        };
        let id = await isExistingData(data)
        console.log(id)
        if (id >= 0) {
            putInApi(data, id)
        } else {
            postToApi(data)
        }
    } catch (e) {
        console.log(e)
    }
}

async function postToApi(data) {
    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`Error! Estado de respuesta: ${response.status}`);
        }
        const result = await response.json();
        console.log('Respuesta de la api:', result);
    } catch (e) {
        console.log(e);
    }
}

async function putInApi(data, id) {
    const updateResponse = await fetch(`${apiEndpoint}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!updateResponse.ok) {
        throw new Error(`Error! Estado de respuesta: ${updateResponse.status}`);
    }
    const updateResult = await updateResponse.json();
    console.log('Datos actualizados:', updateResult);
    return true;
}

async function isExistingData(rowData) {
    try {
        let existingId = -1;
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
            throw new Error(`Error! Estado de respuesta: ${response.status}`);
        }
        const data = await response.json();
        for (let item of data) {
            if (item.id === rowData.id) {
                existingId = item.id;
                break;
            }
        }
        return existingId;
    } catch (e) {
        console.error(e);
        return existingId;
    }
}

async function deleteData(id) {
    try {
        const response = await fetch(`${apiEndpoint}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            console.log(`Elemento con ID ${id} eliminado correctamente.`);
        } else {
            console.error(`Error! Estado de respuesta: ${updateResponse.status}`);
        }
    } catch (e) {
        console.error('Se produjo un error al intentar eliminar el elemento:', e);
    }
}

async function deleteRow(button) {
    const row = button.parentNode.parentNode;
    const id = row.cells[0].innerText;
    await deleteData(id)
    row.parentNode.removeChild(row);
}

function editRow(button) {
    const row = button.parentNode.parentNode;
    const cells = row.getElementsByTagName('td');
    for (let i = 0; i < cells.length - 1; i++) {
        cells[i].contentEditable = cells[i].contentEditable === "true" ? "false" : "true";
        button.innerText = cells[i].contentEditable === "true" ? "Dejar de editar" : "Editar"
    }
}

