const URL = "https://sheetdb.io/api/v1/abcd1234";

fetch(URL)
  .then(res => res.json())
  .then(data => {
    const contenedor = document.getElementById("productos");

    data.forEach(p => {
      if (p.activo === "TRUE") {
        contenedor.innerHTML += `
          <div class="card">
            <img src="images/${p.imagen}" width="150">
            <h3>${p.nombre}</h3>
            <p>$${p.precio}</p>
            <p>Stock: ${p.stock}</p>
            <a href="https://wa.me/593XXXXXXXXX?text=Hola,%20me%20interesa%20${p.nombre}" target="_blank">
              Comprar
            </a>
          </div>
        `;
      }
    });
  });

