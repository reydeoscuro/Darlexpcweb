let promoInterval = null;
window.PRODUCTOS_DB = [];

console.log("APP.JS V3 CARGADO");

// 🔥 IMPORTANTE: ahora usamos módulo externo
import { obtenerProductos } from "./core/apiProductos.js";

const contenedor = document.getElementById("productos") || null;

/* ==================================================
   ================== FETCH PRODUCTOS ===============
================================================== */

async function cargarProductos() {
  try {
    const productos = await obtenerProductos();

    if (!Array.isArray(productos)) {
      console.error("API no devolvió array:", productos);
      mostrarMensajeError();
      return;
    }

    PRODUCTOS_DB = productos;

    // 👉 SOLO si existe contenedor (index puede no tenerlo)
    if (contenedor) {
      renderProductos(PRODUCTOS_DB);
    }

    // 👉 bloques independientes
    renderPromos(PRODUCTOS_DB);
    renderUltimosProductos(PRODUCTOS_DB);

    // 👉 protección slider
    setTimeout(() => {
      if (typeof iniciarSliderPromos === "function") {
        iniciarSliderPromos();
      }
    }, 100);
  } catch (error) {
    console.error("ERROR FETCH:", error);
    mostrarMensajeError();
  }
}

function mostrarMensajeError() {
  if (!contenedor) return;

  contenedor.innerHTML = `
    <div style="text-align:center; padding:20px;">
      Estamos actualizando productos. Intenta en unos minutos.
    </div>
  `;
}

cargarProductos();

/* ==================================================
   ================== RENDER PRODUCTOS ==============
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
   ========== ÚLTIMOS PRODUCTOS (HOME) ==============
================================================== */

function renderUltimosProductos(lista) {
  const contenedorUltimos = document.getElementById("destacadosGrid");
  if (!contenedorUltimos) return;

  const ultimos = [...lista].reverse().slice(0, 24);

  contenedorUltimos.innerHTML = ultimos
    .map(
      (p) => `
      <div class="card producto-card" data-cat="${p.CATEGORIA}">

        <a href="producto.html?id=${p.SN}">
          <div class="img-box">
            <img src="${p.IMAGEN}" alt="${p.NOMBRE}">
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

      </div>
    `,
    )
    .join("");

  activarBotonesCarrito();
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
   ================== INICIALIZAR ===================
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  actualizarContador();
});

// ================= PROMOCIONES =================

const promosContainer = document.getElementById("promosGrid");

/* ==================================================
   ================= MOTOR PROMOS ===================
================================================== */

function getPromosAutomaticas(lista) {
  const hoy = new Date();
  const semana = Math.floor(hoy.getTime() / (1000 * 60 * 60 * 24 * 7));

  const validos = lista.filter((p) => p.ACTIVO === "SI" && Number(p.STOCK) > 0);

  const seleccion = validos.filter((_, i) => (i + semana) % 3 === 0);
  const promos = seleccion.slice(0, 6);

  return promos.map((p) => {
    const precio = Number(p.PRECIO);
    let descuento = 0;

    if (precio > 500) {
      descuento = 40 + (semana % 10);
    } else if (precio > 100) {
      descuento = 10 + (semana % 15);
    } else if (precio > 0) {
      descuento = 1 + (semana % 2) * 1.5;
    }

    const precioFinal = Math.max(precio - descuento, precio * 0.85);

    return {
      ...p,
      PRECIO_ORIGINAL: precio,
      PRECIO_PROMO: precioFinal.toFixed(2),
      DESCUENTO: (precio - precioFinal).toFixed(2),
    };
  });
}

function renderPromos(lista) {
  if (!promosContainer) return;

  const promos = getPromosAutomaticas(lista);

  promosContainer.innerHTML = promos
    .map(
      (p) => `
  <div class="promo-card-pro">

    <div class="promo-brand-bar">
      <span class="promo-logo">${p.MARCA || "Darlex"}</span>
      <span class="promo-badge">Promo</span>
    </div>

    <div class="promo-img-zone">
      <img src="${p.IMAGEN}" alt="${p.NOMBRE}">
    </div>

    <h3 class="promo-title">${p.NOMBRE}</h3>

    <div class="promo-specs">
      <div class="promo-spec">
        <div class="promo-spec-label">CPU</div>
        <div class="promo-spec-value">${p.PROCESADOR || "-"}</div>
      </div>

      <div class="promo-spec">
        <div class="promo-spec-label">RAM</div>
        <div class="promo-spec-value">${p.RAM || "-"}</div>
      </div>

      <div class="promo-spec">
        <div class="promo-spec-label">SSD</div>
        <div class="promo-spec-value">${p.ROM || "-"}</div>
      </div>

      <div class="promo-spec">
        <div class="promo-spec-label">Stock</div>
        <div class="promo-spec-value">${p.STOCK}</div>
      </div>
    </div>

    <div class="promo-price-box">
      <div>
        <div class="promo-old">$${p.PRECIO_ORIGINAL}</div>
        <div class="promo-price">$${p.PRECIO_PROMO}</div>
      </div>
    </div>

    <a href="producto.html?id=${p.SN}" class="promo-btn">
      Ver producto
    </a>

  </div>
`,
    )
    .join("");
}
