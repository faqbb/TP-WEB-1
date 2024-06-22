let btn = document.querySelectorAll(".btnNav");
for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", (event) => push(event));
}

let btn_title = document.querySelector(".btntitleindex");
btn_title.addEventListener("click", (event) => push(event));

const text = "mundiViajes";

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
    //section blog
    cont.querySelectorAll(".btn_blogs")
        .forEach(b => b.addEventListener("click", (event) => pushBlog(event)));


    //section register
    displayCaptcha()
    cont.querySelectorAll("#TextCaptcha")
        .forEach(b => b.addEventListener("click", displayCaptcha));
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



