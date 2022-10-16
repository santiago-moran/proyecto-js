let nombre = prompt('Ingrese su nombre: ')
let msjFinal = 'Gracias por usar el simulador. Recargue la página para elegir otra opcion diferente.'
alert('Hola ' + nombre + ', bienvenido a este simulador, correspondiente a la primer entrega del proyecto de CoderHouse. Que lo disfrutes.')

function pedirDatos() {
    let opcion = parseInt(prompt('1. Calcular nota final de alumnos.\n2. Conocer la tabla de multiplicar de un numero.\n3. Precio total de productos seleccionados.\n\nDigitar un numero, segun la opcion elegida: '))
    return opcion
}

function mostrarDatos() {
    let opciones = pedirDatos()
    switch (opciones) {
        case 1:
            alert('Usted ha elegido la opcion 1: calcular nota final de alumnos. Que lo disfrute :)')
            let cantAlumnos = parseInt(prompt('Ingrese la cantidad de alumnos que desea usar: '))
            while(cantAlumnos<=0) {
                cantAlumnos = parseInt(prompt('Cantidad invalida, debe ser mayor a 0. Ingrese nuevamente la cantidad: '))
            }
            for (i = 1; i <= cantAlumnos; i++) {
                let nota1 = parseFloat(prompt(`Alumno ${i}, ingrese su primer nota: `))
                while (nota1 < 1 || nota1 > 10) {
                    nota1 = parseFloat(prompt('Nota inválida. Debe ser del 1 al 10. Ingrese nuevamente la nota: '))
                }
                let nota2 = parseFloat(prompt(`Alumno ${i}, ingrese su segunda nota: `))
                while (nota2 < 1 || nota2 > 10) {
                    nota2 = parseFloat(prompt('Nota inválida. Debe ser del 1 al 10. Ingrese nuevamente la nota: '))
                }
                let nota3 = parseFloat(prompt(`Alumno ${i}, ingrese su tercer nota: `))
                while (nota3 < 1 || nota3 > 10) {
                    nota3 = parseFloat(prompt('Nota inválida. Debe ser del 1 al 10. Ingrese nuevamente la nota: '))
                }
                let sumaNota = nota1 + nota2 + nota3
                let promedio = sumaNota / 3
                if (promedio >= 4) {
                    alert(`Felicidades, su promedio final es ${promedio.toFixed(2)}. Usted aprobó la materia`)
                } else {
                    alert(`Lo sentimos mucho, su promedio es ${promedio.toFixed(2)}. Usted desaprobó la materia`)
                }
            }
            alert(msjFinal)
            break;
        case 2:
            alert('Usted ha elegido la opcion 2: conocer la tabla de multiplicar de un número. Que lo disfrute :)')
            let numTabla = parseInt(prompt('Digite el numero del cual desea saber la tabla: '))
            while (numTabla<0) {
                numTabla = prompt('El numero debe ser mayor o igual a cero. Ingrese nuevamente un numero: ')
            }
            console.log(`Tabla del ${numTabla}: \n\n`)
            for (let i = 0; i<=10;i++) {
                let resultado = numTabla*i
                console.log(`${numTabla} X ${i} = ${resultado}`)
            }
            let siNo = prompt('Desea saber la tabla de multiplicar del resto de los números, del 1 al 10? (Responder si o no): ')
            if (siNo.toLowerCase() == 'si') {
                for (i = 1; i<=10; i++) {
                    if (i == numTabla) {
                        continue
                    }
                    console.log(`\n\nTabla del ${i}: \n\n`)
                    for (let j = 0; j <= 10; j++) {
                        let resultado2 = i*j
                        console.log(`${i} x ${j} = ${resultado2}`)
                    }
                }
                alert(msjFinal)
            }
            else {
                alert(msjFinal)
            }
            break;
        case 3:
            let contadorProductos = ""
            let sumaTotal = 0
            alert('Usted ha elegido la opcion 3: precio total de productos seleccionados. Que lo disfrute :)')
            let agregarProducto = prompt('Desea agregar un producto a su carrito? (Responda si o no)')
            if (agregarProducto.toLowerCase()=='si') {
                let nombreProducto = prompt ('Ingrese el nombre del producto: ')
                let precioProducto = parseInt(prompt('Ingrese el precio del producto (Sin el signo "$"): '))
                while(precioProducto<=0) {
                    precioProducto = parseInt(prompt('Precio invalido, debe ser mayor a 0. Ingrese nuevamente el precio: '))
                }
                sumaTotal += precioProducto
                contadorProductos +=  nombreProducto + ' = ' + '$' + precioProducto
                agregarProducto = prompt('Desea seguir agregando productos? (Responda si o no)')
                if (agregarProducto.toLowerCase()=='no') {
                    contadorProductos = nombreProducto + ' = ' + '$' + precioProducto
                    alert(`Productos elegidos\n\n${contadorProductos}.\n\nEl monto total es de $${sumaTotal}`)
                    alert(msjFinal)
                }
                else {
                    while (agregarProducto.toLowerCase()=='si') {
                        nombreProducto = prompt ('Ingrese el nombre del producto: ')
                        precioProducto = parseInt(prompt('Ingrese el precio del producto(Sin el signo "$"): '))
                        while(precioProducto<=0) {
                            precioProducto = parseInt(prompt('Precio invalido, debe ser mayor a 0. Ingrese nuevamente el precio: '))
                        }
                        sumaTotal += precioProducto
                        contadorProductos += ', ' + nombreProducto + ' = ' + '$' + precioProducto
                        agregarProducto = prompt('Desea seguir agregando productos? (Responda si o no)')
                    }
                    alert(`Productos elegidos\n\n${contadorProductos}.\n\nEl monto total es de $${sumaTotal}`)
                    alert(msjFinal)
                }
            }
            else {
                alert(msjFinal)
            }
            break;
        default:
            alert('Error en el programa. Número no válido. Debe recargar la página')
            break;
    }
}
mostrarDatos()