console.log("nav.js cargado");

/* ==================================================
   ================== FILTRO CATEGORÍAS =============
   👉 AHORA USA DATA GLOBAL (NO DOM)
================================================== */

(function () {
  const menu = document.querySelector(".menu");
  if (!menu) {
    console.warn("nav.js: no existe .menu en esta página");
    return;
  }

  const botones = menu.querySelectorAll("button");

  if (botones.length === 0) {
    console.warn("nav.js: no hay botones de categoría");
    return;
  }

  botones.forEach((btn) => {
    btn.addEventListener("click", () => {
      const categoria = btn.dataset.cat;
      console.log("Filtrando por:", categoria);

      if (!window.PRODUCTOS_DB || window.PRODUCTOS_DB.length === 0) {
        console.warn("nav.js: PRODUCTOS_DB no disponible");
        return;
      }

      if (categoria === "todos") {
        renderProductos(window.PRODUCTOS_DB);
        return;
      }

      const filtrados = window.PRODUCTOS_DB.filter((p) => {
        return p.CATEGORIA === categoria;
      });

      renderProductos(filtrados);
    });
  });
})();

/* ==================================================
   ================== BUSCADOR NAV ==================
   👉 AHORA USA DATA REAL (NO DOM)
================================================== */

const searchToggle = document.getElementById("searchToggle");
const searchInput = document.getElementById("searchInput");
const navSearch = document.querySelector(".nav-search");

if (searchToggle && searchInput && navSearch) {
  // Expandir en móvil
  searchToggle.addEventListener("click", () => {
    navSearch.classList.toggle("active");
    searchInput.focus();
  });

  // Búsqueda REAL sobre DB
  searchInput.addEventListener("keyup", () => {
    const texto = searchInput.value.toLowerCase().trim();

    if (!window.PRODUCTOS_DB || window.PRODUCTOS_DB.length === 0) {
      console.warn("Buscador: PRODUCTOS_DB vacío");
      return;
    }

    // Reset
    if (texto === "") {
      renderProductos(window.PRODUCTOS_DB);
      return;
    }

    const filtrados = window.PRODUCTOS_DB.filter((p) => {
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
}
