let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(producto) {
  const existe = carrito.find(p => p.id === producto.id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito();
  actualizarContador();
  alert("Producto agregado al carrito");
}

function actualizarContador() {
  const contador = document.querySelector(".cart-count");
  if (!contador) return;

  const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  contador.textContent = total;
}

document.addEventListener("DOMContentLoaded", actualizarContador);
