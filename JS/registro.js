/* Región y comunas */

const regiones = [
    {
        nombre: "Región Metropolitana",
        comunas: [
            "La Florida",
            "Puente Alto",
            "Macul",
            "Peñalolén",
            "Ñuñoa",
            "Santiago",
            "Providencia",
            "Maipú",
            "Las Condes",
            "San Miguel"
        ]
    }
];

const region = document.getElementById("region");
const comuna = document.getElementById("comuna");


/* Agregar las regiones al select */

regiones.forEach(function (dato, posicion) {

    region.innerHTML += `
        <option value="${posicion}">
            ${dato.nombre}
        </option>
    `;

});


/* Mostrar las comunas de la región seleccionada */

region.addEventListener("change", function () {

    comuna.innerHTML = `
        <option value="">
            Seleccione una comuna
        </option>
    `;

    if (region.value === "") {

        comuna.disabled = true;
        return;

    }

    const listaComunas =
        regiones[region.value].comunas;

    listaComunas.forEach(function (nombreComuna) {

        comuna.innerHTML += `
            <option value="${nombreComuna}">
                ${nombreComuna}
            </option>
        `;

    });

    comuna.disabled = false;

});


/* Mostrar mensaje de error */

function mostrarError(campo, mensaje) {

    const error =
        document.getElementById("error-" + campo);

    error.textContent = mensaje;

}


/* Limpiar los mensajes anteriores */

function limpiarErrores() {

    const mensajes =
        document.querySelectorAll(".text-danger");

    mensajes.forEach(function (mensaje) {
        mensaje.textContent = "";
    });

}


/* Validar el formulario */

const formulario =
    document.getElementById("formulario-registro");

formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    limpiarErrores();

    const run =
        document.getElementById("run").value.trim();

    const nombre =
        document.getElementById("nombre").value.trim();

    const apellidos =
        document.getElementById("apellidos").value.trim();

    const correo =
        document.getElementById("correo").value.trim();

    const direccion =
        document.getElementById("direccion").value.trim();

    const contrasena =
        document.getElementById("contrasena").value;

    const repetirContrasena =
        document.getElementById("repetir-contrasena").value;

    let formularioCorrecto = true;


    /* Validar RUN */

    const formatoRun = /^[0-9]{6,8}[0-9Kk]$/;

    if (!formatoRun.test(run)) {

        mostrarError(
            "run",
            "Escribe el RUN sin puntos ni guion."
        );

        formularioCorrecto = false;

    }


    /* Validar nombre */

    if (nombre === "") {

        mostrarError(
            "nombre",
            "El nombre es obligatorio."
        );

        formularioCorrecto = false;

    }


    /* Validar apellidos */

    if (apellidos === "") {

        mostrarError(
            "apellidos",
            "Los apellidos son obligatorios."
        );

        formularioCorrecto = false;

    }


    /* Validar correo */

    const formatoCorreo =
        /^[a-zA-Z0-9._%+-]+@(duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

    if (!formatoCorreo.test(correo)) {

        mostrarError(
            "correo",
            "Utiliza un correo Duoc o Gmail."
        );

        formularioCorrecto = false;

    }


    /* Validar región */

    if (region.value === "") {

        mostrarError(
            "region",
            "Selecciona una región."
        );

        formularioCorrecto = false;

    }


    /* Validar comuna */

    if (comuna.value === "") {

        mostrarError(
            "comuna",
            "Selecciona una comuna."
        );

        formularioCorrecto = false;

    }


    /* Validar dirección */

    if (direccion === "") {

        mostrarError(
            "direccion",
            "La dirección es obligatoria."
        );

        formularioCorrecto = false;

    }


    /* Validar contraseña */

    if (
        contrasena.length < 4 ||
        contrasena.length > 10
    ) {

        mostrarError(
            "contrasena",
            "Debe tener entre 4 y 10 caracteres."
        );

        formularioCorrecto = false;

    }


    /* Comparar contraseñas */

    if (repetirContrasena !== contrasena) {

        mostrarError(
            "repetir-contrasena",
            "Las contraseñas no coinciden."
        );

        formularioCorrecto = false;

    }


    /* Registro correcto */

    if (formularioCorrecto) {

        const mensaje =
            document.getElementById("mensaje-registro");

        mensaje.classList.remove("d-none");

        formulario.reset();

        comuna.disabled = true;

    }

});