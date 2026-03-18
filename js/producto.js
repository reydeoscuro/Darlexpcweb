console.log("producto.js cargado");

// 1️⃣ leer parámetros de la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log("ID recibido:", id);

// 2️⃣ validar
if (!id) {
  document.getElementById("detalle").innerHTML = "<p>ID no válido</p>";
  throw new Error("ID undefined");
}

// 3️⃣ API
const URL = "https://darlex-api.david-villegas6991.workers.dev/";

// 4️⃣ fetch
fetch(URL)
  .then(res => res.json())
  .then(data => {

    console.log("Productos recibidos:", data);

    // buscar producto
    const p = data.find(item => item.SN === id);

    if (!p) {
      document.getElementById("detalle").innerHTML = "<p>Producto no encontrado</p>";
      return;
    }

    // galería
    const imagenes = p.IMAGENES
      ? p.IMAGENES.split(",").map(img => `
          <img src="${img.trim()}" class="thumb">
        `).join("")
      : "";

    // HTML
    document.getElementById("detalle").innerHTML = `
      <div class="producto-detalle">

        <div class="galeria">

          <div class="img-principal">
            <img src="${p.IMAGEN}" id="imgGrande">
          </div>

          <div class="thumbs">
            ${imagenes}
          </div>

        </div>

        <div class="info">

          <h2>${p.NOMBRE}</h2>

          <p class="precio">$${p.PRECIO}</p>

            <div class="acciones">

    <button class="btn-add" id="btnAgregar">
      🛒 Agregar al carrito
    </button>

    <button class="btn-whatsapp" id="btnComprar">
      💬 Comprar por WhatsApp
    </button>

  </div>
          <table class="tabla">

            <tr>
              <td>Procesador</td>
              <td>${p.PROCESADOR || "-"}</td>
            </tr>

            <tr>
              <td>RAM</td>
              <td>${p.RAM || "-"}</td>
            </tr>

            <tr>
              <td>Almacenamiento</td>
              <td>${p.ROM || "-"}</td>
            </tr>

            <tr>
              <td>Gráficos</td>
              <td>${p.GRAFICA || "-"}</td>
            </tr>

          </table>

        </div>

      </div>
    `;

    // cambiar imagen principal
    document.querySelectorAll(".thumb").forEach(img => {
      img.addEventListener("click", () => {
        document.getElementById("imgGrande").src = img.src;
      });
    });

  })
  .catch(err => console.error("ERROR PRODUCTO:", err));
function inicializarAccionesProducto(p) {

  // ================================
  // AGREGAR AL CARRITO
  // ================================
  const btnAgregar = document.getElementById("btnAgregar");

  if (btnAgregar) {
    btnAgregar.addEventListener("click", () => {

      const producto = {
        id: p.SN,
        nombre: p.NOMBRE,
        precio: p.PRECIO,
        imagen: p.IMAGEN
      };

      agregarAlCarrito(producto);
    });
  }


  // ================================
  // WHATSAPP
  // ================================
  const btnComprar = document.getElementById("btnComprar");

  if (btnComprar) {
    btnComprar.addEventListener("click", () => {

      const mensaje = `Hola, estoy interesado en este producto:%0A%0A${p.NOMBRE}%0APrecio: $${p.PRECIO}`;

      const telefono = "593980526438";

      const url = `https://wa.me/${telefono}?text=${mensaje}`;

      window.open(url, "_blank");
    });
  }

}
// ================================
// INICIALIZAR CARRITO
// ================================
if (typeof initCartUI === "function") {
  initCartUI();
}
