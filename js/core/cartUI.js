/* ================================
   CONTADOR DEL CARRITO
================================ */

function actualizarContador() {
  const contador = document.querySelector(".cart-count");
  if (!contador) return;

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const totalCantidad = carrito.reduce((acc, item) => {
    return acc + Number(item.cantidad || 0);
  }, 0);

  contador.textContent = totalCantidad;
}


/* ================================
   MENSAJE CONFIRMACION
================================ */

function mostrarConfirmacion() {
  const mensaje = document.createElement("div");
  mensaje.textContent = "Producto agregado al carrito";

  Object.assign(mensaje.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "#16a34a",
    color: "#fff",
    padding: "12px 18px",
    borderRadius: "8px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    zIndex: "9999"
  });

  document.body.appendChild(mensaje);

  setTimeout(() => mensaje.remove(), 2000);
}


/* ================================
   CARRITO DESPLEGABLE
================================ */

function abrirCarrito() {
  const sidebar = document.getElementById("cartSidebar");
  const overlay = document.getElementById("cartOverlay");

  if (!sidebar || !overlay) return;

  sidebar.classList.add("active");
  overlay.classList.add("active");

  renderizarCarrito();
}

function cerrarCarrito() {
  const sidebar = document.getElementById("cartSidebar");
  const overlay = document.getElementById("cartOverlay");

  if (!sidebar || !overlay) return;

  sidebar.classList.remove("active");
  overlay.classList.remove("active");
}


/* ================================
   RENDER DEL CARRITO
================================ */

function renderizarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const contenedor = document.getElementById("cartItems");
  const totalElemento = document.getElementById("cartTotal");

  if (!contenedor || !totalElemento) return;

  contenedor.innerHTML = "";
  let total = 0;

  carrito.forEach(item => {

    const nombre = item.nombre || item.title || "Producto";
    const precio = Number(item.precio || item.price || 0);
    const cantidad = Number(item.cantidad || 1);

    total += precio * cantidad;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <strong>${nombre}</strong>
      <p>Cantidad: ${cantidad}</p>
      <p>$${precio.toFixed(2)}</p>
    `;

    contenedor.appendChild(div);
  });

  totalElemento.textContent = total.toFixed(2);
}


/* ================================
   EVENTOS
================================ */

document.addEventListener("DOMContentLoaded", () => {

  actualizarContador();

  const btnAbrir = document.getElementById("btnAbrirCarrito");
  const btnCerrar = document.getElementById("cerrarCarrito");
  const overlay = document.getElementById("cartOverlay");

  if (btnAbrir) {
    btnAbrir.addEventListener("click", (e) => {
      e.preventDefault(); // evita redirecciones
      abrirCarrito();
    });
  }

  if (btnCerrar) {
    btnCerrar.addEventListener("click", cerrarCarrito);
  }

  if (overlay) {
    overlay.addEventListener("click", cerrarCarrito);
  }

});
