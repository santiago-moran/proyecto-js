/* VARIABLES GENERALES */
class Libros {
    constructor(autor, titulo, precio) {
        this.autor = autor.toUpperCase()
        this.titulo = titulo.toUpperCase()
        this.precio = precio
    }
    mostrarLibro () {
        console.log (`${this.titulo.toUpperCase()}, de ${this.autor.toUpperCase()}. Precio: $${this.precio}`)
    }
}
const libro1 = new Libros(`Santiago Moran`, `Las Pulgas Locas`, 1500)
const libro2 = new Libros(`Agustina Rivero`, `Toxicidad Pura`, 1850)
const libro3 = new Libros(`Ignacio Moran`, `Lucha con los Brazos`, 1435)
const libro4 = new Libros(`Zoel Reising`, `El Mal de Amores`, 1100)
const libro5 = new Libros(`Paula Guinard`, `Folklore para Tod@s`, 1320)

const biblioteca = [libro1, libro2, libro3, libro4, libro5]

/* VARIABLES LOCALES */
function presentacion() {
    let nombre = prompt((`Bienvenido. Ingrese su nombre, por favor: `))
    alert(`Hola ${nombre}. Espero que puedas disfrutar este simulador :)`)
}

function opcionSwitch() {
    let elegirOpcion = parseInt(prompt(`Por favor, elija una opcion: \n\n1. Ver catálogo de libros\n2. Agregar un nuevo libro al catálogo\n3. Buscar libro por titulo\n4. Buscar libro por precio\n5. Buscar libro por autor\n6. Ver titulos incluidos en el catálogo\n7. Ordenar catalogo de menor a mayor precio\n8. Eliminar un libro del catalogo\n9. Finalizar programa`))
    switch (elegirOpcion) {
        case 1:
            verCatalogoLibros()
            break;
        case 2:
            agregarNuevoLibro()
            break;
        case 3:
            buscarTitulo()
            break;
        case 4:
            buscarPrecio()
            break;
        case 5:
            buscarAutor()
            break;
        case 6: 
            verTitulos()
            break;
        case 7:
            ordenarMenorMayor()
            break;
        case 8:
            eliminarLibro()
            break;
        case 9: 
            alert(`PROCEDIENDO A SALIR DEL PROGRAMA`)
            break;
        default:
            alert(`OPCION INEXISTENTE`)
            opcionSwitch()
        break;
    }
}

function verCatalogoLibros() {
    console.log(`Catalogo de libros:`)
    for (const element of biblioteca) {
        element.mostrarLibro()
    }
    console.log(` \n`)
    alert(`Mostrando lista en consola`)
    alert(`Volviendo al menú principal...`)
    opcionSwitch()
}

function agregarNuevoLibro() {
    let nuevoTitulo = prompt(`Por favor, ingrese el título de su nuevo libro: `)
    const tituloRep = biblioteca.some( element => element.titulo == nuevoTitulo)
    while (tituloRep == true) {
        nuevoTitulo = prompt(`Ese titulo ya existe. Por favor, ingrese otro titulo:`)
        tituloRep = biblioteca.some( element => element.titulo == nuevoTitulo)
    }
    let nuevoAutor = prompt(`Por favor, ingrese el autor de su nuevo libro: `)
    let nuevoPrecio = parseInt(prompt(`Por favor, ingrese el precio de su nuevo libro: `))
    const libroNuevo = new Libros(nuevoAutor, nuevoTitulo, nuevoPrecio)
    biblioteca.push(libroNuevo)
    alert(`Mostrando nuevo catalogo en consola`)
    console.log(`Nuevo catálogo de libros: `)
    for (const elemento of biblioteca) {
        elemento.mostrarLibro()
    }
    console.log(" \n")
    alert(`Volviendo al menú principal...`)
    opcionSwitch()
}

function buscarTitulo() {
    let nombreTitulo = prompt(`Ingrese el titulo del libro que desea buscar: `)
    let filtrarTitulo = biblioteca.filter((libro) => libro.titulo.toLowerCase().includes(nombreTitulo.toLowerCase()))
    while (filtrarTitulo.length == 0) {
        nombreTitulo = prompt(`El titulo ${nombreTitulo} no se encuentra en el catálogo. Ingrese otro titulo: `)
        filtrarTitulo = biblioteca.filter((libro) => libro.titulo.includes(nombreTitulo))
    }
    if (filtrarTitulo.length == 0) {
        alert(`BUSQUEDA FINALIZADA: NINGUN LIBRO ENCONTRADO`)
        alert(`Volviendo al menú principal...`)
        opcionSwitch()
    } else {
        console.log(`Se ha encontrado el siguiente libro con ese titulo: `)
        filtrarTitulo.forEach( element => element.mostrarLibro())
        console.log(` \n`)
        alert(`Volviendo al menú principal...`)
        opcionSwitch()
    }
}

function buscarPrecio() {
    let precioLibro = parseFloat(prompt(`Ingrese el precio del libro que desea buscar: `))
    let filtrarPrecio = biblioteca.filter((libro) => libro.precio == (precioLibro))
    while (filtrarPrecio.length == 0) {
        precioLibro = parseFloat(prompt(`El precio indicado no coincide con ningun libro en el catálogo. Ingrese otro precio: `))
        filtrarPrecio = biblioteca.filter((libro) => libro.precio == (parseFloat(precioLibro)))
    }
    if (filtrarPrecio.length == 0) {
        alert(`BUSQUEDA FINALIZADA: NINGUN LIBRO ENCONTRADO`)
        alert(`Volviendo al menú principal...`)
        opcionSwitch()
    } else {
        console.log(`Se ha encontrado el siguiente libro con ese precio: `)
        filtrarPrecio.forEach( element => element.mostrarLibro())
        console.log(` \n`)
        alert(`Volviendo al menú principal...`)
        opcionSwitch()
    }
}

function buscarAutor() {
    let nombreAutor = prompt(`Ingrese el nombre del autor del libro que desea buscar: `)
    let filtrarNombre = biblioteca.filter((libro) => libro.autor.toLowerCase().includes(nombreAutor.toLowerCase()))
    while (filtrarNombre.length == 0) {
        nombreAutor = prompt(`El autor ${nombreAutor} no se encuentra en el catálogo. Ingrese otro autor: `)
        filtrarNombre = biblioteca.filter((libro) => libro.autor.toUpperCase().includes(nombreAutor.toUpperCase()))
        }
    if (filtrarNombre.length == 0) {
        alert(`Volviendo al menú principal...`)
        opcionSwitch()
    } 
    else {
        console.log(`Se ha encontrado el siguiente libro con ese autor: `)
        filtrarNombre.forEach( element => element.mostrarLibro())
    }
    console.log(` \n`)
    alert(`Volviendo al menú principal...`)
    opcionSwitch()
}
function verTitulos() {
    console.log(`Titulos incluidos en el catálogo:`)
    biblioteca.forEach( book => {console.log(book.titulo.toUpperCase())})
    console.log(` \n`)
    alert(`Volviendo al menú principal...`)
    opcionSwitch()
}
function ordenarMenorMayor() {
    console.log(`Catalogo ordenado de menor a mayor precio:`)
    biblioteca.sort( (a, b) => a.precio - b.precio )
    for (const books of biblioteca) {
        books.mostrarLibro()
    }
    console.log(`\n`)
    alert(`Volviendo al menú principal...`)
    opcionSwitch()
}
function eliminarLibro() {
    let band = false
    let deleteBook = prompt(`Ingrese el titulo del libro que desea eliminar:`)
    for (const el of biblioteca) {
        if (el.titulo.toUpperCase() == deleteBook.toUpperCase()) {
            let preguntaSegura = prompt(`Esta seguro/a que desea eliminar este libro? (Responder si o no)`)
            while (preguntaSegura != 'si' && preguntaSegura != 'no') {
                preguntaSegura = prompt(`Debe responder si o no. Ingrese nuevamente una respuesta:`)
            }
            if (preguntaSegura.toLowerCase() == "si") {
                band = true
                biblioteca.splice(biblioteca.indexOf(el), 1)
            }
            else if (preguntaSegura.toLowerCase() == "no") {
                eliminarLibro()
            }
        }
    }
    while (band == false) {
        deleteBook = prompt(`No se ha encontrado ningun libro con ese titulo. Ingrese un nuevo titulo:`)
        for (const el of biblioteca) {
            if (el.titulo.toUpperCase() == deleteBook.toUpperCase()) {
                band = true
                biblioteca.splice(biblioteca.indexOf(el), 1)
            }
        }
    }
    if (band == true) {
        console.log(`Nuevo catalogo de libros:`)
        biblioteca.forEach( element => element.mostrarLibro())
        console.log(` \n`)
        alert(`Volviendo al menu principal...`)
        opcionSwitch()
    }
}
presentacion()
opcionSwitch()