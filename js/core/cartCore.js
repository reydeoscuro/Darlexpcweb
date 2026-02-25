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

  // Normalizar precio (quita $ si viene)
  const precioLimpio = Number(
    String(producto.precio).replace("$", "").replace(",", "")
  ) || 0;

  // Buscar si ya existe
  const existe = carrito.find(p => p.id === producto.id);

  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre || "Producto",
      precio: precioLimpio,
      imagen: producto.imagen || "",   // 🔥 ahora guardamos imagen
      cantidad: 1
    });
  }

  guardarCarrito();
  actualizarContador();
  mostrarConfirmacion();
}

