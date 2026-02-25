// ============================
// CARRITO BASE
// ============================

// Cargar carrito desde localStorage o crear vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Agregar producto al carrito
function agregarAlCarrito(producto) {

  // Buscar si ya existe el producto por su ID
  const existe = carrito.find(p => p.id === producto.id);

  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: Number(producto.precio),
      cantidad: 1
    });
  }

  guardarCarrito();
  actualizarContador();
  mostrarConfirmacion();
}

// Actualizar contador visual
function actualizarContador() {
  const contador = document.querySelector(".cart-count");
  if (!contador) return;

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
