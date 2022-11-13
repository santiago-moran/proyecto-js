class Verduleria {
    constructor(id, producto, precio, cantidad, imagen) {
        this.id = id
        this.producto = producto
        this.precio = precio
        this.cantidad = cantidad
        this.imagen = imagen
    }
}
const prod1 = new Verduleria(1, 'Banana', 250, 0, 'https://imagenes.elpais.com/resizer/2HSS64EcGlMNFYHY4P3dDY4TRNw=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/HE3SMC3L7Z7XENXLHLLKE3CDEA.jpg')
const prod2 = new Verduleria(2, 'Manzana', 300, 0, 'https://elegifruta.com.ar/onepage/wp-content/uploads/2017/07/manzana_roja.jpg')
const prod3 = new Verduleria(3, 'Kiwi', 120, 0, 'https://s1.eestatic.com/2015/02/20/cocinillas/cocinillas_12508818_115876054_1024x576.jpg')
const prod4 = new Verduleria(4, 'Naranja', 200, 0, 'https://www.cuerpomente.com/medio/2020/10/21/naranja_b3c2dbbc_1200x1200.jpg')
const prod5 = new Verduleria(5, 'Durazno', 450, 0, 'https://www.prensalibre.com/wp-content/uploads/2019/08/Durazno.jpg?quality=52')
const prod6 = new Verduleria(6, 'Limon', 135, 0, 'https://mejorconsalud.as.com/wp-content/uploads/2015/05/beneficios-del-limon-posiblemente-no-conocias.jpg')
const verduras = [prod1, prod2, prod3, prod4, prod5, prod6]
let encontrarCards = []
let carrito = []
let total = 0
if (localStorage.getItem('carrito', carrito)) {
    let traerDatos = JSON.parse(localStorage.getItem('carrito', carrito))
    carrito = traerDatos
}

function mostrarCards (array) {
    let cards = document.getElementById('cards')
    cards.innerHTML = ""
        for (let verdura of array) {
            let siEsta = carrito.filter(el => verdura.producto == el.producto)
            if (siEsta.length > 0) {
                for (let el of siEsta) {
                    verdura.cantidad = el.cantidad
                    verdura.precio = el.precio
                }
                let nuevoElement = document.createElement('div')
                nuevoElement.innerHTML = ""
                nuevoElement.innerHTML += `<div class="card" style="width: 18rem;">
                                    <img src=${verdura.imagen} class= "card-img-top" alt= "Imagen de ${verdura.producto}">
                                    <div class="card-body" id="card${verdura.id}">
                                        <h5 class="card-title">${verdura.id}. ${verdura.producto}</h5>
                                        <h5 class="card-title">Precio: $${verdura.precio}</h5>
                                        <h5 class="card-title" id= "idCantidad${verdura.id}">Cantidad*: ${verdura.cantidad}</h5>
                                        <p class="card-text">*Una vez agregado al carrito, no podrá modificarse la cantidad.</p>
                                        <a class="btn btn-primary" id="btnAgregar${verdura.id}">Agregado</a>
                                    </div>
                                </div>`
                cards.appendChild(nuevoElement)
            }
            else {
                let nuevoElement = document.createElement('div')
                nuevoElement.innerHTML = ""
                nuevoElement.innerHTML += `<div class="card" style="width: 18rem;">
                                    <img src=${verdura.imagen} class= "card-img-top" alt= "Imagen de ${verdura.producto}">
                                    <div class="card-body" id="card${verdura.id}">
                                        <h5 class="card-title">${verdura.id}. ${verdura.producto}</h5>
                                        <h5 class="card-title">Precio: $${verdura.precio}</h5>
                                        <h5 class="card-title" id= "idCantidad${verdura.id}">Cantidad*: <input type="text" class="inputProd" id="input${verdura.id}"></h5>
                                        <p class="card-text">*Una vez agregado al carrito, no podrá modificarse la cantidad.</p>
                                        <a class="btn btn-primary" id="btnAgregar${verdura.id}">Agregar al Carrito</a>
                                    </div>
                                </div>`
                cards.appendChild(nuevoElement)
            }
            let btnAgregar = document.getElementById(`btnAgregar${verdura.id}`)
            btnAgregar.onclick = () => {
                AgregarAlCarrito(verdura, btnAgregar)
            }
        }    
}
function AgregarAlCarrito (element, boton) {
    if (boton.innerText == 'Agregado') {
        alert('PRODUCTO EN CARRITO')
    }
    else {
        let input = document.getElementById(`input${element.id}`)
        element.cantidad = input.value
        if (input.value == "" || input.value == 0) {
            alert('DATOS INCOMPLETOS')
        }
        else {
            carrito.push(element)
            carrito.sort( (a, b) => a.id - b.id )
            boton.innerText = 'Agregado'
            let idCantidad = document.getElementById(`idCantidad${element.id}`)
            idCantidad.innerHTML = `Cantidad*: ${element.cantidad}`
            localStorage.setItem('carrito', JSON.stringify(carrito))
        }
    }
}
function mostrarCarrito (array) {
    let btnCarrito = document.getElementById(`btnCarrito`)
    btnCarrito.onclick = () => {
        total = 0
        let ulCarrito = document.getElementById(`ulCarrito`)
        ulCarrito.innerHTML = ""
        if (array.length == 0) {
            ulCarrito.innerHTML = `<p class= "textoCarrVacio">(Carrito Vacío)</p>`
        }
        for (let el of array) {
            ulCarrito.innerHTML += `<li class="nav-item" id= "liCarrito${el.id}">
                                        <p><span class= "spanCarrito"> Id: </span>${el.id} <span class= "spanCarrito"> Producto: </span> ${el.producto} <span class= "spanCarrito"> Cantidad: </span> ${el.cantidad}<span class= "spanCarrito"> Precio: </span> $${el.precio*el.cantidad}</p> <button class= "eliminar" id= "btnEliminar${el.id}"> <i class="fa-solid fa-trash"></i> </button>
                                    </li>`
            total += el.precio*el.cantidad             
        }
        let crearli = document.createElement('li')
        crearli.classList.add(`liFinalizarCompra`)
        ulCarrito.appendChild(crearli)
        if (ulCarrito.innerText == `(Carrito Vacío)`) {
            crearli.innerHTML = ""
        }
        else {
            crearli.innerHTML = `<p id= "total">Total: ${total}</p>
                            <button class= "btn btn-primary" id= "finCompra">Finalizar Compra</button>`
            finalizarCompra (ulCarrito)
        }
        array.forEach ((verd) => {
            let btnEliminar = document.getElementById(`btnEliminar${verd.id}`)
            btnEliminar.onclick = () => {
                eliminarProducto(array, verd)
            }
        })
    }
}
function eliminarProducto (arreglo, prod) {
    total -= prod.cantidad*prod.precio
    let ulCarrito = document.getElementById(`ulCarrito`)
    let totalText = document.getElementById (`total`)
    totalText.innerHTML = `<p id= "total">Total: ${total}</p>`
    let liCarrito = document.getElementById(`liCarrito${prod.id}`)
    let btnAgregar = document.getElementById(`btnAgregar${prod.id}`)
    liCarrito.remove()
    if (arreglo.length == 1) {
        arreglo.splice(0, 1)
    }
    else {
        arreglo.splice(arreglo.indexOf(prod), 1)
    }
    if (arreglo.length == 0) {
        localStorage.removeItem('carrito')
        ulCarrito.innerHTML = `<p class= "textoCarrVacio">(Carrito Vacío)</p>`
    }
    else {
        localStorage.setItem('carrito', JSON.stringify(arreglo))
    }
    btnAgregar.innerText = 'Agregar al Carrito'
    let idCantidad = document.getElementById(`idCantidad${prod.id}`)
    idCantidad.innerHTML = `<h5 class="card-title" id= "idCantidad${prod.id}">Cantidad*: <input type="text" class="inputProd" id="input${prod.id}"></h5>`
    console.log(arreglo)
    btnAgregar.onclick = () => {
        AgregarAlCarrito(prod, btnAgregar)
    }
    mostrarCarrito(arreglo)
}
function buscarCards (array) {
    let buscadorCard = document.getElementById(`buscadorCard`)
    buscadorCard.oninput = () => {
        encontrarCards = array.filter(element => element.producto.toLowerCase().includes(buscadorCard.value.toLowerCase()))
        if (encontrarCards.length > 0) {
            let carta = document.getElementById(`cards`)
            carta.classList.add('cardsGrid')
            mostrarCards(encontrarCards)
        }
        else if (encontrarCards.length == 0){
            let carta = document.getElementById(`cards`)
            carta.classList.add('carta')
            carta.classList.remove('cardsGrid')
            carta.innerHTML = '<p>No se encontro ningun producto con ese nombre.</p>'
        }
    }
}
function finalizarCompra (ulCarrito) {
    let finCompra = document.getElementById(`finCompra`)
    finCompra.onclick = () => {
        ulCarrito.innerHTML = `<p class= "textoCarrVacio">(Carrito Vacío)</p>`
        carrito.splice(0, carrito.length)
        localStorage.removeItem('carrito')
        if (carrito.length == 0) {
            for (let el of verduras) {
                document.getElementById(`idCantidad${el.id}`).innerHTML = `<h5 class="card-title" id= "idCantidad${el.id}">Cantidad*: <input type="text" class="inputProd" id="input${el.id}"></h5>`
                document.getElementById(`btnAgregar${el.id}`).innerText = `Agregar al Carrito`
            }
            for (let element of encontrarCards) {
                document.getElementById(`idCantidad${element.id}`).innerHTML = `<h5 class="card-title" id= "idCantidad${el.id}">Cantidad*: <input type="text" class="inputProd" id="input${el.id}"></h5>`
                document.getElementById(`btnAgregar${element.id}`).innerText = `Agregar al Carrito`
            }
        }
    }
}
mostrarCards(verduras)
mostrarCarrito (carrito)
buscarCards (verduras)