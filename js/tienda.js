import { obtenerProductos } from "./core/apiProductos.js";

console.log("TIENDA.JS V3 CARGADO");

const contenedor = document.getElementById("productos");

let PRODUCTOS = [];

/* ==================================================
   ================== INIT ==========================
================================================== */

async function initTienda() {
  try {
    PRODUCTOS = await obtenerProductos();
    renderProductos(PRODUCTOS);
  } catch (error) {
    console.error("ERROR INIT:", error);
    mostrarMensajeError();
  }
}

initTienda();

/* ==================================================
   ================== ERRORES =======================
================================================== */

function mostrarMensajeError() {
  if (!contenedor) return;
  // 🔥 CLAVE: si ya hay productos renderizados, NO mostrar error
  if (contenedor.children.length > 0) return;
  contenedor.innerHTML = `
    <div style="text-align:center; padding:20px;">
      Estamos actualizando productos. Intenta en unos minutos.
    </div>
  `;
}
/* ==================================================
   ================== RENDER ========================
================================================== */

function renderProductos(lista) {
  if (!contenedor) return;

  contenedor.innerHTML = "";

  const BATCH_SIZE = 12;
  let index = 0;

  function renderBatch() {
    const fragment = document.createDocumentFragment();
    const slice = lista.slice(index, index + BATCH_SIZE);

    slice.forEach((p) => {
      const card = document.createElement("div");
      card.className = "card producto-card";
      card.setAttribute("data-cat", p.CATEGORIA);

      card.innerHTML = `
        <a href="producto.html?id=${p.SN}">
          <div class="img-box">
            <img 
              src="${p.IMAGEN}" 
              alt="${p.NOMBRE}"
              loading="lazy"
              decoding="async"
            >
          </div>
        </a>

        <h3 class="titulo">${p.NOMBRE}</h3>

        <div class="card-info">
          <span class="precio">$${p.PRECIO}</span>
          <span class="stock">Stock: ${p.STOCK}</span>
        </div>

        <button class="btn-add" data-id="${p.SN}">
          Agregar al carrito
        </button>
      `;

      fragment.appendChild(card);
    });

    contenedor.appendChild(fragment);

    index += BATCH_SIZE;

    if (index < lista.length) {
      setTimeout(renderBatch, 50);
    } else {
      activarBotonesCarrito();
    }
  }

  renderBatch();
}

/* ==================================================
   ================== CARRITO =======================
================================================== */

function activarBotonesCarrito() {
  const botones = document.querySelectorAll(".btn-add");

  botones.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".producto-card");

      const producto = {
        id: btn.dataset.id,
        nombre: card.querySelector(".titulo").textContent,
        precio: card.querySelector(".precio").textContent,
        imagen: card.querySelector("img")?.src,
      };

      agregarAlCarrito(producto);
    });
  });
}

/* ==================================================
   ================== EVENTOS NAV ===================
================================================== */

// 🔥 FILTRO POR CATEGORÍA
window.addEventListener("filtrarCategoria", (e) => {
  const categoria = e.detail.categoria;

  if (categoria === "todos") {
    renderProductos(PRODUCTOS);
    return;
  }

  const filtrados = PRODUCTOS.filter((p) => p.CATEGORIA === categoria);
  renderProductos(filtrados);
});

// 🔥 BUSCADOR
window.addEventListener("buscarProducto", (e) => {
  const texto = e.detail.texto;

  if (texto === "") {
    renderProductos(PRODUCTOS);
    return;
  }

  const filtrados = PRODUCTOS.filter((p) => {
    const nombre = (p.NOMBRE || "").toLowerCase();
    const categoria = (p.CATEGORIA || "").toLowerCase();
    const procesador = (p.PROCESADOR || "").toLowerCase();

    return (
      nombre.includes(texto) ||
      categoria.includes(texto) ||
      procesador.includes(texto)
    );
  });

  renderProductos(filtrados);
});

/* ==================================================
   ================== INIT UI =======================
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  actualizarContador();
});
