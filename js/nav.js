console.log("nav.js cargado");

/* ==================================================
   ================== MENÚ CORRECTO =================
================================================== */

const menus = document.querySelectorAll(".menu");
const menu = menus[1]; // 👉 el segundo menu (catalogo)

if (!menu) {
  console.warn("nav.js: no existe menú de catálogo");
}

/* ==================================================
   ================== FILTRO CATEGORÍAS =============
================================================== */

if (menu) {
  const botones = menu.querySelectorAll("button");

  botones.forEach((btn) => {
    btn.addEventListener("click", () => {
      const categoria = btn.dataset.cat;

      window.dispatchEvent(
        new CustomEvent("filtrarCategoria", {
          detail: { categoria },
        }),
      );
    });
  });
}

/* ==================================================
   ================== BUSCADOR ======================
================================================== */

const searchToggle = document.getElementById("searchToggle");
const searchInput = document.getElementById("searchInput");
const navSearch = document.querySelector(".nav-search");

if (searchToggle && searchInput && navSearch) {
  searchToggle.addEventListener("click", () => {
    navSearch.classList.toggle("active");
    searchInput.focus();
  });

  searchInput.addEventListener("input", () => {
    const texto = searchInput.value.toLowerCase().trim();

    window.dispatchEvent(
      new CustomEvent("buscarProducto", {
        detail: { texto },
      }),
    );
  });
}
