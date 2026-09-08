class EncabezadoGameZone extends HTMLElement {

    connectedCallback() {

        const paginaActiva =
            this.getAttribute("pagina-activa");

        this.innerHTML = `
            <header>

                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">

                    <div class="container">

                        <a class="navbar-brand" href="index.html">

                            <img
                                src="IMG/logo-game-zone.jpeg"
                                alt="Logo de Game Zone"
                                class="logo-tienda">

                        </a>

                        <button
                            class="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#menuPrincipal"
                            aria-controls="menuPrincipal"
                            aria-expanded="false"
                            aria-label="Abrir menú">

                            <span class="navbar-toggler-icon"></span>

                        </button>

                        <div
                            class="collapse navbar-collapse"
                            id="menuPrincipal">

                            <ul class="navbar-nav ms-lg-4">

                                <li class="nav-item">

                                    <a
                                        class="nav-link ${paginaActiva === "inicio" ? "active" : ""}"
                                        href="index.html">

                                        Inicio

                                    </a>

                                </li>

                                <li class="nav-item">

                                    <a
                                        class="nav-link ${paginaActiva === "productos" ? "active" : ""}"
                                        href="productos.html">

                                        Productos

                                    </a>

                                </li>

                                <li class="nav-item">

                                    <a
                                        class="nav-link ${paginaActiva === "nosotros" ? "active" : ""}"
                                        href="nosotros.html">

                                        Nosotros

                                    </a>

                                </li>

                                <li class="nav-item">

                                    <a
                                        class="nav-link ${paginaActiva === "blog" ? "active" : ""}"
                                        href="blogs.html">

                                        Blog

                                    </a>

                                </li>

                                <li class="nav-item">

                                    <a
                                        class="nav-link ${paginaActiva === "contacto" ? "active" : ""}"
                                        href="contacto.html">

                                        Contacto

                                    </a>

                                </li>

                                <li class="nav-item">

                                    <a
                                        class="nav-link ${paginaActiva === "carrito" ? "active" : ""}"
                                        href="carrito.html">

                                        🛒 Carrito

                                        <span
                                            id="cantidad-carrito"
                                            class="badge bg-warning text-dark">

                                            0

                                        </span>

                                    </a>

                                </li>

                                <li class="nav-item">

                                    <a
                                        class="btn btn-warning ms-lg-2"
                                        href="login.html">

                                        Iniciar sesión

                                    </a>

                                </li>

                            </ul>

                        </div>

                    </div>

                </nav>

            </header>
        `;

    }

}


class PiePaginaGameZone extends HTMLElement {

    connectedCallback() {

        this.innerHTML = `
            <footer class="pie-pagina text-white py-4">

                <div class="container text-center">

                    <p>
                        Game Zone
                    </p>

                    <p>
                        Tienda de videojuegos, consolas y accesorios gamer.
                    </p>

                    <p class="mb-0">
                        Game Zone © 2026 - Proyecto académico Duoc UC
                    </p>

                </div>

            </footer>
        `;

    }

}


customElements.define(
    "custom-header",
    EncabezadoGameZone
);

customElements.define(
    "custom-footer",
    PiePaginaGameZone
);