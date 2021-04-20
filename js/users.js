let userData = {
    name:"Silvi Rodríguez",
    avatar:"https://ca.slack-edge.com/T01FMK00309-U01FU5VAZED-c0986ea3c1e8-512"
}

//tomamos los datos del usuario y los representamos en la navbar
$(".user-data .user-name").text(userData.name)
$(".user-data .user-avatar").css({
    "background-image":`url(${userData.avatar})`
})




const getData = () => {
    $.ajax({
        method:"GET",
        url: "https://ajaxclass-1ca34.firebaseio.com/11g/silvi/.json",
        success: response => {
            console.log(response)
        },
        error : error => {
            console.log(error)
        }
    })
}
getData()


const saveUser = () => {
    const name = $('#name').val()
    const image = $('#image').val()
    //iniciamos una petición ajax con jquery
    $.ajax({
        method: "POST",//método de la petición
        url: `https://ajaxclass-1ca34.firebaseio.com/11g/silvi/users/.json`,//destino
        data: JSON.stringify({image:image, name: name }),//lo que vamos a enviar
        success: response => {//qué haremos cuando la petición sea exitosa
            console.log(response)
            alert('usuario creado')
            const url = "index.html";    
            $(location).attr('href',url);
            //cada que guardemos un post, volvemos a traer la colección y la 
            //mostramos en la UI
        },
        error: error => { //qué hacemos si hay error
            console.log(error)
            //alert(error.responseJSON.error)
            error.status === 400 && alert("debes parsear el objeto ")
        }
    })
}

$('#save-user').click(saveUser)
