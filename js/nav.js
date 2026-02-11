console.log("nav.js cargado");

// salir si no hay menú
const menu = document.querySelector(".menu");
if (!menu) return;

// hamburguesa
const menuToggle = document.getElementById("menuToggle");
const menuItems = document.getElementById("menuItems");

if (menuToggle && menuItems) {
  menuToggle.addEventListener("click", () => {
    menuItems.classList.toggle("active");
  });
}

// filtro categorías
const botonesCategoria = document.querySelectorAll(".menu-items button");

botonesCategoria.forEach(btn => {
  btn.addEventListener("click", () => {
    const categoria = btn.dataset.cat;

    document.querySelectorAll(".producto-card").forEach(card => {
      card.style.display =
        card.dataset.cat === categoria ? "block" : "none";
    });

    // cerrar menú móvil
    if (menuItems) menuItems.classList.remove("active");
  });
});
