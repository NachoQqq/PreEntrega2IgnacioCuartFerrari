function solicitarNombre() {
    let nombre = '';
    while (nombre === '') {
        nombre = prompt('Ingrese su Nombre');
        if (nombre === '') {
            alert('Por favor complete el campo con su nombre');
        }
    }
    return nombre;
}

function solicitarApellido() {
    let apellido = '';
    while (apellido === '') {
        apellido = prompt('Ingrese su Apellido');
        if (apellido === '') {
            alert('Por favor complete el campo con su apellido');
        }
    }
    return apellido;
}

function solicitarEdad() {
    let edad = 0;
    while (edad <= 0) {
        edad = Number(prompt('Ingrese su edad:'));
        if (edad <= 0) {
            alert('Por favor, ingrese una edad válida');
        }
    }
    return edad;
}

function evaluarEdad(edad, nombreCompleto) {
    if (edad >= 18) {
        alert('Felicidades ' + nombreCompleto + ', tiene edad suficiente para ingresar a la web');
        console.log('Mostrar productos');

        if (edad >= 65) {
            alert('Usted es elegible para un cupón de descuento de 15% en toda la web');
        }
    } else {
        alert('Usted no tiene la edad suficiente para ingresar a esta web');
        console.log('Ocultar productos');
    }
}

function seleccionarProducto(carrito) {
    const productos = [
        { nombre: 'Zapatillas', precio: 100, talles: [38, 41, 44], colores: ['Rojo', 'Azul', 'Negro'] },
        { nombre: 'Sudaderas', precio: 50, talles: ['S', 'M', 'L'], colores: ['Blanco', 'Gris', 'Negro'] }
    ];

    let seleccion = prompt('¿Qué producto desea comprar? (Zapatillas/Sudaderas)').toLowerCase();

    let productoSeleccionado = productos.filter(producto => producto.nombre.toLowerCase() === seleccion)[0];

    if (productoSeleccionado) {
        let talle = prompt(`Ingrese el talle (${productoSeleccionado.talles.join(', ')}):`);
        let color = prompt(`Ingrese el color (${productoSeleccionado.colores.join(', ')}):`);
        alert(`Usted ha seleccionado ${productoSeleccionado.nombre} de talle ${talle} y color ${color} por $${productoSeleccionado.precio}`);

        if (!carrito[productoSeleccionado.nombre]) {
            carrito[productoSeleccionado.nombre] = { cantidad: 0, precio: 0, detalles: [] };
        }

        carrito[productoSeleccionado.nombre].cantidad++;
        carrito[productoSeleccionado.nombre].precio += productoSeleccionado.precio;
        carrito[productoSeleccionado.nombre].detalles.push({ talle, color });

        let comprarOtra = prompt('¿Desea comprar otro producto? (Sí/No)').toLowerCase();
        if (comprarOtra === 'sí' || comprarOtra === 'si') {
            seleccionarProducto(carrito);
        } else {
            let resumen = 'Usted ha comprado:\n';
            let total = 0;
            for (let producto in carrito) {
                resumen += `${carrito[producto].cantidad} ${producto}(s) por $${carrito[producto].precio}\n`;
                carrito[producto].detalles.forEach(detalle => {
                    resumen += `- Talle: ${detalle.talle}, Color: ${detalle.color}\n`;
                });
                total += carrito[producto].precio;
            }
            resumen += `Total: $${total}`;
            alert(resumen);
            alert('Gracias por su compra');
        }
    } else {
        alert('Producto no disponible');
    }
}

function iniciarProceso() {
    let nombre = solicitarNombre();
    let apellido = solicitarApellido();
    let nombreCompleto = nombre + ' ' + apellido;
    
    let edad = solicitarEdad();
    evaluarEdad(edad, nombreCompleto);
    
    console.log(`Bienvenido ${nombreCompleto}`);
    
    let carrito = {};
    seleccionarProducto(carrito);
}

iniciarProceso();
