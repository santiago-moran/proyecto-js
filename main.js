class Cafes {
    constructor(id, producto, precio, cantidad, imagen, tipo, descripcion) {
        this.id = id
        this.producto = producto
        this.precio = precio
        this.cantidad = parseInt(cantidad)
        this.imagen = imagen
        this.descripcion = descripcion
        this.tipo = tipo
    }
}
let coffes
coffes = JSON.parse(localStorage.getItem('cafes', coffes)) || []
if (coffes.length == 0) {
    const cargarCafes = async () => {
        const response = await fetch("./data.json")
        const data = await response.json()
        for (let cafe of data) {
            let cafeNuevo = new Cafes(cafe.id, cafe.producto, cafe.precio, cafe.cantidad, cafe.imagen, cafe.tipo, cafe.descripcion)
            coffes.push(cafeNuevo)
        }
    }
    cargarCafes()
}
let carrito
carrito = JSON.parse(localStorage.getItem('carrito', carrito)) || []
let encontrarCards = []
let total = 0

function mostrarCards(array) {
    let cards = document.getElementById('cards')
    let tituloCatalogo = document.getElementById(`titCat`)
    tituloCatalogo.innerHTML = `<h1 class="tituloPrincipal catalogo">Nuestros mejores Cafés</h1>`
    cards.innerHTML = ""
    for (let cafe of array) {
        let siEsta = carrito.filter(el => cafe.producto == el.producto)
        if (siEsta.length > 0) {
            for (let el of siEsta) {
                cafe.cantidad = el.cantidad
                cafe.precio = el.precio
            }
            let nuevoElement = document.createElement('div')
            nuevoElement.innerHTML = ""
            nuevoElement.innerHTML += `<div class="card">
                                            <div class= "divImgText">
                                                <img src=${cafe.imagen} class= "card-img-top imagenCard" alt= "Imagen de ${cafe.producto}">
                                                <p class= "textImagen"> <span class= "spanImgText">${cafe.tipo} </span> <br>${cafe.descripcion}</p
                                            </div>
                                    <div class="card-body" id="card${cafe.id}">
                                        <h5 class="card-title">$<span class= "spanImgText">${cafe.id}</span>. ${cafe.producto}</h5>
                                        <h5 class="card-title"><span class= "spanImgText">Precio x 1/4 kg: </span>$${cafe.precio}</h5>
                                        <div id= "divCantidad${cafe.id}">
                                            <h5 class="card-title" id= "idCantidad${cafe.id}"><span class= "spanImgText">Cantidad: </span>${cafe.cantidad}</h5>
                                        </div>
                                        <div id= "textCard${cafe.id}">
                                        </div>
                                        <a class="btn btn-primary" id="btnAgregar${cafe.id}">Agregado</a>
                                    </div>
                                </div>`
            cards.appendChild(nuevoElement)
        } else {
            let nuevoElement = document.createElement('div')
            nuevoElement.innerHTML = ""
            nuevoElement.innerHTML += `<div class="card">
                                                <div class= "divImgText">
                                                    <img src=${cafe.imagen} class= "card-img-top imagenCard" alt= "Imagen de ${cafe.producto}">
                                                    <p class= "textImagen"> <span class= "spanImgText">${cafe.tipo} </span> <br>${cafe.descripcion}</p
                                                </div>
                                                <div class="card-body" id="card${cafe.id}">
                                                    <h5 class="card-title"><span class= "spanImgText">${cafe.id}.</span> ${cafe.producto}</h5>
                                                    <h5 class="card-title"><span class= "spanImgText">Precio x 1/4 kg:</span> $${cafe.precio}</h5>
                                                    <div id= "divCantidad${cafe.id}"></span>
                                                        <h5 class="card-title" id= "idCantidad${cafe.id}"><span class= "spanImgText">Cantidad:</span> <input type="num" class="inputProd" id="input${cafe.id}"></h5>
                                                    </div>
                                                    <div id= "textCard${cafe.id}">
                                                    </div>
                                                    <a class="btn btn-primary" id="btnAgregar${cafe.id}">Agregar al Carrito</a>
                                                </div>
                                            </div>`
            cards.appendChild(nuevoElement)
        }
        let btnAgregar = document.getElementById(`btnAgregar${cafe.id}`)
        btnAgregar.onclick = () => {
            AgregarAlCarrito(cafe, btnAgregar)
        }
        let btnCarrito = document.getElementById(`btnCarrito`)
        btnCarrito.onclick = () => {
            mostrarCarrito(carrito)
        }
    }
    let footerCatalogo = document.getElementById(`footerCatalogo`)
    footerCatalogo.innerHTML = `<div class="divFooter footerCat">
                                            <ul class="ulFooter">
                                                <li><a href="https://www.instagram.com/tiendadecafear/" target="_blank"><i class="fa-brands fa-instagram"></i></a></li>
                                                <li class="division">|</li>
                                                <li><a href="https://www.facebook.com/Tiendadecafe/" target="_blank"><i class="fa-brands fa-facebook-f"></i></a></li>
                                            </ul>
                                        </div>`
    formulario()
    comprobarInputForm()
    let btnEnviar = document.getElementById(`btnEnviar`)
    btnEnviar.onclick = () => {
        enviarFormulario()
    }
    let btnBorrar = document.getElementById(`btnBorrar`)
    btnBorrar.onclick = () => {
        borrarFormulario()
    }
    let opcion = document.getElementById(`opcion`)
    opcion.onchange = () => {
        ordenarPor(opcion, array)
    }
}

function AgregarAlCarrito(element, boton) {
    if (boton.innerText == 'Agregado') {
        Toastify({
            text: `Producto en Carrito`,
            duration: 1000,
            position: 'center',
            className: `btnToast`,
            style: {
                background: `red`
            }
        }).showToast();
    } else {
        let input = document.getElementById(`input${element.id}`)
        element.cantidad = parseInt(input.value)
        if (input.value > 0) {
            let textCard = document.getElementById(`textCard${element.id}`)
            textCard.innerHTML = ``
            carrito.push(element)
            carrito.sort((a, b) => a.id - b.id)
            boton.innerText = 'Agregado'
            let idCantidad = document.getElementById(`idCantidad${element.id}`)
            idCantidad.innerText = `Cantidad: ${element.cantidad}`
            localStorage.setItem('carrito', JSON.stringify(carrito))
        } else if (input.value == "" || input.value == 0) {
            let textCard = document.getElementById(`textCard${element.id}`)
            textCard.innerHTML = `<p class= "card-text textoRojo">*Datos Incompletos</p>`
        } else {
            let textCard = document.getElementById(`textCard${element.id}`)
            textCard.innerHTML = `<p class= "card-text textoRojo">*Dato Inválido</p>`
        }
    }
}

function mostrarCarrito(array) {
    total = 0
    let ulCarrito = document.getElementById(`ulCarrito`)
    ulCarrito.innerHTML = ""
    array.length == 0 && (ulCarrito.innerHTML = `<p class= "textoCarrVacio">(Carrito Vacío)</p>`)
    for (let el of array) {
        ulCarrito.innerHTML += `<li class="nav-item" id= "liCarrito${el.id}">
                                        <p><span class= "spanCarrito"> Id: </span>${el.id} <span class= "spanCarrito"> Producto: </span> ${el.producto} <span class= "spanCarrito"> Cantidad: </span> ${el.cantidad}<span class= "spanCarrito"> Precio: </span> $${el.precio*el.cantidad}</p> 
                                        <div class= "divBotones">
                                            <button class= "eliminar" id= "btnEliminar${el.id}"> <i class="fa-solid fa-trash"></i> </button> 
                                            <div class= "divMasMenos">
                                                <button class= "btn btn-primary btnGreen" id= "btnSumar${el.id}">+</button> <button class= "btn btn-primary btnRed" id= "btnRestar${el.id}">-</button
                                            </div>
                                        </div>
                                    </li>`
        total += el.precio * el.cantidad
    }
    let crearli = document.createElement('li')
    crearli.classList.add(`liFinalizarCompra`)
    ulCarrito.appendChild(crearli)
    if (ulCarrito.innerText == `(Carrito Vacío)`) {
        crearli.innerHTML = ""
    } else {
        crearli.innerHTML = `<p id= "total">Total: $${total}</p>
                            <button class= "btn btn-primary" id= "finCompra">Finalizar Compra</button>`
        finalizarCompra()
    }
    array.forEach((verd) => {
        let btnEliminar = document.getElementById(`btnEliminar${verd.id}`)
        btnEliminar.onclick = () => {
            eliminarProducto(array, verd, crearli)
        }
    })
    array.forEach((el) => {
        let btnSumar = document.getElementById(`btnSumar${el.id}`)
        btnSumar.onclick = () => {
            sumarProductos(el, array)
        }
    })
    array.forEach((el) => {
        let btnRestar = document.getElementById(`btnRestar${el.id}`)
        btnRestar.onclick = () => {
            restarProductos(el, array)
        }
    })
}

function eliminarProducto(arreglo, prod, crearli) {
    total -= prod.cantidad * prod.precio
    crearli.innerHTML = `<p id= "total">Total: $${total}</p>
                        <button class= "btn btn-primary" id= "finCompra">Finalizar Compra</button>`
    let liCarrito = document.getElementById(`liCarrito${prod.id}`)
    liCarrito.remove()
    arreglo.length == 1 ? arreglo.splice(0, 1) : arreglo.splice(arreglo.indexOf(prod), 1)
    arreglo.length == 0 ? (localStorage.removeItem('carrito'), localStorage.removeItem('cafes')) : (localStorage.setItem('carrito', JSON.stringify(arreglo)), localStorage.setItem('cafes', JSON.stringify(coffes)))
    mostrarCards(coffes)
    mostrarCarrito(arreglo)
}

function sumarProductos(element, array) {
    element.cantidad++
    localStorage.setItem('carrito', JSON.stringify(array))
    mostrarCards(coffes)
    mostrarCarrito(array)
}

function restarProductos(element, array) {
    element.cantidad == 1 ? element.cantidad = element.cantidad : element.cantidad--, localStorage.setItem('carrito', JSON.stringify(array)), mostrarCards(coffes), mostrarCarrito(array)
}

function buscarCards(array) {
    let buscadorCard = document.getElementById(`buscadorCard`)
    buscadorCard.oninput = () => {
        let carta = document.getElementById(`cards`)
        encontrarCards = array.filter(element => element.producto.toLowerCase().includes(buscadorCard.value.toLowerCase()))
        encontrarCards.length > 0 ? (carta.classList.add('cardsGrid'), mostrarCards(encontrarCards)) : (carta.classList.add('carta'), carta.classList.remove('cardsGrid'), carta.innerHTML = '<p class= "textoBuscar">No se encontro ningun producto con ese nombre.</p>')
    }
}

function finalizarCompra() {
    let finCompra = document.getElementById(`finCompra`)
    finCompra.onclick = () => {
        Swal.fire({
            icon: `info`,
            title: `Desea finalizar la compra?`,
            confirmButtonText: `Si`,
            denyButtonText: `No`,
            confirmButtonColor: `burlywood`,
            denyButtonColor: `burlywood`,
            showDenyButton: true,
            background: 'white',
            color: `black`
        }).then((result) => {
            if (result.isConfirmed) {
                let contador = 0
                const DateTime = luxon.DateTime
                const dt = DateTime.now()
                for (let el of carrito) {
                    contador += el.cantidad
                }
                let ulCarrito = document.getElementById(`ulCarrito`)
                ulCarrito.innerHTML = `<p class= "textoCarrVacio">(Carrito Vacío)</p>`
                Swal.fire({
                    title: 'Compra Exitosa!',
                    text: `Usted ha comprado a las ${dt.toLocaleString(DateTime.TIME_SIMPLE)} hs, ${contador} producto/s por $${total}.`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: `burlywood`,
                    background: 'white',
                    color: `black`
                })
                carrito.splice(0, carrito.length)
                localStorage.removeItem('carrito')
                localStorage.removeItem('cafes')
                mostrarCards(coffes)
            } else {
                Swal.fire({
                    icon: `warning`,
                    iconColor: `red`,
                    title: `Compra No Realizada`,
                    text: `Productos mantenidos en carrito.`,
                    confirmButtonText: `Aceptar`,
                })
            }
        })
    }
}

function ordenarPor(opcion, array) {
    if (opcion.value == 1) {
        array.sort((a, b) => a.precio - b.precio)
    } else if (opcion.value == 2) {
        array.sort(function (a, b) {
            if (a.producto < b.producto) {
                return -1;
            }
            if (a.producto > b.producto) {
                return 1;
            }
            return 0;
        })
    } else if (opcion.value == 3) {
        array.sort((a, b) => a.id - b.id)
    }
    localStorage.setItem('cafes', JSON.stringify(array))
    mostrarCards(array)
}

function spinnerCargar() {
    let cargando = document.getElementById(`cargando`)
    cargando.innerHTML = `  <div class="spinner-grow spinner" role="status">
                                <i class="fa-solid fa-mug-saucer taza"></i>
                                <p class= "textCargar">Cargando productos...</p>
                            </div>`
}

function formulario() {
    let subtitulo = document.getElementById(`subTitCat`)
    subtitulo.innerHTML = `<h2 class="subtituloPrincipal tituloForm">No encontras los cafés que te gustan?</h2>
                                    <p class= "textoForm">Escribinos recomendándonos un café para agregar.</p>
                                    <div class="mb-3">
                                        <label for="nombre" class="form-label">Nombre Completo:</label>
                                        <input type="text" class="form-control formulario-control" id="nombre" placeholder="Ingrese su nombre completo">
                                        <div id= "divNombre" class= "divForm"></div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="telefono" class="form-label">Teléfono:</label>
                                        <input type= "tel" class= "form-control formulario-control" id= "telefono" placeholder= "Ingrese su teléfono">
                                        <div id= "divTel" class= "divForm"></div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="mail" class="form-label">Mail:</label>
                                        <input type="email" class="form-control formulario-control" id="mail" placeholder="Ingrese su Mail">
                                        <div id= "divMail" class= "divForm"></div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="recomend" class="form-label">Recomiende su café:</label>
                                        <textarea class="form-control formulario-control" id="recomend" rows="3"></textarea>
                                        <div id= "divRecomend" class= "divForm"></div>
                                    </div>
                                    <div class= "mb-3">
                                        <button type= "submit" class= "btn form" id= "btnEnviar">Enviar</button>
                                        <button type= "reset" class= "btn form" id= "btnBorrar">Borrar</button>
                                    </div>`
}

function comprobarInputForm() {
    let formularioControl = document.getElementsByClassName(`formulario-control`)
    let divForm = document.getElementsByClassName(`divForm`)
    for (let i = 0; i <= 3; i++) {
        formularioControl[i].oninput = () => {
            if (formularioControl[i].value != "") {
                divForm[i].innerHTML = ""
            }
        }
    }
}

function enviarFormulario() {
    let nombre = document.getElementById(`nombre`)
    let telefono = document.getElementById(`telefono`)
    let mail = document.getElementById(`mail`)
    let divNombre = document.getElementById(`divNombre`)
    let divTelefono = document.getElementById(`divTel`)
    let divMail = document.getElementById(`divMail`)
    let divRecomend = document.getElementById(`divRecomend`)
    let recomend = document.getElementById(`recomend`)
    if (nombre.value == "" || telefono.value == "" || mail.value == "" || recomend.value == "") {
        if (nombre.value == "") {
            divNombre.innerHTML = `<p class= "textoRojo">*Datos Incompletos</p>`
        } else {
            divNombre.innerHTML = ``
        }
        if (telefono.value == "") {
            divTelefono.innerHTML = `<p class= "textoRojo">*Datos Incompletos</p>`
        } else {
            divTelefono.innerHTML = ``
        }
        if (mail.value == "") {
            divMail.innerHTML = `<p class= "textoRojo">*Datos Incompletos</p>`
        } else {
            divMail.innerHTML = ``
        }
        if (recomend.value == "") {
            divRecomend.innerHTML = `<p class= "textoRojo">*Datos Incompletos</p>`
        } else {
            divRecomend.innerHTML = ``
        }
    } else {
        divNombre.innerHTML = ``
        divTelefono.innerHTML = ``
        divMail.innerHTML = ``
        divRecomend.innerHTML = ``
        nombre.value = ""
        telefono.value = ""
        mail.value = ""
        recomend.value = ""
        Swal.fire({
            icon: `success`,
            title: `Enviado correctamente!`,
            text: `Gracias por recomendar productos! Nos ayuda a mejorar.`,
            confirmButtonText: `Aceptar`,
            confirmButtonColor: `burlywood`,
            background: 'white',
            color: `black`
        })
    }
}

function borrarFormulario() {
    let nombre = document.getElementById(`nombre`)
    let telefono = document.getElementById(`telefono`)
    let mail = document.getElementById(`mail`)
    let recomend = document.getElementById(`recomend`)
    nombre.value = ""
    telefono.value = ""
    mail.value = ""
    recomend.value = ""
}
setTimeout(() => {
    cargando.remove()
    mostrarCards(coffes)
}, 2000)
spinnerCargar()
mostrarCarrito(carrito)
buscarCards(coffes)