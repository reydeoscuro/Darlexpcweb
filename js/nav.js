console.log("nav.js cargado");

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

  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      const categoria = btn.dataset.cat;
      console.log("Filtrando por:", categoria);

      const productos = document.querySelectorAll(".producto-card");

      if (productos.length === 0) {
        console.warn("nav.js: no hay productos para filtrar");
        return;
      }

      productos.forEach(card => {
        if (categoria === "todos") {
  card.style.display = "flex";
} else {
  card.style.display =
    card.dataset.cat === categoria ? "flex" : "none";
}
      });
    });
  });
})();
// ===== BUSCADOR NAV =====

const searchToggle = document.getElementById("searchToggle");
const searchInput = document.getElementById("searchInput");
const navSearch = document.querySelector(".nav-search");

if (searchToggle && searchInput && navSearch) {

  // Expandir en móvil
  searchToggle.addEventListener("click", () => {
    navSearch.classList.toggle("active");
    searchInput.focus();
  });

  // Filtrar por nombre
  searchInput.addEventListener("keyup", () => {
    const texto = searchInput.value.toLowerCase();
    const productos = document.querySelectorAll(".producto-card");

    productos.forEach(card => {
      const nombre = card
        .querySelector(".titulo")
        .textContent.toLowerCase();

      card.style.display = nombre.includes(texto)
        ? "flex"
        : "none";
    });
  });
}

