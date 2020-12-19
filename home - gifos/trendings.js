
/**
 * COMUNICACIÓN CON LA API
 */

// import { getValue } from './app';

const urlTrending = "http://api.giphy.com/v1/gifs/trending?api_key=3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm";
let arrayTrendings = [];
let offset = 15;

function getTrendings(){
    fetch(`${urlTrending}&limit=50&offset=${offset}`)
    .then(res => res.json() )
    .then(res => {
        // Recorro los objetos del request
        res.data.forEach(element => {   
            let valores = element;

        // Pusheo los objetos al array "arrayTrendings"
        arrayTrendings.push(valores);
    })
    printTrendings()
    })
    .catch((error) => {
        console.log(error)
    })
}

getTrendings()


let container = document.getElementById("list-gifs")

const resize = () => {
    if(innerWidth < 768) {
        btnMobileNext()
    }
}

let contenedor = document.getElementById("home")

// Variable para comprobar si el ancho del viewport es mobile o desktop
let idTrend = 0;
let gifBox;

// Función para cargar los gifs trendings
function printTrendings(){
    if(container.childElementCount == 0){
        for(let i = 0; i <= 2; ++i){
            // Creo los elementos
            gifBox = document.createElement("img")
            let title = document.createElement("h2")
            let username = document.createElement("h3")
    
            // Declaro los hijos de la caja de los gifs
            gifBox.appendChild(title)
            gifBox.appendChild(username)
    
            // Le coloco los idTren a cada caja y les agrego el titulo y la url del gif
            gifBox.idTrend = `trend${idTrend}`
            title.innerHTML = arrayTrendings[idTrend].title
            username.innerHTML = `Creator: ${arrayTrendings[idTrend].username}`
            gifBox.src = arrayTrendings[idTrend].images.preview_webp.url
    
            // Declaro a las boxes como hijo de container 
    
            container.appendChild(gifBox)
    
            // Aumento el valor de idTrend para luego iterar nuevamente sobre los idTrend de las boxes
            idTrend = idTrend + 1;

            gifBox.addEventListener("click", e => {
                let url = e.target.getAttribute('src')
                let creator = e.target.querySelector("h3").innerText
                let title = e.target.querySelector("h2").innerText

                // Creo los elementos
                let div = document.createElement("div")
                let divFlex = document.createElement("div")
                let divFlex2 = document.createElement("div")
                let btnExit = document.createElement("button")
                let exitImg = document.createElement("img")
                let bigGif = document.createElement("img")
                let titleGif = document.createElement("h3")
                let creatorGif = document.createElement("h4")
            
                let btnDownloading = document.createElement("button")
                let btnDgImg = document.createElement("img")
                let btnLike = document.createElement("button")
                let likeImg = document.createElement("img")

                // Declaro los hijos de los elementos
                div.appendChild(divFlex)
                div.appendChild(divFlex2)

                // Boton salir
                divFlex.appendChild(btnExit)
                btnExit.appendChild(exitImg)

                //Gif
                divFlex.appendChild(bigGif)


                // Titulo del gif y creador
                divFlex2.appendChild(titleGif)
                divFlex2.appendChild(creatorGif)

                // Boton like
                divFlex2.appendChild(btnLike)
                btnLike.appendChild(likeImg)

                // Boton descarga
                divFlex2.appendChild(btnDownloading)
                btnDownloading.appendChild(btnDgImg)

                    // Le asignó los atributos a los elementos creados 
                divFlex.className = "flex-container"
                divFlex2.className = "flex-container"
                divFlex.id = "flex-1"
                divFlex2.id = "flex-2"
                div.id = "div-container-results"
                bigGif.id = "gif"
                btnExit.id = "btn-exit"
                btnLike.id = "btn-like"
                bigGif.src = url
                exitImg.src = "assets/close.svg"
                btnDownloading.id = "btn-dg"
                btnDgImg.src = "assets/icon-download.svg"
                titleGif.innerHTML = title;
                creatorGif.innerHTML = creator;
                likeImg.src = "assets/icon-fav.svg"

                contenedor.appendChild(div)
                // Elimino el div que contiene el gif, el titulo, user, me gusta y descarga
                btnExit.addEventListener("click", function close(){
                    div.remove(bigGif)
                })
                btnLike.addEventListener("click", function like(){
                    likesUpload.push(new Likes(url , title[0].innerText, creator[0].innerText))
                    setTimeout(saveGifs, 750)
                    // localStorage.removeItem('Favorites')
                })
            })
        }

    }else(container.childElementCount == 2);{
        console.log("Esta todo OK")
    }

    if(idTrend >= 3){
        resize()
    }
}


let iOne = 0;
let iTwo = 1;
let iThree = 2;

let restOne = 3;


let requestCount = 10;

let btnNextG = document.getElementById("btn-next")
let btnBackG = document.getElementById("btn-back")

btnNextG.addEventListener("click", () => {
    restOne -= 3
    iOne += 3;
    iTwo += 3;
    iThree += 3;
    function overwritten() {
        if(iThree >= requestCount){
            getTrendings()
            requestCount += 15;
        }
        container.children[0].setAttribute('src', '')
        container.children[1].setAttribute('src', '')
        container.children[2].setAttribute('src', '')

        let img1 = container.children[0]
        let img2 = container.children[1]
        let img3 = container.children[2]

        img1.src = arrayTrendings[iOne].images.preview_webp.url
        img2.src = arrayTrendings[iTwo].images.preview_webp.url
        img3.src = arrayTrendings[iThree].images.preview_webp.url
    }
    overwritten()
})

btnBackG.addEventListener("click", () => {
    container.children[0].setAttribute('src', '')
    container.children[1].setAttribute('src', '')
    container.children[2].setAttribute('src', '')

    let img1 = container.children[0]
    let img2 = container.children[1]
    let img3 = container.children[2]

    img1.src = arrayTrendings[iOne - restOne].images.preview_webp.url
    img2.src = arrayTrendings[iTwo - restOne].images.preview_webp.url
    img3.src = arrayTrendings[iThree - restOne].images.preview_webp.url

    restOne += 3;
})


// Función para mostrar el boton de next en MOBILE
const btnMobileNext = () => {
    let btnShowMore = document.createElement("button")
    let btnImg = document.createElement("img")
    container.appendChild(btnShowMore)
    btnShowMore.appendChild(btnImg)

    btnImg.src = "assets/Button-Slider-right.svg"
    btnShowMore.id = "btn-more-trendings"
}


