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
  card.style.display = "block";
} else {
  card.style.display =
    card.dataset.cat === categoria ? "block" : "none";
}
      });
    });
  });
})();
