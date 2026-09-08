const formulario = document.getElementById("formulario-login");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const correo = document
        .getElementById("correo-login")
        .value
        .trim();

    const contrasena = document
        .getElementById("contrasena-login")
        .value;

    const errorCorreo =
        document.getElementById("error-correo-login");

    const errorContrasena =
        document.getElementById("error-contrasena-login");

    const formatoCorreo =
        /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

    let datosCorrectos = true;

    errorCorreo.textContent = "";
    errorContrasena.textContent = "";

    if (!formatoCorreo.test(correo)) {
        errorCorreo.textContent =
            "Ingresa un correo Duoc o Gmail.";

        datosCorrectos = false;
    }

    if (contrasena.length < 4 || contrasena.length > 10) {
        errorContrasena.textContent =
            "La contraseña debe tener entre 4 y 10 caracteres.";

        datosCorrectos = false;
    }

    if (!datosCorrectos) {
        return;
    }

    if (
        correo === "admin@gmail.com" &&
        contrasena === "1234"
    ) {
        localStorage.setItem("usuarioGameZone", correo);
        localStorage.setItem("rolGameZone", "Administrador");

        alert("Bienvenido, administrador.");

        window.location.href = "admin/index.html";
    } else {
        localStorage.setItem("usuarioGameZone", correo);
        localStorage.setItem("rolGameZone", "Cliente");

        alert("Bienvenido a Game Zone.");

        window.location.href = "index.html";
    }
});