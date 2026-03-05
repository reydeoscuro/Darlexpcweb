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
    const imagen = item.imagen || ""; // ← incisión mínima
     
    total += precio * cantidad;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <div class="cart-item-img">
        <img src="${imagen}" alt="${nombre}">
      </div>

      <div class="cart-item-info">
        <strong>${nombre}</strong>
        <div class="cart-quantity-controls">
  <button class="qty-btn minus" data-id="${item.id}">−</button>
  <span class="qty-number">${cantidad}</span>
  <button class="qty-btn plus" data-id="${item.id}">+</button>
</div>
        <p>$${precio.toFixed(2)}</p>
      </div>
      
        <!-- Botón eliminar -->
  <button class="cart-remove" data-nombre="${nombre}">
    🗑
  </button>
    `;

    div.querySelector(".cart-remove").addEventListener("click", () => {
      eliminarProducto(nombre);
    });
// Botón +
div.querySelector(".plus").addEventListener("click", () => {
  cambiarCantidad(item.id, 1);
});

// Botón -
div.querySelector(".minus").addEventListener("click", () => {
  cambiarCantidad(item.id, -1);
});
    contenedor.appendChild(div);
  });

  totalElemento.textContent = total.toFixed(2);
}

function eliminarProducto(nombreProducto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito = carrito.filter(item => {
    const nombre = item.nombre || item.title || "Producto";
    return nombre !== nombreProducto;
  });

  localStorage.setItem("carrito", JSON.stringify(carrito));
   
renderizarCarrito();
actualizarContador();
}

function cambiarCantidad(idProducto, cambio) {

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const producto = carrito.find(item => item.id === idProducto);

  if (!producto) return;

  producto.cantidad += cambio;

  // Si la cantidad baja a 0, eliminar producto
  if (producto.cantidad <= 0) {
    carrito = carrito.filter(item => item.id !== idProducto);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  renderizarCarrito();
  actualizarContador();
}

function vaciarCarrito() {
  localStorage.removeItem("carrito");

  renderizarCarrito();
  actualizarContador();
}
/* ================================
   EVENTOS
================================ */

document.addEventListener("DOMContentLoaded", () => {

  actualizarContador();

  const btnAbrir = document.getElementById("btnAbrirCarrito");
  const btnCerrar = document.getElementById("cerrarCarrito");
  const overlay = document.getElementById("cartOverlay");
  const btnVaciar = document.getElementById("vaciarCarritoBtn");

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
  if (btnVaciar) {
  btnVaciar.addEventListener("click", vaciarCarrito);
  }

});
