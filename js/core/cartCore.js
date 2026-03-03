// ============================
// CARRITO BASE
// ============================


// Guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Agregar producto al carrito
function agregarAlCarrito(producto) {

  // 🔥 Siempre recargar carrito actual
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const precioLimpio = Number(
    String(producto.precio).replace("$", "").replace(",", "")
  ) || 0;

  const existe = carrito.find(p => p.id === producto.id);

  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre || "Producto",
      precio: precioLimpio,
      imagen: producto.imagen || "",
      cantidad: 1
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  actualizarContador();
  mostrarConfirmacion();
}

