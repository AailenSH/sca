// 1. IMPORTAMOS los productos desde el archivo externo
import { productos } from './productos.js';

// 2. Abrir / Cerrar Menú Lateral con el mismo botón
const btnMenu = document.querySelector("#menu-btn");
const sideMenu = document.querySelector("#side-menu");

function toggleMenu() {
    sideMenu.classList.toggle("open");
}

btnMenu.addEventListener("click", toggleMenu);

// 3. Modal de Contacto
const btnContacto = document.querySelector("#contact-btn");
const modalContacto = document.querySelector("#contact-modal");
const btnCerrarContacto = document.querySelector("#close-contact");

function toggleContacto() {
    modalContacto.classList.toggle("visible");
}

btnContacto.addEventListener("click", toggleContacto);
btnCerrarContacto.addEventListener("click", toggleContacto);

// 4. Control del Modo Oscuro con Persistencia sin destellos
const btnThemeToggle = document.querySelector("#theme-toggle");

// Verificamos memoria al cargar
if (localStorage.getItem("theme") === "oscuro") {
    document.body.classList.add("oscuro");
    if (btnThemeToggle) {
        btnThemeToggle.textContent = "☀️";
    }
}

if (btnThemeToggle) {
    btnThemeToggle.addEventListener("click", () => {
        // Activamos la clase de transición suave solo cuando se hace clic en el botón
        document.body.classList.add("animar-transicion");
        document.body.classList.toggle("oscuro");
        
        if (document.body.classList.contains("oscuro")) {
            btnThemeToggle.textContent = "☀️";
            localStorage.setItem("theme", "oscuro");
        } else {
            btnThemeToggle.textContent = "🌙";
            localStorage.removeItem("theme");
        }
    });
}

// 5. Inyección de Productos con Botón Comprar e Información Desplegable
const contenedorProductos = document.querySelector("#contenedor-productos");

function mostrarProductos(lista) {
    contenedorProductos.innerHTML = "";
    lista.forEach(prod => {
        const tarjetaHTML = `
            <article class="card">
                <div class="card-img">
                    <img src="${prod.imagen}" alt="${prod.nombre}">
                </div>
                <div class="card-content">
                    <h3>${prod.nombre}</h3>
                    <p class="precio">$${prod.precio}</p>
                    <p>${prod.descripcion}</p>
                    <div class="card-actions">
                        <button class="btn btn-comprar">Comprar</button>
                        <button class="btn btn-info">Más información</button>
                    </div>
                    <div class="info">
                        <p>${prod.masInfo}</p>
                    </div>
                </div>
            </article>
        `;
        contenedorProductos.innerHTML += tarjetaHTML;
    });
}

if (contenedorProductos) {
    mostrarProductos(productos);

    contenedorProductos.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-comprar")) {
            const btn = e.target;
            btn.classList.toggle("comprado");
            if (btn.classList.contains("comprado")) {
                btn.textContent = "¡Comprado!";
            } else {
                btn.textContent = "Comprar";
            }
        }

        const btnInfo = e.target.closest(".btn-info");
        if (btnInfo) {
            const card = btnInfo.closest(".card");
            const infoDiv = card.querySelector(".info");
            infoDiv.classList.toggle("visible");
        }
    });
}