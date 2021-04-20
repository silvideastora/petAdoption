//https://ajaxclass-1ca34.firebaseio.com/11g/israel/posts

/*
{
    title:"some title",
    content:"some content",
    coverUrl:"some url"
}
*/

//Creamos un objeto fake para representar al usuario 
//y poder mostrarlo en la navbar
let userData = {
    name:"Silvi Rodríguez",
    avatar:"https://ca.slack-edge.com/T01FMK00309-U01FU5VAZED-c0986ea3c1e8-512"
}


const setUserData = () => {
    //tomamos los datos del usuario y los representamos en la navbar
    $(".user-data .user-name").text(userData.name)
    $(".user-data .user-avatar").css({
        "background-image":`url(${userData.avatar})`
    })
}
setUserData()


$(".modal .btn-primary").click(() => {
    const selectedUser = JSON.parse($('#users-select').val());
    userData = {
        name: selectedUser.name,
        avatar: selectedUser.image
    }
    
    setUserData()
    toggleModal()
})
//Función para extraer los datos del formulario
const getFormData = () => {
    //Creamos el objeto vacío que llenaremos con los datos del post
    let postObject = {}

    //recorremos cada campo del formulario
    $("#post-form input").each(function (index) {
        console.log(this)
        
        //de cada campo, extraemos el valor de "name" para crear la propiedad del objeto
        let property = this.name

        //y el valor de value, para asignar un valor a cada propiedad
        let value = this.value

        //actualizamos el objeto vacío, agregando cada par de llave-valor
        postObject = { ...postObject, [property]: value }
    })

    console.log(postObject)

    //con el objeto creado, el cual representa un post, ejecutamos la función
    //que guardará ese post en la base de datos
    savePost(postObject)
}

//Creamos la función que guardará posts en la base de datos
//esta recibe como parámetro el post a guardar
const savePost = post => {

    //iniciamos una petición ajax con jquery
    $.ajax({
        method: "POST",//método de la petición
        url: "https://ajaxclass-1ca34.firebaseio.com/11g/silvi/posts/.json",//destino
        data: JSON.stringify(post),//lo que vamos a enviar
        success: response => {//qué haremos cuando la petición sea exitosa
            console.log(response)
            //cada que guardemos un post, volvemos a traer la colección y la 
            //mostramos en la UI
            getPosts()
        },
        error: error => { //qué hacemos si hay error
            console.log(error)
            //alert(error.responseJSON.error)
            error.status === 400 && alert("debes parsear el objeto ")
        }
    })
}

//Creamos la función que traerá todos los post de la base de datos
const getPosts = () => {
    //inciamos una petición ajax con jquery
    $.ajax({
        method: "GET",
        url: "https://ajaxclass-1ca34.firebaseio.com/11g/silvi/posts/.json",
        success: response => {

            //cuando tengamos todos los posts, los mostramos en la UI
            printPosts( response )
        },
        error: error => {
            console.log(error)
        }
    })
}



//Función que crea los post en la UI, recibe como parámetro la colección de posts a mostrar
const printPosts = postsCollection => {

    //primero vaciamos el contenedor de los posts
    $("#posts-wrapper").empty()
    //iteramos dentro de la colección de posts
    for (post in postsCollection) {

        //extraemos la data de cada uno de los posts
        let postData = postsCollection[post]

        //creamos las variables que se representarán en cada card
        let { title, content, coverUrl } = postData

        let comments = []//llenaremos este con comentarios
        let objectKeys = Object.keys( postData ).filter( (key) => {
            return key.charAt(0) === '-'
        }) 
        for(let key of objectKeys) {
            comments.push(postData[key].comment);
        }


        console.log( comments )

        //creamos el html de cada card con los datos dinámicos de cada post
        let postHtml = `
        <div class="card mb-3">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img class="w-100" src="${coverUrl}" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${content}</p>
                            <input class=""shadow p-3 mb-5 bg-body rounded"" placeholder="Comment" type="text" name="" id="${post}">
                            <button class="btn btn-dark" onclick="commentOnClick('${post}')" >Add</button>
                            ${printComments(comments)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `

        //agregamos cada card al contenedor de los posts
        $("#posts-wrapper").append( postHtml )
    }
}

const printComments = (comments) => {
    return `<ul>
        ${comments.map(c => {
            return `<li>${c}</li>`
        })}
    </ul>`
}

//listener para el botón de guardar posts
$("#save-post").click(() => { 
    if (validaForm() === true){
        getFormData();
        cleanForm()
    }
})
//Para limpiar el formulario
const cleanForm = () => {
    $("#post-form")[0].reset();
}

const commentOnClick = (id) => {
    let comment = $(`#${id}`).val()
    saveComment( id, comment)
}
const saveComment = (id, comment) => {
 
    //iniciamos una petición ajax con jquery
    $.ajax({
        method: "POST",//método de la petición
        url: `https://ajaxclass-1ca34.firebaseio.com/11g/silvi/posts/${id}.json`,//destino
        data: JSON.stringify({comment:comment}),//lo que vamos a enviar
        success: response => {//qué haremos cuando la petición sea exitosa
            console.log(response)
            //cada que guardemos un post, volvemos a traer la colección y la 
            //mostramos en la UI
            getPosts()
        },
        error: error => { //qué hacemos si hay error
            console.log(error)
            //alert(error.responseJSON.error)
            error.status === 400 && alert("debes parsear el objeto ")
        }
    })
}

//al iniciar el documento, mostramos desde el principio los posts existentes
getPosts()

const changeUser= () => {
    getUsers()
    toggleModal()
}

const toggleModal = () => {
    $('.modal').toggle();
}


const getUsers = () => {
    $.ajax({
        method: "GET",
        url: "https://ajaxclass-1ca34.firebaseio.com/11g/silvi/users/.json",
        success: response => {

            printUsers( response )
        },
        error: error => {
            console.log(error)
        }
    })
};

const printUsers = (users) => {
    $('#users-select').empty()
    for (let user in users) {
        $('#users-select').append(new Option(
            users[user].name,
            JSON.stringify(users[user])
        ));
    }

}

function validaForm(){
    // Campos de texto
    if($("#titulo").val() == ""){
        alert("El campo Título no puede estar vacío.");
        $("#titulo").focus();       // Esta función coloca el foco de escritura del usuario en el campo Nombre directamente.
        return false;
    }
    if($("#contenido").val() == ""){
        alert("El campo Content no puede estar vacío.");
        $("#contenido").focus();
        return false;
    }
    if($("#imagen").val() == ""){
        alert("El campo Cover no puede estar vacío, agrega una imágen");
        $("#imagen").focus();
        return false;
    }
    return true; // Si todo está correcto
}
