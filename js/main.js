let catsList = {
    cat1: {
        name:"Harley",
        type: "ocicat",
        owner: "Ubaldo Quevedo",
        imageUrl:"https://live.hsmob.io/storage/images/wakyma.com/wakyma.com_origen-de-la-raza-de-gato-ocicat.jpg"

    },
    cat2: {
        name:"Xiampoo",
        type: "siamés",
        owner: "Silvi Rodriguez",
        imageUrl:"https://mascotasonlineblog.files.wordpress.com/2014/03/patyshibuya-com-br.jpg?w=300&h=225"

    },
    cat3: {
        name:"Ava",
        type: "black",
        owner: "King Lee",
        imageUrl:"https://hobbymascotas.com/wp-content/uploads/2018/08/5-cosas-fascinantes-sobre-los-gatos-negros-hobby-mascotas.jpg"


    },
    cat4: {
        name:"Ron",
        type: "amarillo",
        owner: "King Lee",
        imageUrl:"https://www.ecestaticos.com/image/clipping/654/3aefc13039b9ddbae4433047274f656f/a-los-gatos-naranjas-les-gusta-mas-el-riesgo-foto-pixabay.jpg"
    }
} 


const printAllPets = () =>{
    const llaves = Object.keys(catsList)
    for(let pet of llaves) {
        console.log(pet)
        printPetCard(catsList[pet]);
    }

}



const printPetCard = (pet) => {
    $('.card-deck').append(`
        <div class="card  text-dark bg-ligth mb-3">
        <img class="card-img-top" src="${pet.imageUrl}" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">${pet.name}</h5>
        <h6> Tipo: ${pet.type}</h6>
        <p class="card-text">Owner: ${pet.owner} </p>
        </div>
        <div class="card-footer">
            <button class="btn btn-dark active">Adoptar</button>
        </div>
    </div>
    `)
}

//acciones al inicio de la app 
printAllPets();