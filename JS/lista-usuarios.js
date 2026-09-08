const tabla =
    document.getElementById("tabla-usuarios");

let usuarios =
    JSON.parse(localStorage.getItem("usuariosGameZone")) || [];

usuarios.forEach(function (usuario, posicion) {
    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${usuario.rut}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.correo}</td>
        <td>${usuario.rol}</td>
        <td>
            <button
                class="btn btn-sm btn-danger"
                onclick="eliminarUsuario(${posicion})">

                Eliminar

            </button>
        </td>
    `;

    tabla.appendChild(fila);
});

function eliminarUsuario(posicion) {
    const confirmar =
        confirm("¿Deseas eliminar este usuario?");

    if (confirmar) {
        usuarios.splice(posicion, 1);

        localStorage.setItem(
            "usuariosGameZone",
            JSON.stringify(usuarios)
        );

        location.reload();
    }
}