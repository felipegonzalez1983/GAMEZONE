console.log("ESTE ES MI MAIN.JS");
/* =========================================
   ARREGLO DE PRODUCTOS
========================================= */

const productos = [
    {
        id: 1,
        codigo: "CON001",
        nombre: "PlayStation 5",
        categoria: "Consolas",
        plataforma: "PlayStation",
        precio: 599990,
        stock: 8,
        imagen: "IMG/ps5.jpg",
        descripcion: "Consola PlayStation 5 con control inalámbrico incluido."
    },
    {
        id: 2,
        codigo: "CON002",
        nombre: "Xbox Series X",
        categoria: "Consolas",
        plataforma: "Xbox",
        precio: 549990,
        stock: 6,
        imagen: "IMG/xbox.jpg",
        descripcion: "Consola Xbox Series X con almacenamiento SSD."
    },
    {
        id: 3,
        codigo: "CON003",
        nombre: "Nintendo Switch OLED",
        categoria: "Consolas",
        plataforma: "Nintendo",
        precio: 349990,
        stock: 10,
        imagen: "IMG/nintendo.jpg",
        descripcion: "Consola Nintendo Switch con pantalla OLED."
    },
    {
        id: 4,
        codigo: "ACC001",
        nombre: "Control inalámbrico",
        categoria: "Accesorios",
        plataforma: "PlayStation",
        precio: 69990,
        stock: 15,
        imagen: "IMG/control.jpg",
        descripcion: "Control inalámbrico compatible con PlayStation 5."
    },
    {
        id: 5,
        codigo: "ACC002",
        nombre: "Audífonos Gamer",
        categoria: "Accesorios",
        plataforma: "PC",
        precio: 39990,
        stock: 12,
        imagen: "IMG/audifonos.jpg",
        descripcion: "Audífonos gamer con micrófono y sonido envolvente."
    },
    {
        id: 6,
        codigo: "ACC003",
        nombre: "Teclado Mecánico RGB",
        categoria: "Accesorios",
        plataforma: "PC",
        precio: 49990,
        stock: 9,
        imagen: "IMG/teclado.jpg",
        descripcion: "Teclado mecánico con iluminación RGB."
    }
];


/* =========================================
   RECUPERAR CARRITO DE LOCALSTORAGE
========================================= */

let carrito = JSON.parse(
    localStorage.getItem("carritoGameZone")
) || [];


/* =========================================
   FORMATEAR PRECIOS CHILENOS
========================================= */

function formatearPrecio(precio) {

    return precio.toLocaleString("es-CL", {
        style: "currency",
        currency: "CLP"
    });

}


/* =========================================
   MOSTRAR PRODUCTOS DESTACADOS
========================================= */

function mostrarProductosDestacados() {

    const contenedor =
        document.getElementById("productos-destacados");

    if (contenedor === null) {
        return;
    }

    contenedor.innerHTML = "";

    const productosDestacados = productos.slice(0, 3);

    productosDestacados.forEach(function (producto) {

        contenedor.innerHTML += `
            <article class="col-lg-4 col-md-6 mb-4">

                <div class="card tarjeta-producto">

                    <div class="producto-imagen">

                        <img
                            src="${producto.imagen}"
                            alt="${producto.nombre}"
                            class="imagen-consola">

                    </div>

                    <div class="card-body">

                        <span class="badge bg-dark mb-2">
                            ${producto.plataforma}
                        </span>

                        <h3 class="card-title">
                            ${producto.nombre}
                        </h3>

                        <p class="card-text">
                            ${producto.descripcion}
                        </p>

                        <p>
                            Stock disponible:
                            <strong>${producto.stock}</strong>
                        </p>

                        <h4>
                            ${formatearPrecio(producto.precio)}
                        </h4>

                        <div class="d-grid gap-2">

                            <button
                                class="btn btn-outline-dark"
                                onclick="verProducto(${producto.id})">

                                Ver detalle

                            </button>

                            <button
                                class="btn btn-warning"
                                onclick="agregarAlCarrito(${producto.id})">

                                Añadir al carrito

                            </button>

                        </div>

                    </div>

                </div>

            </article>
        `;

    });

}


/* =========================================
   MOSTRAR TODOS LOS PRODUCTOS
========================================= */

function mostrarTodosLosProductos() {

    const contenedor =
        document.getElementById("lista-productos");

    const mensaje =
        document.getElementById("mensaje-sin-productos");

    if (contenedor === null) {
        return;
    }

    // Obtener los valores del buscador y del filtro
    const buscador =
        document.getElementById("buscador-productos");

    const filtro =
        document.getElementById("filtro-categoria");


    const textoBusqueda =
        buscador ? buscador.value.toLowerCase().trim() : "";

    const categoriaSeleccionada =
        filtro ? filtro.value : "Todos";


    // Filtrar productos
    const productosFiltrados =
        productos.filter(function (producto) {

            const coincideBusqueda =
                producto.nombre.toLowerCase().includes(textoBusqueda) ||
                producto.descripcion.toLowerCase().includes(textoBusqueda) ||
                producto.categoria.toLowerCase().includes(textoBusqueda) ||
                producto.plataforma.toLowerCase().includes(textoBusqueda);

            const coincideCategoria =
                categoriaSeleccionada === "Todos" ||
                producto.categoria === categoriaSeleccionada;


            return coincideBusqueda && coincideCategoria;

        });


    // Limpiar productos anteriores
    contenedor.innerHTML = "";


    // Mostrar mensaje si no hay resultados
    if (productosFiltrados.length === 0) {

        if (mensaje !== null) {
            mensaje.classList.remove("d-none");
        }

        return;

    }


    // Ocultar mensaje
    if (mensaje !== null) {
        mensaje.classList.add("d-none");
    }


    // Mostrar productos filtrados
    productosFiltrados.forEach(function (producto) {

        contenedor.innerHTML += `
            <article class="col-lg-4 col-md-6 mb-4">

                <div class="card tarjeta-producto">

                    <div class="producto-imagen">

                        <img
                            src="${producto.imagen}"
                            alt="${producto.nombre}"
                            class="imagen-consola">

                    </div>

                    <div class="card-body">

                        <span class="badge bg-dark mb-2">
                            ${producto.categoria}
                        </span>

                        <h3 class="card-title">
                            ${producto.nombre}
                        </h3>

                        <p class="card-text">
                            ${producto.descripcion}
                        </p>

                        <p>
                            Plataforma:
                            <strong>${producto.plataforma}</strong>
                        </p>

                        <p>
                            Stock:
                            <strong>${producto.stock}</strong>
                        </p>

                        <h4>
                            ${formatearPrecio(producto.precio)}
                        </h4>

                        <div class="d-grid gap-2">

                            <button
                                class="btn btn-outline-dark"
                                onclick="verProducto(${producto.id})">

                                Ver detalle

                            </button>

                            <button
                                class="btn btn-warning"
                                onclick="agregarAlCarrito(${producto.id})">

                                Añadir al carrito

                            </button>

                        </div>

                    </div>

                </div>

            </article>
        `;

    });

}


/* =========================================
   VER DETALLE DE UN PRODUCTO
========================================= */

function verProducto(idProducto) {

    localStorage.setItem(
        "productoSeleccionado",
        idProducto
    );

    window.location.href =
        "detalle-producto.html?id=" + idProducto;

}

/* =========================================
   MOSTRAR DETALLE DEL PRODUCTO 
========================================= */

function mostrarDetalleProducto() {

    const contenedor =
        document.getElementById("detalle-producto");

    const mensajeNoEncontrado =
        document.getElementById("producto-no-encontrado");

        // Si esta funcion se ejecuta en otra pagina,
        // Simplemente no hacemos nada.
        if (contenedor === null){
            return;
        }

        // Obtener el ID desde la URL
        const urlParams = 
            new URLSearchParams(window.location.search);

        const idProducto = 
            parseInt(urlParams.get("id"));

        // Buscar el producto en el arreglo
        const producto = 
            productos.find(function (producto) {
                return producto.id === idProducto;
            });

        // Si no existe el producto
        if (producto === undefined) {
            contenedor.innerHTML = "";
            if (mensajeNoEncontrado !== null) {
                mensajeNoEncontrado.classList.remove("d-none");
            }
            return;
        }

        // Ocultar mensaje de error
        if (mensajeNoEncontrado !== null) {
            mensajeNoEncontrado.classList.add("d-none");
        }

        // Mostrar informacion del producto
        contenedor.innerHTML = `
                <div class="row g-5 align-items-start">

            <!-- IMAGEN DEL PRODUCTO -->

            <div class="col-lg-6">

                <div class="producto-detalle-imagen">

                    <img
                        src="${producto.imagen}"
                        alt="${producto.nombre}"
                        class="img-fluid">

                </div>

            </div>


            <!-- INFORMACIÓN DEL PRODUCTO -->

            <div class="col-lg-6">

                <span class="badge bg-dark mb-3">
                    ${producto.categoria}
                </span>

                <h1 class="mb-3">
                    ${producto.nombre}
                </h1>

                <h2 class="precio-producto mb-4">
                    ${formatearPrecio(producto.precio)}
                </h2>

                <hr>

                <p class="descripcion-producto">
                    ${producto.descripcion}
                </p>

                <p>
                    <strong>Plataforma:</strong>
                    ${producto.plataforma}
                </p>

                <p>
                    <strong>Código:</strong>
                    ${producto.codigo}
                </p>

                <p>
                    <strong>Stock disponible:</strong>
                    ${producto.stock}
                </p>


                <!-- CANTIDAD -->

                <div class="mb-4">

                    <label
                        for="cantidad-producto"
                        class="form-label">

                        Cantidad

                    </label>

                    <input
                        id="cantidad-producto"
                        type="number"
                        class="form-control"
                        value="1"
                        min="1"
                        max="${producto.stock}">

                </div>


                <!-- BOTÓN -->

                <button
                    class="btn btn-warning btn-lg w-100"
                    onclick="agregarProductoDesdeDetalle(${producto.id})">

                    Añadir al carrito

                </button>

            </div>

        </div>

    `;

}

/* =========================================
   AGREGAR PRODUCTO DESDE DETALLE
========================================= */

function agregarProductoDesdeDetalle(idProducto) {

    const campoCantidad =
        document.getElementById("cantidad-producto");

    const cantidad = 
        parseInt(campoCantidad.value);

    if (isNaN(cantidad) || cantidad < 1) {
        alert("Ingresa una cantidad válida.");
        return;
    }

    agregarAlCarrito(idProducto, cantidad);

}

/* =========================================
   AGREGAR PRODUCTO AL CARRITO
========================================= */

function agregarAlCarrito(idProducto, cantidad = 1) {

    const productoEncontrado =
        productos.find(function (producto) {

            return producto.id === idProducto;

        });


    if (productoEncontrado === undefined) {

        alert("El producto no fue encontrado.");

        return;

    }


    if (productoEncontrado.stock <= 0) {

        alert("Este producto no tiene stock.");

        return;

    }


    const productoEnCarrito =
        carrito.find(function (producto) {

            return producto.id === idProducto;

        });


if (productoEnCarrito) {

    const nuevaCantidad =
        productoEnCarrito.cantidad + cantidad;


    if (nuevaCantidad > productoEncontrado.stock) {

        alert(
            "No puedes agregar más de " +
            productoEncontrado.stock +
            " unidades."
        );

        return;

    }


    productoEnCarrito.cantidad = nuevaCantidad;

} else {

    if (cantidad > productoEncontrado.stock) {

        alert(
            "Solo hay " +
            productoEncontrado.stock +
            " unidades disponibles."
        );

        return;

    }


    carrito.push({

        id: productoEncontrado.id,

        nombre: productoEncontrado.nombre,

        precio: productoEncontrado.precio,

        imagen: productoEncontrado.imagen,

        cantidad: cantidad

    });

}


    guardarCarrito();

    alert(
        productoEncontrado.nombre +
        " fue añadido al carrito."
    );

}


/* =========================================
   GUARDAR CARRITO
========================================= */

function guardarCarrito() {

    localStorage.setItem(
        "carritoGameZone",
        JSON.stringify(carrito)
    );

    actualizarCantidadCarrito();

}


/* =========================================
   MOSTRAR CANTIDAD DEL CARRITO
========================================= */

function actualizarCantidadCarrito() {

    const contador =
        document.getElementById("cantidad-carrito");

    if (contador === null) {
        return;
    }


    const cantidadTotal =
        carrito.reduce(function (total, producto) {

            return total + producto.cantidad;

        }, 0);


    contador.textContent = cantidadTotal;

}


/* =========================================
   ELIMINAR PRODUCTO DEL CARRITO
========================================= */

function eliminarDelCarrito(idProducto) {

    carrito = carrito.filter(function (producto) {

        return producto.id !== idProducto;

    });

    guardarCarrito();
    mostrarCarrito();

}


/* =========================================
   CAMBIAR CANTIDAD DEL PRODUCTO
========================================= */

function cambiarCantidad(idProducto, nuevaCantidad) {

    const cantidad = parseInt(nuevaCantidad);

    const productoCarrito =
        carrito.find(function (producto) {

            return producto.id === idProducto;

        });


    const productoOriginal =
        productos.find(function (producto) {

            return producto.id === idProducto;

        });


    if (!productoCarrito || !productoOriginal) {
        return;
    }


    if (cantidad <= 0) {

        eliminarDelCarrito(idProducto);

        return;

    }


    if (cantidad > productoOriginal.stock) {

        alert(
            "Solo quedan " +
            productoOriginal.stock +
            " unidades disponibles."
        );

        mostrarCarrito();

        return;

    }


    productoCarrito.cantidad = cantidad;

    guardarCarrito();
    mostrarCarrito();

}


/* =========================================
   MOSTRAR CARRITO
========================================= */

function mostrarCarrito() {

    const contenedor =
        document.getElementById("productos-carrito");

    const elementoTotal =
        document.getElementById("total-carrito");


    if (contenedor === null || elementoTotal === null) {
        return;
    }


    if (carrito.length === 0) {

        contenedor.innerHTML = `
            <div class="alert alert-secondary text-center">

                Tu carrito está vacío.

                <br><br>

                <a
                    href="productos.html"
                    class="btn btn-warning">

                    Ver productos

                </a>

            </div>
        `;

        elementoTotal.textContent = formatearPrecio(0);

        return;

    }


    contenedor.innerHTML = "";

    let totalCarrito = 0;


    carrito.forEach(function (producto) {

        const subtotal =
            producto.precio * producto.cantidad;

        totalCarrito += subtotal;


        contenedor.innerHTML += `
            <article class="card mb-3">

                <div class="row g-0 align-items-center">

                    <div class="col-md-3">

                        <img
                            src="${producto.imagen}"
                            alt="${producto.nombre}"
                            class="img-fluid p-3">

                    </div>

                    <div class="col-md-5">

                        <div class="card-body">

                            <h3 class="h5">
                                ${producto.nombre}
                            </h3>

                            <p>
                                Precio:
                                ${formatearPrecio(producto.precio)}
                            </p>

                            <p>
                                Subtotal:
                                <strong>
                                    ${formatearPrecio(subtotal)}
                                </strong>
                            </p>

                        </div>

                    </div>

                    <div class="col-md-2 p-3">

                        <label
                            for="cantidad-${producto.id}"
                            class="form-label">

                            Cantidad

                        </label>

                        <input
                            id="cantidad-${producto.id}"
                            class="form-control"
                            type="number"
                            min="1"
                            value="${producto.cantidad}"
                            onchange="
                                cambiarCantidad(
                                    ${producto.id},
                                    this.value
                                )
                            ">

                    </div>

                    <div class="col-md-2 p-3">

                        <button
                            class="btn btn-danger w-100"
                            onclick="
                                eliminarDelCarrito(
                                    ${producto.id}
                                )
                            ">

                            Eliminar

                        </button>

                    </div>

                </div>

            </article>
        `;

    });


    elementoTotal.textContent =
        formatearPrecio(totalCarrito);

}


/* =========================================
   VACIAR CARRITO
========================================= */

function vaciarCarrito() {

    const confirmar =
        confirm("¿Quieres vaciar todo el carrito?");


    if (confirmar) {

        carrito = [];

        guardarCarrito();
        mostrarCarrito();

    }

}


/* =========================================
   FINALIZAR COMPRA
========================================= */

function finalizarCompra() {

    if (carrito.length === 0) {

        alert("Debes agregar productos al carrito.");

        return;

    }

    alert("Compra realizada correctamente.");

    carrito = [];

    guardarCarrito();
    mostrarCarrito();

}


/* =========================================
   EJECUTAR AL CARGAR CADA PÁGINA
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        mostrarProductosDestacados();
        mostrarTodosLosProductos();
        mostrarDetalleProducto();
        mostrarCarrito();
        actualizarCantidadCarrito();
        validarFormularioContacto();


        const buscador =
            document.getElementById("buscador-productos");

        const filtro =
            document.getElementById("filtro-categoria");


        if (buscador !== null) {

            buscador.addEventListener(
                "input",
                mostrarTodosLosProductos
            );

        }


        if (filtro !== null) {

            filtro.addEventListener(
                "change",
                mostrarTodosLosProductos
            );

        }

    }
);

/* =========================================
   VALIDACIÓN FORMULARIO DE CONTACTO
========================================= */

function validarFormularioContacto() {

    const formulario =
        document.getElementById("formulario-contacto");

    if (formulario === null) {
        return;
    }


    const nombre =
        document.getElementById("nombre");

    const correo =
        document.getElementById("correo");

    const comentario =
        document.getElementById("comentario");


    const errorNombre =
        document.getElementById("error-nombre");

    const errorCorreo =
        document.getElementById("error-correo");

    const errorComentario =
        document.getElementById("error-comentario");

    const mensajeExito =
        document.getElementById("mensaje-exito");

    const contadorComentario =
        document.getElementById("contador-comentario");


    /* =========================
       VALIDAR NOMBRE
    ========================== */

    nombre.addEventListener("input", function () {

        if (nombre.value.trim() === "") {

            errorNombre.textContent =
                "El nombre es obligatorio.";

            nombre.classList.add("campo-error");
            nombre.classList.remove("campo-correcto");

        } else if (nombre.value.length > 100) {

            errorNombre.textContent =
                "El nombre no puede superar los 100 caracteres.";

            nombre.classList.add("campo-error");
            nombre.classList.remove("campo-correcto");

        } else {

            errorNombre.textContent = "";

            nombre.classList.remove("campo-error");
            nombre.classList.add("campo-correcto");

        }

    });


    /* =========================
       VALIDAR CORREO
    ========================== */

    correo.addEventListener("input", function () {

        const valorCorreo =
            correo.value.trim().toLowerCase();

        const regexCorreo =
            /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;


        if (valorCorreo === "") {

            errorCorreo.textContent =
                "El correo es obligatorio.";

            correo.classList.add("campo-error");
            correo.classList.remove("campo-correcto");

        }

        else if (correo.value.length > 100) {

            errorCorreo.textContent =
                "El correo no puede superar los 100 caracteres.";

            correo.classList.add("campo-error");
            correo.classList.remove("campo-correcto");

        }

        else if (!regexCorreo.test(valorCorreo)) {

            errorCorreo.textContent =
                "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";

            correo.classList.add("campo-error");
            correo.classList.remove("campo-correcto");

        }

        else {

            errorCorreo.textContent = "";

            correo.classList.remove("campo-error");
            correo.classList.add("campo-correcto");

        }

    });


    /* =========================
       CONTADOR DE COMENTARIO
    ========================== */

    comentario.addEventListener("input", function () {

        const cantidad =
            comentario.value.length;

        contadorComentario.textContent =
            cantidad + " / 500 caracteres";


        if (comentario.value.trim() === "") {

            errorComentario.textContent =
                "El comentario es obligatorio.";

            comentario.classList.add("campo-error");
            comentario.classList.remove("campo-correcto");

        }

        else {

            errorComentario.textContent = "";

            comentario.classList.remove("campo-error");
            comentario.classList.add("campo-correcto");

        }

    });


    /* =========================
       ENVIAR FORMULARIO
    ========================== */

    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();


        let formularioValido = true;


        /* VALIDAR NOMBRE */

        if (nombre.value.trim() === "") {

            errorNombre.textContent =
                "El nombre es obligatorio.";

            nombre.classList.add("campo-error");

            formularioValido = false;

        }


        /* VALIDAR CORREO */

        const valorCorreo =
            correo.value.trim().toLowerCase();

        const regexCorreo =
            /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;


        if (valorCorreo === "") {

            errorCorreo.textContent =
                "El correo es obligatorio.";

            correo.classList.add("campo-error");

            formularioValido = false;

        }

        else if (correo.value.length > 100) {

            errorCorreo.textContent =
                "El correo no puede superar los 100 caracteres.";

            correo.classList.add("campo-error");

            formularioValido = false;

        }

        else if (!regexCorreo.test(valorCorreo)) {

            errorCorreo.textContent =
                "El correo no pertenece a un dominio permitido.";

            correo.classList.add("campo-error");

            formularioValido = false;

        }


        /* VALIDAR COMENTARIO */

        if (comentario.value.trim() === "") {

            errorComentario.textContent =
                "El comentario es obligatorio.";

            comentario.classList.add("campo-error");

            formularioValido = false;

        }

        else if (comentario.value.length > 500) {

            errorComentario.textContent =
                "El comentario no puede superar los 500 caracteres.";

            comentario.classList.add("campo-error");

            formularioValido = false;

        }


        /* =========================
           SI TODO ESTÁ CORRECTO
        ========================== */

        if (formularioValido) {

            mensajeExito.classList.remove("d-none");

            formulario.reset();

            contadorComentario.textContent =
                "0 / 500 caracteres";


            nombre.classList.remove("campo-correcto");
            correo.classList.remove("campo-correcto");
            comentario.classList.remove("campo-correcto");


            setTimeout(function () {

                mensajeExito.classList.add("d-none");

            }, 4000);

        }

    });

}