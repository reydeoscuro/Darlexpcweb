console.log("nav.js cargado");

// salir si no hay menú
const menu = document.querySelector(".menu");
if (!menu) return;

// filtro por categoría
menu.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    const categoria = btn.dataset.cat;

    document.querySelectorAll(".producto-card").forEach(card => {
      card.style.display =
        card.dataset.cat === categoria ? "block" : "none";
    });
  });
});
