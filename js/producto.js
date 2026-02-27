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

// 3️⃣ URL de la API
const URL = "https://darlex-api.david-villegas6991.workers.dev/";

// 4️⃣ traer datos
fetch(URL)
  .then(res => res.json())
  .then(data => {

    console.log("Productos recibidos:", data);

    // 5️⃣ buscar producto por SN
    const p = data.find(item => item.SN === id);

    if (!p) {
      document.getElementById("detalle").innerHTML = "<p>Producto no encontrado</p>";
      return;
    }

    // 6️⃣ galería
    const imagenes = p.IMAGENES
      ? p.IMAGENES.split(",").map(img => `
          <img src="${img.trim()}" class="thumb">
        `).join("")
      : "";

    // 7️⃣ pintar HTML
    document.getElementById("detalle").innerHTML = `
      <div class="producto-detalle">

        <div class="galeria">
          <img src="${p["IMAGEN "]}" id="imgGrande">
          <div class="thumbs">${imagenes}</div>
        </div>

        <div class="info">
          <h2>${p.NOMBRE}</h2>
          <p class="precio">$${p.PRECIO}</p>

          <table>
            <tr><td>Procesador</td><td>${p.PROCESADOR || "-"}</td></tr>
            <tr><td>RAM</td><td>${p.RAM || "-"}</td></tr>
            <tr><td>Almacenamiento</td><td>${p.ROM || "-"}</td></tr>
            <tr><td>Gráficos</td><td>${p.GRAFICA || "-"}</td></tr>
          </table>
        </div>

      </div>
    `;

    // 8️⃣ click en miniaturas
    document.querySelectorAll(".thumb").forEach(img => {
      img.addEventListener("click", () => {
        document.getElementById("imgGrande").src = img.src;
      });
    });

  })
  .catch(err => console.error("ERROR PRODUCTO:", err));

