const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const URL = "https://sheetdb.io/api/v1/1unfoggs799r3";

console.log("ID URL:", id);
console.log("IDs Sheet:", data.map(d => d.ID));

fetch(URL)
  .then(res => res.json())
  .then(data => {
    const p = data.find(item => String(item.ID) === id);
    if (!p) return;

    // Galería
    const imagenes = p.IMAGENES
      ? p.IMAGENES.split(",").map(img => `
          <img src="${img.trim()}" class="thumb">
        `).join("")
      : "";

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

          <table class="tabla">
            <tr><td>Procesador</td><td>${p.PROCESADOR}</td></tr>
            <tr><td>RAM</td><td>${p.RAM}</td></tr>
            <tr><td>Almacenamiento</td><td>${p.ALMACENAMIENTO}</td></tr>
            <tr><td>Gráficos</td><td>${p.GRAFICOS}</td></tr>
          </table>

          <a class="btn-whatsapp"
             href="https://wa.me/593XXXXXXXXX?text=Hola,%20quiero%20el%20producto%20${encodeURIComponent(p.NOMBRE)}"
             target="_blank">
            Consultar por WhatsApp
          </a>
        </div>

      </div>
    `;

    // Click en miniaturas
    document.querySelectorAll(".thumb").forEach(img => {
      img.addEventListener("click", () => {
        document.getElementById("imgGrande").src = img.src;
      });
    });
  });
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log("ID recibido:", id);

