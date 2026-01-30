const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const URL = "https://sheetdb.io/api/v1/1unfoggs799r3";

fetch(URL)
  .then(res => res.json())
  .then(productos => {
    const producto = productos.find(p => p.ID === id);

    if (!producto) return;

    document.getElementById("detalle").innerHTML = `
      <div class="card">
        <div class="img-box" style="height:300px">
          <img src="${producto["IMAGEN "]}">
        </div>
        <h2>${producto.NOMBRE}</h2>
        <p class="precio">$${producto.PRECIO}</p>
        <p>${producto.DESCRIPCION || "Producto de alta calidad disponible en DarleXPC."}</p>

        <a class="btn-whatsapp" 
           href="https://wa.me/593XXXXXXXXX?text=Hola,%20quiero%20el%20producto%20${encodeURIComponent(producto.NOMBRE)}"
           target="_blank">
          Consultar por WhatsApp
        </a>
      </div>
    `;
  });
