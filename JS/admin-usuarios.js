const formulario =
    document.getElementById("formulario-usuario");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const rut =
        document.getElementById("rut").value.trim();

    const nombre =
        document.getElementById("nombre").value.trim();

    const correo =
        document.getElementById("correo").value.trim();

    const contrasena =
        document.getElementById("contrasena").value;

    const rol =
        document.getElementById("rol").value;

    const errorRut =
        document.getElementById("error-rut");

    const errorNombre =
        document.getElementById("error-nombre");

    const errorCorreo =
        document.getElementById("error-correo");

    const errorContrasena =
        document.getElementById("error-contrasena");

    const errorRol =
        document.getElementById("error-rol");

    let correcto = true;

    errorRut.textContent = "";
    errorNombre.textContent = "";
    errorCorreo.textContent = "";
    errorContrasena.textContent = "";
    errorRol.textContent = "";

    if (rut === "") {
        errorRut.textContent =
            "El RUT es obligatorio.";

        correcto = false;
    }

    if (nombre === "") {
        errorNombre.textContent =
            "El nombre es obligatorio.";

        correcto = false;
    }

    if (!correo.includes("@")) {
        errorCorreo.textContent =
            "Ingresa un correo válido.";

        correcto = false;
    }

    if (
        contrasena.length < 4 ||
        contrasena.length > 10
    ) {
        errorContrasena.textContent =
            "La contraseña debe tener entre 4 y 10 caracteres.";

        correcto = false;
    }

    if (rol === "") {
        errorRol.textContent =
            "Selecciona un rol.";

        correcto = false;
    }

    if (correcto) {
        const usuario = {
            rut: rut,
            nombre: nombre,
            correo: correo,
            contrasena: contrasena,
            rol: rol
        };

        const usuarios =
            JSON.parse(
                localStorage.getItem("usuariosGameZone")
            ) || [];

        usuarios.push(usuario);

        localStorage.setItem(
            "usuariosGameZone",
            JSON.stringify(usuarios)
        );

        alert("Usuario guardado correctamente.");

        window.location.href = "usuarios.html";
    }
});