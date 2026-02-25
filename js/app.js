console.log("APP.JS V2 CARGADO");

const URL = "https://sheetdb.io/api/v1/1unfoggs799r3";
const contenedor = document.getElementById("productos");

/* ==================================================
   ================== FETCH PRODUCTOS ===============
================================================== */

fetch(URL)
  .then(response => response.json())
  .then(productos => {

    contenedor.innerHTML = "";

    const productosActivos = productos.filter(p =>
      p.ACTIVO &&
      p.ACTIVO.trim().toUpperCase() === "SI"
    );

    renderProductos(productosActivos);
    activarFiltroCategorias();

  })
  .catch(error => {
    console.error("ERROR FETCH:", error);
  });

/* ==================================================
   ================== RENDER PRODUCTOS ==============
================================================== */

function renderProductos(lista) {

  contenedor.innerHTML = "";

  lista.forEach(p => {

    const card = document.createElement("div");
    card.className = "card producto-card";
    card.setAttribute("data-cat", p.CATEGORIA);

    card.innerHTML = `
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
    `;

    contenedor.appendChild(card);
  });

  activarBotonesCarrito();
}

/* ==================================================
   ================== CARRITO =======================
================================================== */

function activarBotonesCarrito() {
  const botones = document.querySelectorAll(".btn-add");

  botones.forEach(btn => {
    btn.addEventListener("click", () => {

      const card = btn.closest(".producto-card");

      const producto = {
        id: btn.dataset.id,
        nombre: card.querySelector(".titulo").textContent,
        precio: card.querySelector(".precio").textContent.replace("$", ""),
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

  botones.forEach(btn => {
    btn.addEventListener("click", () => {

      const categoria = btn.dataset.cat;
      const cards = document.querySelectorAll(".producto-card");

      cards.forEach(card => {

        if (categoria === "todos") {
          card.style.display = "flex";
        } else {
          card.style.display =
            card.dataset.cat === categoria ? "flex" : "none";
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
