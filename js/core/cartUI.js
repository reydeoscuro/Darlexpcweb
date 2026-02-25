// Actualizar contador visual
function actualizarContador() {
  const contador = document.querySelector(".cart-count");
  if (!contador) return;

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  contador.textContent = totalCantidad;
}

// Mensaje visual elegante
function mostrarConfirmacion() {
  const mensaje = document.createElement("div");
  mensaje.textContent = "Producto agregado al carrito";
  mensaje.style.position = "fixed";
  mensaje.style.bottom = "20px";
  mensaje.style.right = "20px";
  mensaje.style.background = "#16a34a";
  mensaje.style.color = "#fff";
  mensaje.style.padding = "12px 18px";
  mensaje.style.borderRadius = "8px";
  mensaje.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
  mensaje.style.zIndex = "9999";

  document.body.appendChild(mensaje);

  setTimeout(() => {
    mensaje.remove();
  }, 2000);
}

// Cargar contador al iniciar página
document.addEventListener("DOMContentLoaded", actualizarContador);

// CARRITO DESPLEGABLE 
function abrirCarrito() {
  document.getElementById("cartSidebar").classList.add("active");
  document.getElementById("cartOverlay").classList.add("active");
  renderizarCarrito();
}

function cerrarCarrito() {
  document.getElementById("cartSidebar").classList.remove("active");
  document.getElementById("cartOverlay").classList.remove("active");
}

function renderizarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contenedor = document.getElementById("cartItems");
  const totalElemento = document.getElementById("cartTotal");

  contenedor.innerHTML = "";

  let total = 0;

  carrito.forEach(item => {
    total += item.precio * item.cantidad;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <strong>${item.nombre}</strong>
      <p>Cantidad: ${item.cantidad}</p>
      <p>$${item.precio}</p>
    `;
    contenedor.appendChild(div);
  });

  totalElemento.textContent = total.toFixed(2);
}

document.getElementById("cerrarCarrito")?.addEventListener("click", cerrarCarrito);
document.getElementById("cartOverlay")?.addEventListener("click", cerrarCarrito);
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnAbrirCarrito");
  if (btn) {
    btn.addEventListener("click", abrirCarrito);
  }
});
