window.PRODUCTOS_DB = [];
console.log("APP.JS V2 CARGADO");

const URL = "https://darlex-api.david-villegas6991.workers.dev/";
const contenedor = document.getElementById("productos");

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
      renderProductos(parsed.data);
      activarFiltroCategorias();
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

    window.PRODUCTOS_DB = productosActivos;
    renderProductos(window.PRODUCTOS_DB);
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
