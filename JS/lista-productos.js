const tabla = document.getElementById("tabla-productos");

let productos =
    JSON.parse(localStorage.getItem("productosGameZone")) || [];

productos.forEach(function (producto, posicion) {
    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${producto.codigo}</td>
        <td>${producto.nombre}</td>
        <td>$${producto.precio.toLocaleString("es-CL")}</td>
        <td>${producto.stock}</td>
        <td>
            <button
                class="btn btn-sm btn-primary"
                onclick="editarProducto(${posicion})">
                Editar
            </button>

            <button
                class="btn btn-sm btn-danger"
                onclick="eliminarProducto(${posicion})">
                Eliminar
            </button>
        </td>
    `;

    tabla.appendChild(fila);
});

function eliminarProducto(posicion) {
    const confirmar =
        confirm("¿Deseas eliminar este producto?");

    if (confirmar) {
        productos.splice(posicion, 1);

        localStorage.setItem(
            "productosGameZone",
            JSON.stringify(productos)
        );

        location.reload();
    }
}

function editarProducto(posicion) {
    localStorage.setItem(
        "productoEditar",
        posicion
    );

    window.location.href = "nuevo-producto.html";
}