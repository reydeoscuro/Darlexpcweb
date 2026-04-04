let promoInterval = null;
window.PRODUCTOS_DB = [];
console.log("APP.JS V2 CARGADO");

const URL = "https://darlex-api.david-villegas6991.workers.dev/";
const contenedor = document.getElementById("productos") || null;

/* ==================================================
   ================== FETCH PRODUCTOS ===============
================================================== */

const CACHE_KEY_PRODUCTOS = "cache_productos";
const CACHE_TIME = 5 * 60 * 1000; // 5 minutos

async function cargarProductos() {
  const cache = localStorage.getItem(CACHE_KEY_PRODUCTOS);

  if (cache) {
    const parsed = JSON.parse(cache);

    if (Date.now() - parsed.timestamp < CACHE_TIME) {
      PRODUCTOS_DB = parsed.data;

      renderProductos(PRODUCTOS_DB);
      renderPromos(PRODUCTOS_DB); // 🔥 AQUI
      renderUltimosProductos(PRODUCTOS_DB);
      activarFiltroCategorias();
      // esperar a que el DOM pinte
      setTimeout(() => {
        iniciarSliderPromos();
      }, 100);
      return;
    }
  }

  try {
    const response = await fetch(URL);
    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error("La API no devolvió un array:", data);
      mostrarMensajeError();
      return;
    }

    const productosActivos = data.filter(
      (p) => p.ACTIVO && p.ACTIVO.trim().toUpperCase() === "SI",
    );

    localStorage.setItem(
      CACHE_KEY_PRODUCTOS,
      JSON.stringify({
        timestamp: Date.now(),
        data: productosActivos,
      }),
    );

    PRODUCTOS_DB = productosActivos;
    renderProductos(PRODUCTOS_DB);
    renderPromos(PRODUCTOS_DB); // 🔥 AQUI
    activarFiltroCategorias();
  } catch (error) {
    console.error("ERROR FETCH:", error);
    mostrarMensajeError();
  }
}

function mostrarMensajeError() {
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
      setTimeout(renderBatch, 50); // render progresivo suave
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

  // 🔥 últimos agregados (invertimos lista)
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
   ================== FILTRO CATEGORÍAS ============
================================================== */

function activarFiltroCategorias() {
  const botones = document.querySelectorAll(".menu-scroll button");

  botones.forEach((btn) => {
    btn.addEventListener("click", () => {
      const categoria = btn.dataset.cat;
      const cards = document.querySelectorAll(".producto-card");

      cards.forEach((card) => {
        if (categoria === "todos") {
          card.style.display = "flex";
        } else {
          card.style.display = card.dataset.cat === categoria ? "flex" : "none";
        }
      });
    });
  });
}

/* ==================================================
   ================== INICIALIZAR ===================
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  actualizarContador();
});

// ================= PROMOCIONES (COMPATIBLE CON TU JSON) =================

const promosContainer = document.getElementById("promosGrid");

// ================= MOTOR DE PROMOCIONES AUTO =================

function getPromosAutomaticas(lista) {
  const hoy = new Date();

  // 👉 cambia cada semana
  const semana = Math.floor(hoy.getTime() / (1000 * 60 * 60 * 24 * 7));

  // 👉 filtramos productos válidos
  const validos = lista.filter((p) => p.ACTIVO === "SI" && Number(p.STOCK) > 0);

  // 👉 pseudo-random estable por semana
  const seleccion = validos.filter((_, i) => (i + semana) % 3 === 0);

  // 👉 máximo 6 promos
  const promos = seleccion.slice(0, 6);

  return promos.map((p) => {
    const precio = Number(p.PRECIO);
    let descuento = 0;

    if (precio > 500) {
      descuento = 40 + (semana % 10); // 40–49
    } else if (precio > 100) {
      descuento = 10 + (semana % 15); // 10–24
    } else if (precio > 0) {
      descuento = 1 + (semana % 2) * 1.5; // 1–2.5
    }

    const precioFinal = Math.max(precio - descuento, precio * 0.85); // no bajar más de 15%

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
