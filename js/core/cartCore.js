// ============================
// CARRITO BASE - cartCore.js
// ============================

/*
  FUNCIÓN PRINCIPAL:
  agregarAlCarrito(producto)

  👉 Se encarga de:
  - Leer el carrito actual desde localStorage
  - Verificar si el producto ya existe
  - Aumentar cantidad o agregarlo nuevo
  - Guardar el carrito actualizado
  - Actualizar el contador visual
  - Mostrar mensaje de confirmación
*/
function agregarAlCarrito(producto) {
  // 🔥 Siempre leemos el carrito ACTUAL desde localStorage
  // Esto evita desincronización entre memoria y almacenamiento
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // 🛑 Seguridad básica:
  // Si el producto no tiene ID, no lo agregamos
  // El ID es clave para evitar duplicados incorrectos
  if (!producto.id) {
    console.warn("Producto sin ID:", producto);
    return;
  }

  // 🧹 Normalizamos el precio:
  // Quitamos símbolos como "$" o comas y lo convertimos a número
  const precioLimpio =
    Number(String(producto.precio).replace("$", "").replace(",", "")) || 0;

  // 🔎 Buscamos si el producto ya existe en el carrito
  const existe = carrito.find((p) => p.id === producto.id);

  if (existe) {
    // ✔ Si ya existe, solo aumentamos la cantidad
    existe.cantidad += 1;
  } else {
    // ✔ Si no existe, lo agregamos como nuevo producto
    carrito.push({
      id: producto.id,
      nombre: producto.nombre || "Producto",
      precio: precioLimpio,
      imagen: producto.imagen || "",
      cantidad: 1,
    });
  }

  // 💾 Guardamos el carrito actualizado en localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // 🔄 Actualizamos el contador visual del carrito
  // (Función definida en cartUI.js)
  actualizarContador();

  // 💬 Mostramos mensaje flotante de confirmación
  // (También definida en cartUI.js)
  mostrarConfirmacion();

  // 🛒 NUEVO: abrir carrito automáticamente
  if (typeof abrirCarrito === "function") {
    abrirCarrito();
  }
}
