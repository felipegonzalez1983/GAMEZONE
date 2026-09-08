const formularioLogin =
    document.getElementById("formulario-login");

formularioLogin.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const correo =
        document.getElementById("correo-login").value.trim();

    const contrasena =
        document.getElementById("contrasena-login").value;

    const errorCorreo =
        document.getElementById("error-correo-login");

    const errorContrasena =
        document.getElementById("error-contrasena-login");

    const mensajeLogin =
        document.getElementById("mensaje-login");

    const formatoCorreo =
        /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

    let datosCorrectos = true;

    errorCorreo.textContent = "";
    errorContrasena.textContent = "";
    mensajeLogin.classList.add("d-none");

    if (!formatoCorreo.test(correo)) {

        errorCorreo.textContent =
            "Ingresa un correo Duoc o Gmail.";

        datosCorrectos = false;

    }

    if (
        contrasena.length < 4 ||
        contrasena.length > 10
    ) {

        errorContrasena.textContent =
            "La contraseña debe tener entre 4 y 10 caracteres.";

        datosCorrectos = false;

    }

    if (datosCorrectos) {

        mensajeLogin.classList.remove("d-none");

    }

});