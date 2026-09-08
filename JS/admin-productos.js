const formulario =
    document.getElementById("formulario-producto");

const posicionEditar =
    localStorage.getItem("productoEditar");

let productos =
    JSON.parse(localStorage.getItem("productosGameZone")) || [];


/* Cargar los datos cuando se presiona Editar */

if (posicionEditar !== null) {
    const producto = productos[posicionEditar];

    document.getElementById("codigo").value =
        producto.codigo;

    document.getElementById("nombre-producto").value =
        producto.nombre;

    document.getElementById("descripcion").value =
        producto.descripcion;

    document.getElementById("precio").value =
        producto.precio;

    document.getElementById("stock").value =
        producto.stock;

    document.getElementById("stock-critico").value =
        producto.stockCritico;

    document.getElementById("categoria").value =
        producto.categoria;

    document.querySelector("h1").textContent =
        "Editar producto";
}


/* Guardar el formulario */

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const codigo =
        document.getElementById("codigo").value.trim();

    const nombre =
        document.getElementById("nombre-producto").value.trim();

    const descripcion =
        document.getElementById("descripcion").value.trim();

    const precio =
        document.getElementById("precio").value;

    const stock =
        document.getElementById("stock").value;

    const stockCritico =
        document.getElementById("stock-critico").value;

    const categoria =
        document.getElementById("categoria").value;

    const errorCodigo =
        document.getElementById("error-codigo");

    const errorNombre =
        document.getElementById("error-nombre-producto");

    const errorPrecio =
        document.getElementById("error-precio");

    const errorStock =
        document.getElementById("error-stock");

    const errorCategoria =
        document.getElementById("error-categoria");

    errorCodigo.textContent = "";
    errorNombre.textContent = "";
    errorPrecio.textContent = "";
    errorStock.textContent = "";
    errorCategoria.textContent = "";

    let correcto = true;

    if (codigo.length < 3) {
        errorCodigo.textContent =
            "El código debe tener al menos 3 caracteres.";

        correcto = false;
    }

    if (nombre === "") {
        errorNombre.textContent =
            "El nombre es obligatorio.";

        correcto = false;
    }

    if (precio === "" || Number(precio) < 0) {
        errorPrecio.textContent =
            "Ingresa un precio válido.";

        correcto = false;
    }

    if (
        stock === "" ||
        Number(stock) < 0 ||
        !Number.isInteger(Number(stock))
    ) {
        errorStock.textContent =
            "Ingresa un stock válido.";

        correcto = false;
    }

    if (categoria === "") {
        errorCategoria.textContent =
            "Selecciona una categoría.";

        correcto = false;
    }

    if (!correcto) {
        return;
    }

    const producto = {
        codigo: codigo,
        nombre: nombre,
        descripcion: descripcion,
        precio: Number(precio),
        stock: Number(stock),
        stockCritico:
            stockCritico === "" ? 0 : Number(stockCritico),
        categoria: categoria
    };

    if (posicionEditar !== null) {
        productos[posicionEditar] = producto;

        localStorage.removeItem("productoEditar");

        alert("Producto editado correctamente.");
    } else {
        productos.push(producto);

        alert("Producto guardado correctamente.");
    }

    localStorage.setItem(
        "productosGameZone",
        JSON.stringify(productos)
    );

    window.location.href = "productos.html";
});